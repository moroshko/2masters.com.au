import "../styles/globals.css"; // Must be loaded first!
import { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {
  Component: AppProps["Component"] & {
    pageTitle: string;
    pageDescription: string;
  };
  pageProps: AppProps["pageProps"];
};

export default function MyApp({ Component, pageProps }: Props) {
  const { pageTitle, pageDescription } = Component;

  return (
    <>
      <Header pageTitle={pageTitle} pageDescription={pageDescription} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
