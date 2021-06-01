import { useState, forwardRef } from "react";
import cx from "classnames";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./ReCaptcha.module.css";

type Props = {
  onChange: (token: string | null) => void;
  onExpired: () => void;
};

declare global {
  interface Window {
    Cypress: any;
  }
}

export default forwardRef<ReCAPTCHA, Props>(({ onChange, onExpired }, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const siteKey =
    typeof window !== "undefined" && window.Cypress !== undefined
      ? "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // See: https://developers.google.com/recaptcha/docs/faq#id-like-to-run-automated-tests-with-recaptcha.-what-should-i-do
      : "6Ld4FuIZAAAAACHy1I6Mo3siZd-E615fCof8z8YA"; // Site key can be found here: https://www.google.com/recaptcha/admin/site/434181808

  return (
    <div className={styles.container}>
      <div className={styles.placeholder} aria-hidden={isLoaded}>
        Loading reCAPTCHA...
      </div>
      <div
        className={cx(styles.recaptcha, {
          [styles.recaptchaNotLoaded]: !isLoaded,
        })}
      >
        <ReCAPTCHA
          sitekey={siteKey}
          asyncScriptOnLoad={() => {
            setIsLoaded(true);
          }}
          onChange={onChange}
          onExpired={onExpired}
          ref={ref}
        />
      </div>
    </div>
  );
});
