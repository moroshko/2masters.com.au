"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Button from "../../../../components/Button";
import styles from "../../../../styles/Pay.module.css";
import { validateAmount, validateRequired } from "../../../../utils/validation";
import { creditCardSurcharge } from "../../../lib/constants";
import { PayForm } from "./PayForm";

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

const PayPageContent = () => {
  const searchParams = useSearchParams();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const showPayForm = clientSecret !== null;
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      invoiceNumber:
        searchParams?.get("invoice_number") ??
        searchParams?.get("quote_number") ??
        "",
      amount: searchParams?.get("amount") ?? "",
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
            disabled={showPayForm}
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
            disabled={showPayForm}
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
            <Button
              type="submit"
              loading={createPaymentIntentMutation.isLoading}
            >
              Continue
            </Button>
          </div>
        )}
      </form>
      {showPayForm && (
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

export { PayPageContent };
