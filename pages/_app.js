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
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <CookiesProvider>
      <RootStoreProvider hydrationData={props.pageProps.hydrationData}>
        <ThemeProvider>
          <Cart>
            <App {...props} />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </Cart>
        </ThemeProvider>
      </RootStoreProvider>
    </CookiesProvider>
  );
}

export default AppWithProviders;
