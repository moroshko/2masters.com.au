import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Button from "../components/Button";
import { PayForm } from "../components/PayForm";
import styles from "../styles/Pay.module.css";
import { validateAmount, validateRequired } from "../utils/validation";

const creditCardSurcharge = 2; // %

type FormInputs = {
  invoiceNumber: string;
  amount: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const elementsAppearance = {
  theme: "stripe",
} as const;

const PayPage = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      invoiceNumber: "",
      amount: "",
    },
  });
  const amount = watch("amount");
  const amountNum = validateAmount(amount) ? null : Number(amount);
  const totalAmountNum =
    amountNum === null
      ? null
      : Math.ceil(amountNum * (1 + creditCardSurcharge / 100) * 100) / 100;
  const totalAmount = totalAmountNum === null ? "" : totalAmountNum.toFixed(2);
  const createPaymentIntentMutation = useMutation({
    mutationFn: ({
      invoiceNumber,
      amount,
    }: {
      invoiceNumber: string;
      amount: number;
    }) => {
      return fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceNumber,
          amount,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        });
    },
  });
  const onContinue = ({ invoiceNumber }: FormInputs) => {
    if (totalAmountNum === null) {
      return;
    }

    createPaymentIntentMutation.mutate({
      invoiceNumber,
      amount: Math.ceil(totalAmountNum * 100),
    });
  };

  useEffect(() => {
    if (router.isReady) {
      const invoiceNumber = (router.query["invoice_number"] ??
        router.query["quote_number"] ??
        "") as string;
      const amount = (router.query["amount"] ?? "") as string;

      if (invoiceNumber !== "") {
        setValue("invoiceNumber", invoiceNumber);
      }

      if (amount !== "") {
        setValue("amount", amount);
      }
    }
  }, [router.isReady]);

  return (
    <div className="max-w-[600px] mx-auto py-10 px-4">
      <form
        className={styles.form}
        method="post"
        noValidate
        onSubmit={handleSubmit(onContinue)}
      >
        <div className="field">
          <label htmlFor="invoice-number">Invoice/Quote number</label>
          <input
            id="invoice-number"
            placeholder="e.g. 12345"
            aria-describedby="invoice-number-error"
            {...register("invoiceNumber", { validate: validateRequired })}
          />
          <div id="invoice-number-error" className="field-error">
            {errors.invoiceNumber?.message}
          </div>
        </div>
        <div className="field">
          <label htmlFor="amount">Invoice amount</label>
          <input
            id="amount"
            placeholder="e.g. 500.00"
            inputMode="decimal"
            aria-describedby="amount-error"
            {...register("amount", { validate: validateAmount })}
          />
          <div id="amount-error" className="field-error">
            {errors.amount?.message}
          </div>
        </div>
        <div className="field">
          <label htmlFor="total-amount">
            Amount payable including a surcharge
          </label>
          <input
            id="total-amount"
            className="cursor-not-allowed"
            disabled={true}
            aria-describedby="total-amount"
            value={totalAmount}
          />
          <p className="help-text">{`Including a surcharge of ${creditCardSurcharge}%${
            amountNum !== null && totalAmountNum !== null
              ? ` ($${(totalAmountNum - amountNum).toFixed(2)})`
              : ""
          }`}</p>
        </div>
        {createPaymentIntentMutation.isSuccess ? null : (
          <div className="mt-8 flex flex-col">
            <Button type="submit">
              {createPaymentIntentMutation.isLoading
                ? "Please wait..."
                : "Continue"}
            </Button>
          </div>
        )}
      </form>
      {clientSecret !== null && (
        <div className="mt-8">
          <Elements
            options={{
              clientSecret,
              appearance: elementsAppearance,
            }}
            stripe={stripePromise}
          >
            <PayForm />
          </Elements>
        </div>
      )}
    </div>
  );
};

PayPage.pageTitle = "Pay";
PayPage.pageDescription = "Pay 2 Masters";

export default PayPage;
