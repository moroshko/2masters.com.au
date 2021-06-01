// See: https://documentation.mailgun.com/en/latest/api-intro.html#authentication
const auth = `${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString(
  "base64"
)}`;

const MAILGUN_DOMAIN = "mailgun.2masters.com.au";

type Message = {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export function sendEmail(message: Message) {
  // See: https://documentation.mailgun.com/en/latest/api-sending.html#sending
  return fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
    method: "post",
    body: new URLSearchParams(message),
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
}
