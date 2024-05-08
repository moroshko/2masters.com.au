import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PayResult } from "../components/PayResult";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const PayResultPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PayResult />
    </Elements>
  );
};

PayResultPage.pageTitle = "Pay result";
PayResultPage.pageDescription = "Pay result 2 Masters";

export default PayResultPage;
