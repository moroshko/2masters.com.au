import * as React from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import styles from "../styles/Pay.module.css";

function Pay() {
  return (
    <div className={styles.container}>
      <PaymentForm
        /**
         * Identifies the calling form with a verified application ID generated from
         * the Square Application Dashboard.
         */
        applicationId="sq0idp-WfFj5APRXzlbwBauqZauWg"
        /**
         * Invoked when payment form receives the result of a tokenize generation
         * request. The result will be a valid credit card or wallet token, or an error.
         */
        cardTokenizeResponseReceived={(token, buyer) => {
          if (token.status === "OK") {
            // TODO: Send email
          } else {
            // TODO: Show error
          }

          // eslint-disable-next-line
          console.info({ token, buyer });
        }}
        /**
         * This function enable the Strong Customer Authentication (SCA) flow
         *
         * We strongly recommend use this function to verify the buyer and reduce
         * the chance of fraudulent transactions.
         */
        createVerificationDetails={() => ({
          amount: "1.20",
          /* collected from the buyer */
          billingContact: {
            //addressLines: ["123 Main Street", "Apartment 1"],
            familyName: "Misha",
            givenName: "Moroshko",
            countryCode: "AU",
            //city: "London",
          },
          currencyCode: "AUD",
          intent: "CHARGE",
        })}
        /**
         * Identifies the location of the merchant that is taking the payment.
         * Obtained from the Square Application Dashboard - Locations tab.
         */
        locationId="FNTF6FJ85AT3Q"
      >
        <CreditCard />
      </PaymentForm>
    </div>
  );
}

Pay.pageTitle = "Pay";
Pay.pageDescription = "Pay 2 Masters";

export default Pay;
