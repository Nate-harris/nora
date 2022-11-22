import "../styles/tailwind.css";
import "../styles/app.css";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import { RootStoreProvider } from "../providers/RootStoreProvider";
import { ThemeProvider } from "next-themes";
import Cart from "../components/Cart";
import { useRouterEvents } from "../utils/useRouterEvents";

function App({ Component, pageProps }) {
  useRouterEvents();
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

function AppWithProviders(props) {
  return (
    <RootStoreProvider hydrationData={props.pageProps.hydrationData}>
      <ThemeProvider>
        <Cart>
          <App {...props} />
        </Cart>
      </ThemeProvider>
    </RootStoreProvider>
  );
}

export default AppWithProviders;
