import { useStore } from "../../lib/context";
import { observer } from "mobx-react-lite";
import FormNameInput from "../Name/FormNameInput";
import FormPaletteSelect from "../Palette/FormPaletteSelect";
import FormFrameSelect from "../Frame/FormFrameSelect";
import FormShippingSelect from "../Shipping/FormShippingSelect";
import OrderSummary from "../ReviewCommission/OrderSummary";
import Description from "../Form/Description";
import Layout from "./Layout";
import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import StatusBar from "../StatusBar/StatusBar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { useWindowSize } from "../../utils/helpers";
import dynamic from "next/dynamic";
import { nameSelection } from "../../lib/sanity/queries";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import BottomDrawer from "./BottomDrawer";
import TypingTutorial from "./TypingTutorial";
import { useIsSmall } from "../../utils/useMediaQueries";
import MobileDescription from "./MobileDescription";
const WoodgrainShaderSketch = dynamic(
  () => import("../WoodgrainShaderSketch"),
  { ssr: false }
);

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

export default observer(({ formData }) => {
  const { formStep } = useUIStore();
  const { updateLetterPrice, updateLetterMinimum } = useDataStore();
  const { theme } = useTheme();

  const { clearCart } = useShoppingCart();
  const isSmall = useIsSmall();
  console.log(formData);
  useEffect(() => {
    updateLetterMinimum(formData?.nameSelection?.minNumLetters);
    updateLetterPrice(formData?.nameSelection?.price);
    clearCart();
  }, []);

  const { width, height } = useWindowSize();

  let formScreen = null;
  let description = null;
  let key;
  switch (formStep) {
    case 0:
      key = "name";
      const { nameSelection } = formData;
      formScreen = (
        <FormNameInput
          pricePerLetter={nameSelection?.price}
          maxNumLetters={nameSelection?.maxNumLetters}
        />
      );
      description = formData?.nameSelection?.description;
      break;
    case 1:
      key = "color";
      const { colorSelection } = formData;
      formScreen = <FormPaletteSelect options={colorSelection?.palettes} />;
      description = formData?.colorSelection?.description;
      break;
    case 2:
      key = "frame";
      const { frameSelection } = formData;
      formScreen = <FormFrameSelect options={frameSelection?.options} />;
      description = frameSelection?.description;
      break;
    case 3:
      key = "shipping";
      const { shippingSelection } = formData;
      formScreen = <FormShippingSelect options={shippingSelection?.options} />;
      description = shippingSelection?.description;
      break;
    case 4:
      key = "summary";
      formScreen = <OrderSummary />;
  }
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.form
          key={key}
          className="control"
          initial={"initial"}
          animate={"active"}
          exit={"initial"}
          variants={isSmall ? mobileVariants : variants}
        >
          <MobileDescription value={description} />
          {formScreen}
        </motion.form>
      </AnimatePresence>
      <WoodgrainShaderSketch
        className="hidden md:block absolute top-0 left-0 right-0 bottom-0 -z-1"
        width={width}
        height={height}
        scale={{ current: -2.0 }}
        rate={{ current: 0.2 }}
        alpha={{ current: theme === "dark" ? 0.5 : 0.2 }}
      />
      <BottomDrawer>
        <TypingTutorial name={formData?.nameSelection?.exampleName} />
        <Description value={description} />
      </BottomDrawer>

      <StatusBar />
      <ThemeSwitcher />
    </>
  );
});
