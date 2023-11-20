import Document, { Html, Head, Main, NextScript } from "next/document";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v11.0&appId=2473634186128269&autoLogAppEvents=1"
            nonce="JMoXMlPn"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
