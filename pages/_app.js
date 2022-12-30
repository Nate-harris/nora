import "../styles/tailwind.css";
import "../styles/app.css";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import { RootStoreProvider, useUIStore } from "../providers/RootStoreProvider";
import { ThemeProvider } from "next-themes";
import { useRouterEvents } from "../utils/useRouterEvents";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";

import { useIsSmall } from "../utils/useMediaQueries";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { isBrowser, useScrollRestoration } from "@/utils/helpers";
import { pageTransitionSpeed } from "@/lib/framer/animations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const App = observer(({ Component, pageProps }) => {
  const { isPageTransition, togglePageTransition, clearRouteVariables } =
    useUIStore();

  const isSmall = useIsSmall();
  const router = useRouter();

  // Handle scroll position on history change
  useScrollRestoration(router, pageTransitionSpeed);

  // Trigger our loading class
  useEffect(() => {
    if (isBrowser) {
      document.documentElement.classList.toggle("is-loading", isPageTransition);
    }
  }, [isPageTransition]);

  // Setup page transition loading states
  useEffect(() => {
    router.events.on("routeChangeStart", (_, { shallow }) => {
      // Bail if we're just changing URL parameters
      if (shallow) return;

      // Otherwise, start loading
      togglePageTransition(true);
    });

    router.events.on("routeChangeComplete", () => {
      clearRouteVariables();
      setTimeout(() => togglePageTransition(false), pageTransitionSpeed);
    });

    router.events.on("routeChangeError", () => {
      togglePageTransition(false);
    });
  }, []);

  // intelligently add focus states if keyboard is used
  const handleFirstTab = (event) => {
    if (event.keyCode === 9) {
      if (isBrowser) {
        document.body.classList.add("is-tabbing");
        window.removeEventListener("keydown", handleFirstTab);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleFirstTab);
    return () => {
      window.removeEventListener("keydown", handleFirstTab);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          document.body.classList.remove("overflow-hidden");
        }}
      >
        <Component {...pageProps} />
      </AnimatePresence>
    </LazyMotion>
  );
});

function AppWithProviders(props) {
  return (
    <CookiesProvider>
      <RootStoreProvider hydrationData={props.pageProps.hydrationData}>
        <ThemeProvider>
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
        </ThemeProvider>
      </RootStoreProvider>
    </CookiesProvider>
  );
}

export default AppWithProviders;
