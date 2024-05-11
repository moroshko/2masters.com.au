import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export async function POST(request: Request) {
  const { invoiceNumber, amount } = (await request.json()) as {
    invoiceNumber: string;
    amount: number;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "aud",
    payment_method_types: ["card"], // "google_pay", "apple_pay"
    metadata: {
      invoice_number: invoiceNumber,
    },
  });

  return Response.json({
    clientSecret: paymentIntent.client_secret,
  });
}
