import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/DelaGothicOne-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
        </Head>
        <body
          style={{
            "--toastify-font-family": "'Courier Sans', 'monospace'",
            "--toastify-text-color-light": "var(--brown)",
            "--toastify-color-light": "var(--white)",
            "--toastify-text-color-dark": "var(--white)",
            "--toastify-color-dark": "var(--orange)",
          }}
        >
          <Main />
          <NextScript />
          <div id="drawer" />
          <div id="modal" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
