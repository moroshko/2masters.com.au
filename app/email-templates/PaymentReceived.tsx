import { creditCardSurcharge } from "../lib/constants";

type Props = {
  amount: number;
  currency: string;
  paymentMethod: string;
  invoiceNumber: string;
};

const PaymentReceived = ({
  amount,
  currency,
  paymentMethod,
  invoiceNumber,
}: Props) => {
  return (
    <div>
      <h1>Payment received</h1>
      <p>{`Invoice/Quote number: ${invoiceNumber}`}</p>
      <p>
        {`Amount including a surcharge of ${creditCardSurcharge}%: $${
          amount / 100
        } ${currency.toUpperCase()}`}
      </p>
      <p>{`Payment method: ${paymentMethod}`}</p>
    </div>
  );
};

export { PaymentReceived };
