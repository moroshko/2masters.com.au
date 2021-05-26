import mailgun from "mailgun-js";

const MAILGUN_DOMAIN = "mailgun.2masters.com.au";

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY as string,
  domain: MAILGUN_DOMAIN,
});

type SendEmailParams = {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export function sendEmail({ from, to, subject, text, html }: SendEmailParams) {
  return mg.messages().send({ from, to, subject, text, html });
}
