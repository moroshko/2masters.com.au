"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PayResult } from "./PayResult";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const PayResultPageContent = () => {
  return (
    <Elements stripe={stripePromise}>
      <PayResult />
    </Elements>
  );
};

export { PayResultPageContent };
