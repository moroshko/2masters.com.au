import { Metadata } from "next";
import { PayPageContent } from "./components/PayPageContent/PayPageContent";

export const metadata: Metadata = {
  title: "Pay - 2 Masters",
  description: "Payment page for 2 Masters",
};

const PayPage = () => {
  return <PayPageContent />;
};

export default PayPage;
