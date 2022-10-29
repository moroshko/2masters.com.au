import { useRef, useState } from "react";
import { useMutation } from "react-query";
import cx from "classnames";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import ReCAPTCHA from "react-google-recaptcha";
import { post } from "../utils/api";
import { SuccessResponse, ErrorResponse, FormValues } from "./api/pay";
import { useForm } from "react-hook-form";
import { SquareLogo } from "../components/SquareLogo";
import styles from "../styles/Pay.module.css";
import { squareApplicationId, squareLocationId } from "../utils/square";
import { validateAmount, validateRequired } from "../utils/validation";
import ReCaptcha from "../components/ReCaptcha";

const creditCardSurcharge = 2.2; // %

type FormData = {
  invoiceNumber: string;
  amount: string;
  recaptchaToken: string | null;
};

function Pay() {
  const {
    register,
    watch,
    setValue,
    getValues,
    trigger,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      invoiceNumber: "",
      amount: "",
      recaptchaToken: null,
    },
  });
  const amount = watch("amount");
  const amountNum = validateAmount(amount) ? null : Number(amount);
  const totalAmountNum =
    amountNum === null
      ? null
      : Math.ceil(amountNum * (1 + creditCardSurcharge / 100) * 100) / 100;
  const totalAmount = totalAmountNum === null ? "" : totalAmountNum.toFixed(2);
  const payMutation = useMutation<SuccessResponse, ErrorResponse, FormValues>(
    (data) => post("/api/pay", data)
  );
  const [isPaidSuccessfully, setIsPaidSuccessfully] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null); // See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35572#issuecomment-498242139

  return (
    <div className={styles.container}>
      {isPaidSuccessfully ? (
        <h3 className={styles.paidSuccessfully}>Paid successfully!</h3>
      ) : (
        <>
          <form className={styles.form} method="post" noValidate>
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
              <label htmlFor="amount">Amount</label>
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
              <label htmlFor="total-amount">Total amount</label>
              <input
                id="total-amount"
                disabled={true}
                aria-describedby="total-amount"
                value={totalAmount}
              />
              <p className="help-text">{`Including credit card surcharge of 2.2%${
                amountNum !== null && totalAmountNum !== null
                  ? ` ($${(totalAmountNum - amountNum).toFixed(2)})`
                  : ""
              }`}</p>
            </div>
            <div className={cx("field", styles.recaptchaField)}>
              <div aria-describedby="recaptcha-error">
                <ReCaptcha
                  onChange={(token) => {
                    setValue("recaptchaToken", token);
                  }}
                  onExpired={() => {
                    setValue("recaptchaToken", null);
                  }}
                  ref={recaptchaRef}
                />
              </div>
              <div id="recaptcha-error" className="field-error">
                {errors.recaptchaToken?.message}
              </div>
            </div>
          </form>
          <PaymentForm
            /**
             * Identifies the calling form with a verified application ID generated from
             * the Square Application Dashboard.
             */
            applicationId={squareApplicationId}
            /**
             * Identifies the location of the merchant that is taking the payment.
             * Obtained from the Square Application Dashboard - Locations tab.
             */
            locationId={squareLocationId}
            /**
             * Invoked when payment form receives the result of a tokenize generation
             * request. The result will be a valid credit card or wallet token, or an error.
             */
            cardTokenizeResponseReceived={async (token, buyer) => {
              if (token.status === "OK") {
                const validationResult = await trigger();

                if (validationResult === true && totalAmountNum !== null) {
                  setFormError(null);

                  payMutation.mutate(
                    {
                      verificationToken: buyer?.token ?? "",
                      sourceId: token.token ?? "",
                      invoiceNumber: getValues("invoiceNumber"),
                      amountInCents: totalAmountNum * 100,
                      recaptchaToken: getValues("recaptchaToken"),
                    },
                    {
                      onSuccess: () => {
                        setIsPaidSuccessfully(true);
                      },
                      onError: ({ fieldErrors, formError }) => {
                        fieldErrors?.forEach(({ name, error }) => {
                          setError(name, { type: "manual", message: error });
                        });

                        if (formError) {
                          setFormError(
                            formError.includes("GENERIC_DECLINE")
                              ? "Please check the card details."
                              : formError
                          );
                        }

                        if (watch("recaptchaToken") !== null) {
                          recaptchaRef.current?.reset();
                          setValue("recaptchaToken", null);
                        }
                      },
                    }
                  );
                }
              } else {
                alert("Failed to generate a payment token");
              }
            }}
            /**
             * This function enable the Strong Customer Authentication (SCA) flow
             *
             * We strongly recommend use this function to verify the buyer and reduce
             * the chance of fraudulent transactions.
             */
            // createVerificationDetails={() => ({
            //   amount: 120,
            //   /* collected from the buyer */
            //   billingContact: {
            //     //addressLines: ["123 Main Street", "Apartment 1"],
            //     // familyName: "Misha",
            //     // givenName: "Moroshko",
            //     countryCode: "AU",
            //     //city: "London",
            //   },
            //   currencyCode: "AUD",
            //   intent: "CHARGE",
            // })}
          >
            <CreditCard />
          </PaymentForm>
          {formError && <p className={styles.formError}>{formError}</p>}
          <div className={styles.detailsNotStored}>
            <p>We never store your credit card details.</p>
            <p className={styles.securedBySquare}>
              Secured by <SquareLogo height={16} />
            </p>
          </div>
        </>
      )}
    </div>
  );
}

Pay.pageTitle = "Pay";
Pay.pageDescription = "Pay 2 Masters";

export default Pay;
