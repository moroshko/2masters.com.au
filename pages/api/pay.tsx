import { NextApiRequest, NextApiResponse } from "next";
import { Client, Environment, ApiError } from "square";
import { renderToStaticMarkup } from "react-dom/server";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../../utils/mailgun";
import { squareLocationId } from "../../utils/square";
import { createRecord } from "../../utils/airtable";

const squareClient = new Client({
  environment: Environment.Production,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

export type FormValues = {
  sourceId: string;
  verificationToken: string;
  invoiceNumber: string;
  amountInCents: number;
  recaptchaToken: string | null;
};

type FieldError = {
  name: "recaptchaToken";
  error: string;
};

export type SuccessResponse = {
  message: string;
};

export type ErrorResponse = {
  fieldErrors?: FieldError[];
  formError?: string;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).end();
  }

  const payload: FormValues = req.body;
  const {
    sourceId,
    verificationToken,
    invoiceNumber,
    amountInCents,
    recaptchaToken,
  } = payload;

  // Verify captcha
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      {
        method: "POST",
      }
    );
    const responseData = await response.json();

    if (!responseData.success) {
      return res.status(400).json({
        fieldErrors: [{ name: "recaptchaToken", error: "Invalid token" }],
      });
    }
  } catch (error) {
    return res.status(400).json({
      fieldErrors: [
        { name: "recaptchaToken", error: "Token verification failed" },
      ],
    });
  }

  // Create the payment with Square
  try {
    await squareClient.paymentsApi.createPayment({
      idempotencyKey: uuidv4(),
      locationId: squareLocationId,
      sourceId,
      verificationToken,
      // While it's tempting to pass this data from the client
      // Doing so allows bad actor to modify these values
      // Instead, leverage Orders to create an order on the server
      // and pass the Order ID to createPayment rather than raw amounts
      // See Orders documentation: https://developer.squareup.com/docs/orders-api/what-it-does
      amountMoney: {
        // the expected amount is in cents, meaning this is $1.00.
        amount: BigInt(amountInCents),
        // If you are a non-US account, you must change the currency to match the country in which
        // you are accepting the payment.
        currency: "AUD",
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(400).json({
        formError: (error.errors ?? []).map((e) => e.detail ?? "").join(". "),
      });
    }

    if (error instanceof Error) {
      return res.status(400).json({ formError: error.message });
    }

    return res.status(400).json({ formError: "Something went wrong." });
  }

  // Send email using Mailgun
  try {
    await sendEmail({
      from: `Square Payments <accounts@2masters.com.au>`,
      to:
        req.headers.host === "www.2masters.com.au"
          ? "accounts@2masters.com.au"
          : "lev@2masters.com.au",
      subject: "Credit card payment received",
      html: renderToStaticMarkup(
        <div>
          <p>{`Invoice/Quote number: ${invoiceNumber}`}</p>
          <p>
            {`Amount including credit card surcharge of 2.2%: $${
              amountInCents / 100
            }`}
          </p>
        </div>
      ),
    });
  } catch (error) {
    return res.status(400).json({
      formError: error instanceof Error ? error.message : "Unknown error",
    });
  }

  // Add record to Airtable
  try {
    await createRecord("Pay", {
      "Invoice/Quote number": invoiceNumber,
      Amount: amountInCents / 100,
      "Melbourne Time": new Date().toISOString(),
    });
  } catch (error) {
    return res.status(400).json({ formError: "Something went wrong." });
  }

  res.status(200).json({ message: "OK" });
};
