import { NextApiRequest, NextApiResponse } from "next";
import {
  validateRequired,
  validateEmail,
  validateReCaptchaToken,
} from "../../utils/validation";
import { sendEmail } from "../../utils/mailgun";
import { createRecord } from "../../utils/airtable";

export type FormValues = {
  name: string;
  email: string;
  message: string;
  token: string | null;
};

type FieldError = {
  name: keyof FormValues;
  error: string;
};

export type SuccessResponse = {
  message: string;
};

export type ErrorResponse = {
  fieldErrors?: FieldError[];
  submitError?: string;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).end();
  }

  const formValues: FormValues = req.body;
  const { name = "", email = "", message = "", token = null } = formValues;

  // Verify captcha
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      {
        method: "POST",
      }
    );
    const responseData = await response.json();

    if (!responseData.success) {
      return res.status(400).json({
        fieldErrors: [{ name: "token", error: "Invalid token" }],
      });
    }
  } catch (error) {
    return res.status(400).json({
      fieldErrors: [{ name: "token", error: "Token verification failed" }],
    });
  }

  // Server-side validation
  const fieldErrors: FieldError[] = [
    // TODO
    { name: "name", error: validateRequired(name) } as FieldError,
    { name: "email", error: validateEmail(email) } as FieldError,
    {
      name: "message",
      error: validateRequired(message),
    } as FieldError,
    {
      name: "token",
      error: validateReCaptchaToken(token),
    } as FieldError,
  ].filter(({ error }) => error !== undefined);

  if (fieldErrors.length > 0) {
    return res.status(400).json({ fieldErrors });
  }

  // Send email using Mailgun
  try {
    await sendEmail({
      from: `${name} <${email}>`,
      to:
        req.headers.host === "www.2masters.com.au"
          ? "accounts@2masters.com.au"
          : "misha@2masters.com.au",
      subject: "2 Masters Website Contact",
      text: message,
    });
  } catch (error) {
    return res.status(400).json({ submitError: error.message });
  }

  // Add record to Airtable
  try {
    await createRecord("Contact Us", {
      Name: name,
      Email: email,
      Message: message,
      "Melbourne Time": new Date().toISOString(),
    });

    res.status(200).json({ message: "Thanks! You'll hear from us soon." });
  } catch (error) {
    return res.status(400).json({ submitError: error.message });
  }
};
