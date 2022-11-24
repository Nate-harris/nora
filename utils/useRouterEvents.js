import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUIStore } from "../providers/RootStoreProvider";

export const useRouterEvents = () => {
  const router = useRouter();
  const { clearRouteVariables } = useUIStore();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      clearRouteVariables();
      console.log(
        `App is changing to ${url} ${
          shallow ? "with" : "without"
        } shallow routing`
      );
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [clearRouteVariables, router.events]);
};
