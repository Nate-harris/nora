import { observer } from "mobx-react-lite";

import NamePage from "@/components/Name/NamePage";
import ColorPage from "@/components/Color/ColorPage";
import FramePage from "@/components/Frame/FramePage";
import ShippingPage from "@/components/Shipping/ShippingPage";

import { useEffect } from "react";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";

import { useWindowSize } from "../../utils/helpers";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import {
  FRAMER_TRANSITION_FASTEASE,
  swipeAnim,
} from "../../lib/framer/animations";
import { useIsSmall } from "../../utils/useMediaQueries";
import MobileDescription from "./MobileDescription";
import TopDrawer from "./TopDrawer";
import TypingTutorial from "./TypingTutorial";
import Description from "./Description";
import OrderSummary from "@/components/ReviewCommission/OrderSummary";
import { useRouter } from "next/router";

const variants = {
  initial: {
    opacity: 0,
  },
  active: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const mobileVariants = {
  initial: {
    opacity: 1,
  },
  active: {
    opacity: 1,
  },
  exit: {
    opacity: 1,
  },
};

const Page = ({ page, data }) => {
  return (
    <>
      <NamePage data={data} />
      <ColorPage data={data} />
      <FramePage data={data} />
      <ShippingPage data={data} />
      <OrderSummary data={data} />
    </>
  );
};

export default observer(({ data, step }) => {
  const { formStep } = useUIStore();
  const {
    formData,
    updateLetterPrice,
    updateLetterMinimum,
    updateColorMinimum,
    updateColorMaximum,
  } = useDataStore();

  const router = useRouter();

  const isSmall = useIsSmall();

  let formScreen = null;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.form
          key={step}
          className="control is-order-form"
          initial={"hide"}
          animate={"show"}
          exit={"hide"}
          variants={isSmall ? mobileVariants : swipeAnim}
          autoComplete="off"
        >
          <Page page={step} data={data} />
        </motion.form>
      </AnimatePresence>
    </>
  );
});
