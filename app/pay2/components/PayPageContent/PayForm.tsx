import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEventHandler, useState } from "react";
import Button from "../../../../components/Button";

const paymentElementOptions = {
  layout: "tabs",
} as const;

const getReturnUrl = (): string => {
  const url = new URL(window.location.href);

  url.pathname = "/pay-result";
  url.search = "";

  return url.toString();
};

const PayForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault(); // we need this when not using react-hook-form

    if (stripe === null || elements === null) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: getReturnUrl(),
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setErrorMessage(error.message ?? "Unexpected error");
    } else {
      setErrorMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form method="post" onSubmit={onSubmit}>
      <PaymentElement
        options={paymentElementOptions}
        onReady={() => {
          setIsReady(true);
        }}
      />
      {isReady && (
        <Button
          type="submit"
          disabled={isLoading || stripe === null || elements === null}
          loading={isLoading}
        >
          {isLoading ? "Please wait..." : "Pay now"}
        </Button>
      )}
      {errorMessage !== null && (
        <p className="text-error mt-2">{errorMessage}</p>
      )}
    </form>
  );
};

export { PayForm };
