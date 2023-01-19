import Controls from "@/components/Controls/Controls";
import Form from "@/components/Form/Form";
import PriceTracker from "@/components/PriceTracker/PriceTracker";
import OrderSummary from "@/components/ReviewCommission/OrderSummary";

import StatusBar from "@/components/StatusBar/StatusBar";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import { useWindowSize } from "@/utils/helpers";
import { observer } from "mobx-react-lite";
import { useTheme } from "next-themes";
import { useQueryState, queryTypes } from "next-usequerystate";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDataStore, useUIStore } from "providers/RootStoreProvider";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import BlockContent from "@/components/BlockContent";
import Modal from "../modal";
import MobileDescription from "../Form/MobileDescription";
import Description from "../Form/Description";
import Balancer from "react-wrap-balancer";
import TypingTutorial from "../Form/TypingTutorial";

const WoodgrainShaderSketch = dynamic(
  () => import("../WoodgrainShaderSketch"),
  { loading: () => "", ssr: false }
);

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
  const [cookie, setCookie, removeCookie] = useCookies(["nora"]);
  const {
    formData,
    setFormData,
    name,
    colors,
    frame,
    shipping,
    additionalInfo,
    minNumLetters,
    minNumColors,
    isColorCompleted,
    isFrameCompleted,
    isShippingCompleted,
  } = useDataStore();
  const { modalActive, showModal, hideModal } = useUIStore();

  useSettings({
    minNumLetters: data?.name?.minNumLetters,
    price: data?.name?.price,
    minNumColors: data?.color?.minNumColors,
    maxNumColors: data?.color?.maxNumColors,
  });

  const router = useRouter();
  const { step, status } = router.query;
  const { width, height } = useWindowSize();
  const { theme } = useTheme();

  useEffect(() => {
    if (router.isReady) {
      setCookie(
        "nora",
        JSON.stringify({
          name,
          colors,
          frame,
          shipping,
          additionalInfo,
        }),
        {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        }
      );
    }
  }, [
    router.isReady,
    setCookie,
    name,
    colors,
    frame,
    shipping,
    additionalInfo,
  ]);

  /*
   * On initial mount, set the query state to 0
   */
  useEffect(() => {
    if (router.isReady) {
      if (router.query.status === "cancel") {
        toast.error("Problem processing payment. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme,
        });
      }

      if (router.query.status === "success") {
        removeCookie("nora");
        return;
      }

      if (cookie.nora) {
        setFormData(cookie.nora);
        if (
          cookie.nora.name.length >= minNumLetters &&
          cookie.nora.colors.length >= minNumColors &&
          cookie.nora.frame !== null &&
          cookie.nora.shipping !== null
        ) {
          router.push(`/order?step=5`, undefined, { shallow: true });
        } else {
          router.push(`/order?step=1`, undefined, { shallow: true });
        }
      } else {
        showModal();
        router.push(`/order?step=1`, undefined, { shallow: true });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

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

  let slug = null;
  let description = null;
  switch (parseInt(step)) {
    case 1:
      description = data.name.description;
      break;
    case 2:
      description = data.color.description;
      break;
    case 3:
      description = data.frame.description;
      break;
    case 4:
      description = data.shipping.description;
      break;
  }

  if (!router.isReady) {
    return (
      <div className="h-screen w-screen flex items-center justify-center pb-64">
        <div
          role="status"
          className="w-full h-full flex justify-center items-center"
        >
          <svg
            aria-hidden="true"
            className="mr-2 w-32 h-32 text-gray-200 animate-spin text-brown fill-orange"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <>
      {router.query.status === "success" && (
        <div className="order--success">
          <BlockContent
            className="order--success-message"
            blocks={data?.successMessage}
          />
        </div>
      )}
      {router.query.status !== "success" && (
        <>
          <Form data={data} step={parseInt(step)} />
          <div className="fixed bottom-0 inset-x-0 flex flex-col gap-16 p-16 sm:p-36 pointer-events-none">
            <Controls
              data={data}
              step={parseInt(step)}
              decrement={decrement}
              increment={increment}
            />
            <MobileDescription value={description} step={parseInt(step)} />
          </div>

          <TypingTutorial name={data?.name?.exampleName} />

          <PriceTracker step={parseInt(step)} />
          <Description value={description} step={parseInt(step)} />

          <StatusBar
            step={parseInt(step)}
            hasInformation={data?.modalContent}
          />
        </>
      )}
      <ThemeSwitcher />
      <WoodgrainShaderSketch
        className="hidden md:block absolute top-0 left-0 right-0 bottom-0 -z-1"
        width={width}
        height={height}
        scale={{ current: -2.0 }}
        rate={{ current: 0.2 }}
        color={{ current: theme === "dark" ? "#000" : "#fff" }}
        alpha={{ current: theme === "dark" ? 0.5 : 0.2 }}
      />
      {data?.modalContent && (
        <Modal isOpen={modalActive} onClose={() => hideModal()}>
          <div className="max-w-md flex flex-col">
            <BlockContent blocks={data.modalContent} />
            <button
              className="btn is-white modal--toggle"
              onClick={() => hideModal()}
            >
              Let's do it
            </button>
          </div>
        </Modal>
      )}
    </>
  );
});

export default Order;
