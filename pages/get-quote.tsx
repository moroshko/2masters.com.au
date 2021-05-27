import Image from "next/image";
import H1 from "../components/H1";
import H2 from "../components/H2";
import styles from "../styles/GetQuote.module.css";

function GetQuote() {
  return (
    <main id="main">
      <H1>Get a Quote</H1>
      <div className={styles.container}>
        <p className="margin-0">
          To obtain an obligation free quote, you can call us or complete an
          enquiry form so we can email you back a quote or get in contact with
          you for a free consultation.
        </p>
        <div className={styles.image}>
          <Image
            src="/images/get-quote.jpg"
            alt="Cooling and heating quote"
            width={240}
            height={281}
            priority
          />
        </div>
      </div>
    </main>
  );
}

GetQuote.pageTitle = "Get a Quote";
GetQuote.pageDescription =
  "To obtain an obligation free quote or consultation, just fill in this enquiry form.";

export default GetQuote;
