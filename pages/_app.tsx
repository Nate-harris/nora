import "../styles/globals.css";
import "../styles/fonts.css";
import type { AppProps } from "next/app";
import Cart from "../components/Cart";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Cart>
      <Component {...pageProps} />
    </Cart>
  );
}

export default MyApp;
