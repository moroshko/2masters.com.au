import Head from "next/head";
import Splitbee from "./Splitbee";

type Props = {
  pageTitle: string;
  pageDescription: string;
};

export default function Header({ pageTitle, pageDescription }: Props) {
  const title = pageTitle
    ? `${pageTitle} - 2 Masters`
    : "2 Masters - Heating, Cooling, Electrical";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://2masters.com.au/images/open-graph.png"
        />
        <meta property="og:image:alt" content="2 Masters" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
        <meta property="og:url" content="https://2masters.com.au/" />
        <meta property="og:locale" content="en_AU" />
      </Head>
      <Splitbee />
    </>
  );
}
