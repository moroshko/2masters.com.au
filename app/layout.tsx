import "../styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import Footer from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { QueryClientProvider } from "./components/QueryClientProvider/QueryClientProvider";

export const metadata: Metadata = {
  openGraph: {
    title: "2 Masters",
    description:
      "Whether you want to keep cool in summer or warm in…heating and cooling needs at a competitive price.",
    url: "https://www.2masters.com.au",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "https://2masters.com.au/images/open-graph.jpg", // Must be an absolute URL
        width: 1200,
        height: 1200,
        alt: "2 Masters",
      },
    ],
  },
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </QueryClientProvider>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
