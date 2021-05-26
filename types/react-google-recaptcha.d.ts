declare module "react-google-recaptcha" {
  // @types/react-google-recaptcha doesn't seem to have `asyncScriptOnLoad` for some reason,
  // so we're adding it here.
  interface ReCAPTCHAProps {
    asyncScriptOnLoad: () => void;
  }
}

export default ReCAPTCHA;
