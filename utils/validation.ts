const MOBILE_NUMBER_REGEX = /^\d{10}$/;

// Source: https://emailregex.com
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateRequired = (str: string) => {
  if (str.trim() === "") {
    return "Required";
  }
};

const AMOUNT_REGEX = /^\d+(\.\d{2})?$/;

export const validateAmount = (str: string) => {
  if (str.trim() === "") {
    return "Required";
  }

  if (AMOUNT_REGEX.test(str.trim()) === false) {
    return "Invalid amount";
  }

  const amount = Number(str);

  if (amount < 1) {
    return "Must be at least $1";
  }
};

export const validateMobileNumber = (mobile: string) => {
  if (mobile.trim() === "") {
    return "Required";
  }

  if (MOBILE_NUMBER_REGEX.test(mobile.trim()) === false) {
    return "Must have 10 digits";
  }
};

export const validateEmail = (email: string) => {
  if (email.trim() === "") {
    return "Required";
  }

  if (EMAIL_REGEX.test(email.trim()) === false) {
    return "Must be a valid email address";
  }
};

export const validateReCaptchaToken = (token: string | null) => {
  if (token === null) {
    return "Must be checked";
  }
};
