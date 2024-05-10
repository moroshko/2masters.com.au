import { Metadata } from "next";
import { PayResultPageContent } from "./components/PayResultPageContent/PayResultPageContent";

export const metadata: Metadata = {
  title: "Pay result - 2 Masters",
  description: "Payment result page for 2 Masters",
};

const PayResultPage = () => {
  return <PayResultPageContent />;
};

export default PayResultPage;
