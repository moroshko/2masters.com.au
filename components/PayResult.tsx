import { useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

type PaymentResult =
  | {
      status: "success";
    }
  | {
      status: "error";
      errorMessage: string;
    };

const PayResult = () => {
  const stripe = useStripe();
  const [paymentResult, setPaymentResult] =
    useState<PaymentResult | null>(null);

  useEffect(() => {
    if (stripe === null) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (clientSecret === null) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent?.status === "succeeded") {
        setPaymentResult({
          status: "success",
        });
      } else {
        console.error(paymentIntent);

        setPaymentResult({
          status: "error",
          errorMessage: `Payment status: ${paymentIntent?.status}`,
        });
      }
    });
  }, [stripe]);

  return (
    <div className="max-w-[600px] mx-auto py-20 px-4">
      {paymentResult === null ? (
        "Please wait..."
      ) : paymentResult.status === "success" ? (
        <h1 className="text-2xl">Payment successful!</h1>
      ) : (
        <h1 className="text-error">{paymentResult.errorMessage}</h1>
      )}
    </div>
  );
};

export { PayResult };
