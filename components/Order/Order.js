import Controls from "@/components/Controls/Controls";
import Form from "@/components/Form/Form";
import PriceTracker from "@/components/PriceTracker/PriceTracker";
import OrderSummary from "@/components/ReviewCommission/OrderSummary";

import StatusBar from "@/components/StatusBar/StatusBar";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import { observer } from "mobx-react-lite";
import { useQueryState, queryTypes } from "next-usequerystate";
import { useRouter } from "next/router";
import { useDataStore } from "providers/RootStoreProvider";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export const FORM_SCREENS = 4;

const useSettings = ({ minNumLetters, minNumColors, maxNumColors, price }) => {
  const {
    updateLetterPrice,
    updateLetterMinimum,
    updateColorMinimum,
    updateColorMaximum,
  } = useDataStore();
  useEffect(() => {
    updateLetterMinimum(minNumLetters);
    updateColorMinimum(minNumColors);
    updateColorMaximum(maxNumColors);
    updateLetterPrice(price);
  }, [
    maxNumColors,
    minNumColors,
    minNumLetters,
    price,
    updateColorMaximum,
    updateColorMinimum,
    updateLetterMinimum,
    updateLetterPrice,
  ]);
};

const Order = observer(({ data }) => {
  const [cookie, setCookie] = useCookies(["nora"]);
  const {
    formData,
    setFormData,
    name,
    colors,
    frame,
    shipping,
    minNumLetters,
    isColorCompleted,
    isFrameCompleted,
    isShippingCompleted,
  } = useDataStore();

  useSettings({
    minNumLetters: data?.name?.minNumLetters,
    price: data?.name?.price,
    minNumColors: data?.color?.minNumColors,
    maxNumColors: data?.color?.maxNumColors,
  });

  useEffect(() => {
    setCookie(
      "nora",
      JSON.stringify({
        name,
        colors,
        frame,
        shipping,
      }),
      {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      }
    );
  }, [setCookie, name, colors, frame, shipping]);

  const router = useRouter();
  const { step, status } = router.query;

  /*
   * On initial mount, set the query state to 0
   */
  useEffect(() => {
    if (cookie.nora) {
      setFormData(cookie.nora);
      if (
        cookie.nora.name.length >= minNumLetters &&
        cookie.nora.palette !== null &&
        cookie.nora.frame !== null &&
        cookie.nora.shipping !== null
      ) {
        router.push(`/order?step=5`, undefined, { shallow: true });
      } else {
        router.push(`/order?step=1`, undefined, { shallow: true });
      }
    } else {
      router.push(`/order?step=1`, undefined, { shallow: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const decrement = () => {
    if (parseInt(step) === 1) return;
    router.push(`/order?step=${parseInt(step) - 1}`, undefined, {
      shallow: true,
    });
  };

  const increment = () => {
    if (parseInt(step) >= FORM_SCREENS + 1) return;
    router.push(`/order?step=${parseInt(step) + 1}`, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <Form data={data} step={parseInt(step)} />
      <Controls
        data={data}
        step={parseInt(step)}
        decrement={decrement}
        increment={increment}
      />
      <PriceTracker step={parseInt(step)} />
      <StatusBar step={parseInt(step)} />
      <ThemeSwitcher />
    </>
  );
});

export default Order;
