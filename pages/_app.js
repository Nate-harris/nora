import "../styles/tailwind.css";
import "../styles/app.css";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import { RootStoreProvider } from "../providers/RootStoreProvider";
import { ThemeProvider } from "next-themes";
import Cart from "../components/Cart";
import { useRouterEvents } from "../utils/useRouterEvents";
import { MotionConfig } from "framer-motion";
import { useIsSmall } from "../utils/useMediaQueries";

function App({ Component, pageProps }) {
  useRouterEvents();
  const isSmall = useIsSmall();
  return (
    <>
      <MotionConfig reducedMotion={isSmall ? "always" : "user"}>
        <Component {...pageProps} />
      </MotionConfig>
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
