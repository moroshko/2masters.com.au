import "../styles/globals.css"; // Must be loaded first!
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <Header pageTitle={pageTitle} pageDescription={pageDescription} />
      <Component {...pageProps} />
      <Footer />
    </QueryClientProvider>
  );
}
