import { useState, useEffect, useRef } from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import Image from "next/image";
import H1 from "../components/H1";
import H2 from "../components/H2";
import Button from "../components/Button";
import ReCaptcha, { ReCAPTCHA } from "../components/ReCaptcha";
import { post } from "../utils/api";
import { SuccessResponse, ErrorResponse, FormValues } from "./api/contact-us";
import {
  validateRequired,
  validateEmail,
  validateReCaptchaToken,
} from "../utils/validation";
import styles from "../styles/ContactUs.module.css";

function ContactUs() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      token: null,
    },
  });
  const [submitError, setSubmitError] = useState<string>();
  const recaptchaRef = useRef<ReCAPTCHA>();
  const mutation = useMutation<SuccessResponse, ErrorResponse, FormValues>(
    (data) => post("/api/contact-us", data)
  );
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data, {
      onSuccess: ({ message }) => {
        console.log("success", message);
      },
      onError: ({ fieldErrors, submitError }) => {
        console.log("error", { fieldErrors, submitError });

        fieldErrors?.forEach(({ name, error }) => {
          setError(name, { type: "manual", message: error });
        });

        if (submitError) {
          setSubmitError(submitError);
        }

        if (watch("token") !== null) {
          recaptchaRef.current?.reset();
          setValue("token", null);
        }
      },
    });
  });

  useEffect(() => {
    register("token", { validate: validateReCaptchaToken });
  }, []);

  return (
    <main id="main">
      <H1>Contact Us</H1>
      <div className={styles.container}>
        <form
          className={styles.form}
          method="post"
          onSubmit={onSubmit}
          noValidate
        >
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              aria-describedby="name-error"
              {...register("name", { validate: validateRequired })}
            />
            <div id="name-error" className="field-error">
              {errors.name?.message}
            </div>
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              aria-describedby="email-error"
              {...register("email", { validate: validateEmail })}
            />
            <div id="email-error" className="field-error">
              {errors.email?.message}
            </div>
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              aria-describedby="message-error"
              {...register("message", { validate: validateRequired })}
            />
            <div id="message-error" className="field-error">
              {errors.message?.message}
            </div>
          </div>
          <div className="field">
            <div aria-describedby="recaptcha-error">
              <ReCaptcha
                onChange={(token) => {
                  setValue("token", token);
                }}
                onExpired={() => {
                  setValue("token", null);
                }}
                // @ts-ignore
                ref={recaptchaRef}
              />
            </div>
            <div id="recaptcha-error" className="field-error">
              {errors.token?.message}
            </div>
          </div>
          <div>
            <Button type="submit" loading={mutation.isLoading}>
              Send
            </Button>
          </div>
          <div className="field-error">{submitError}</div>
        </form>
        <div className={styles.image}>
          <Image
            src="/images/contact-us.png"
            alt="Support person talking to clients"
            width={245}
            height={346}
          />
        </div>
      </div>
      <H2>Postal Address</H2>
      <p>
        2 Masters
        <br />
        P.O. Box 2726
        <br />
        Cheltenham, VIC 3192
      </p>
    </main>
  );
}

ContactUs.pageDescription = "Contact us for more information.";

export default ContactUs;
