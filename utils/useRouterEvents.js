import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUIStore } from "../providers/RootStoreProvider";

export const useRouterEvents = () => {
  const router = useRouter();
  const { clearRouteVariables } = useUIStore();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {};

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [clearRouteVariables, router.events]);
};
