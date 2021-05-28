import { renderToStaticMarkup } from "react-dom/server";
import { NextApiRequest, NextApiResponse } from "next";
import {
  validateRequired,
  validateMobileNumber,
  validateEmail,
  validateReCaptchaToken,
} from "../../utils/validation";
import { sendEmail } from "../../utils/mailgun";
import { createRecord } from "../../utils/airtable";

export type Service =
  | "Cooling - Supply"
  | "Cooling - Installation"
  | "Cooling - Service"
  | "Cooling - Repair"
  | "Heating - Supply"
  | "Heating - Installation"
  | "Heating - Service"
  | "Heating - Repair";

const COOLING_SERVICE_REGEX = /^Cooling - (.*)$/;
const HEATING_SERVICE_REGEX = /^Heating - (.*)$/;

export type FormValues = {
  name: string;
  mobileNumber: string;
  email: string;
  suburb: string;
  comments: string;
  requiredServices: Service[];
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

function getRequiredCoolingServices(requiredServices: Service[]) {
  return requiredServices.reduce<string[]>((acc, name) => {
    const match = name.match(COOLING_SERVICE_REGEX);

    if (match !== null) {
      acc.push(match[1]);
    }

    return acc;
  }, []);
}

function getRequiredHeatingServices(requiredServices: Service[]) {
  return requiredServices.reduce<string[]>((acc, name) => {
    const match = name.match(HEATING_SERVICE_REGEX);

    if (match !== null) {
      acc.push(match[1]);
    }

    return acc;
  }, []);
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).end();
  }

  const {
    name = "",
    mobileNumber = "",
    email = "",
    suburb = "",
    requiredServices = [],
    comments = "",
    token = null,
  } = req.body;

  // Server-side validation
  const fieldErrors: FieldError[] = [
    // TODO
    { name: "name", error: validateRequired(name) } as FieldError,
    {
      name: "mobileNumber",
      error: validateMobileNumber(mobileNumber),
    } as FieldError,
    { name: "email", error: validateEmail(email) } as FieldError,
    { name: "suburb", error: validateRequired(suburb) } as FieldError,
    {
      name: "token",
      error: validateReCaptchaToken(token),
    } as FieldError,
  ].filter(({ error }) => error !== undefined);

  if (fieldErrors.length > 0) {
    return res.status(400).json({ fieldErrors });
  }

  // Verify captcha
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(
        process.env.RECAPTCHA_SECRET_KEY as string
      )}&response=${encodeURIComponent(token)}`,
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

  // Send email using Mailgun
  try {
    await sendEmail({
      from: `${name} <${email}>`,
      to:
        req.headers.host === "www.2masters.com.au"
          ? "accounts@2masters.com.au"
          : "misha@2masters.com.au",
      subject: "2 Masters Website Quote Request",
      html: renderToStaticMarkup(
        <table>
          <tbody>
            <tr>
              <td>
                <b>Name:</b>
              </td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>
                <b>Mobile:</b>
              </td>
              <td>{mobileNumber}</td>
            </tr>
            <tr>
              <td>
                <b>Email:</b>
              </td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>
                <b>Suburb:</b>
              </td>
              <td>{suburb}</td>
            </tr>
            <tr>
              <td>
                <b>Required services:</b>
              </td>
              <td>{requiredServices.join(", ")}</td>
            </tr>
            <tr>
              <td>
                <b>Comments:</b>
              </td>
              <td>{comments}</td>
            </tr>
          </tbody>
        </table>
      ),
    });
  } catch (error) {
    return res.status(400).json({ submitError: error.message });
  }

  // Add record to Airtable
  try {
    await createRecord("Get a Quote", {
      Name: name,
      Mobile: mobileNumber,
      Email: email,
      Suburb: suburb,
      Cooling: getRequiredCoolingServices(requiredServices),
      Heating: getRequiredHeatingServices(requiredServices),
      Comments: comments,
      "Melbourne Time": new Date().toISOString(),
    });

    res.status(200).json({ message: "Thanks! You'll hear from us soon." });
  } catch (error) {
    return res.status(400).json({ submitError: error.message });
  }
};
