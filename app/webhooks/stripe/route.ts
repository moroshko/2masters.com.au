import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";
import { PaymentReceived } from "../../email-templates/PaymentReceived";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
const resend = new Resend(process.env.RESEND_API_KEY ?? "");

export async function POST(request: Request) {
  const headersList = headers();
  const signature = headersList.get("stripe-signature") ?? "";
  const bodyStr = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      bodyStr,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Something went wrong"
    );

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const host = headersList.get("host");
      const { error } = await resend.emails.send({
        from: "Stripe Payments <accounts@2masters.com.au>",
        to: [
          host === "www.2masters.com.au"
            ? "accounts@2masters.com.au"
            : "lev@2masters.com.au", // "michael.moroshko@gmail.com"
        ],
        subject: paymentIntent.livemode
          ? "Payment received"
          : "[TEST] Payment received",
        react: PaymentReceived({
          amount: paymentIntent.amount_received,
          currency: paymentIntent.currency,
          paymentMethod: paymentIntent.payment_method_types[0],
          invoiceNumber: paymentIntent.metadata.invoice_number,
        }),
      });

      if (error) {
        console.error(error);

        return NextResponse.json({ error });
      }

      return NextResponse.json({ status: "ok" }, { status: 200 });
    }

    default: {
      const error = `Unhandled event type: ${event.type}`;

      console.error(error);

      return NextResponse.json({ error }, { status: 400 });
    }
  }
}
