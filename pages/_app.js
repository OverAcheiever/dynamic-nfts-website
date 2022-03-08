import "../styles/globals.css";
import "../styles/fonts.css";
import Head from "next/head";
import { Provider } from "wagmi";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Head>
        <title>Dynamic NFTs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;