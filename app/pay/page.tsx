import { Metadata } from "next";
import { Suspense } from "react";
import { PayPageContent } from "./components/PayPageContent/PayPageContent";

export const metadata: Metadata = {
  title: "Pay - 2 Masters",
  description: "Payment page for 2 Masters",
};

const PayPage = () => {
  return (
    <Suspense>
      <PayPageContent />
    </Suspense>
  );
};

export default PayPage;
