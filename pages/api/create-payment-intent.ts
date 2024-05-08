import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).end();
  }

  const invoiceNumber = req.body.invoiceNumber as string;
  const amount = req.body.amount as number;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "aud",
    payment_method_types: ["card"], // "google_pay", "apple_pay"
    metadata: {
      invoice_number: invoiceNumber,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
