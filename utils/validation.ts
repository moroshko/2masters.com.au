import { Validate } from "react-hook-form";

const MOBILE_NUMBER_REGEX = /^\d{10}$/;

// Source: https://emailregex.com
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateRequired: Validate<string> = (str) => {
  if (str.trim() === "") {
    return "Required";
  }
};

export const validateMobileNumber: Validate<string> = (mobile) => {
  if (mobile.trim() === "") {
    return "Required";
  }

  if (MOBILE_NUMBER_REGEX.test(mobile.trim()) === false) {
    return "Must have 10 digits";
  }
};

export const validateEmail: Validate<string> = (email) => {
  if (email.trim() === "") {
    return "Required";
  }

  if (EMAIL_REGEX.test(email.trim()) === false) {
    return "Must be a valid email address";
  }
};

export const validateReCaptchaToken: Validate<string | null> = (token) => {
  if (token === null) {
    return "Must be checked";
  }
};
