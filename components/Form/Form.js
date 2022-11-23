import { useStore } from "../../lib/context";
import { observer } from "mobx-react-lite";
import css from "styled-jsx/css";
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
const WoodgrainShaderSketch = dynamic(
  () => import("../WoodgrainShaderSketch"),
  { ssr: false }
);

export default observer(({ formData }) => {
  const { formStep } = useUIStore();
  const { updateLetterPrice } = useDataStore();

  const { clearCart } = useShoppingCart();

  useEffect(() => {
    updateLetterPrice(formData?.nameSelection?.price);
    clearCart();
  }, []);

  const { width, height } = useWindowSize();

  let formScreen = null;
  let description = null;
  switch (formStep) {
    case 0:
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
      const { colorSelection } = formData;
      formScreen = <FormPaletteSelect options={colorSelection?.palettes} />;
      description = formData?.colorSelection?.description;
      break;
    case 2:
      const { frameSelection } = formData;
      formScreen = <FormFrameSelect options={frameSelection?.options} />;
      description = frameSelection?.description;
      break;
    case 3:
      const { shippingSelection } = formData;
      formScreen = <FormShippingSelect options={shippingSelection?.options} />;
      description = shippingSelection?.description;
      break;
    case 4:
      formScreen = <OrderSummary />;
  }

  return (
    <>
      <Layout id={formStep}>
        <form key="nora-commission-form" className="control">
          {formScreen}
        </form>
      </Layout>
      <WoodgrainShaderSketch
        className={"absolute top-0 left-0 right-0 bottom-0 -z-1"}
        color={"#f2dcb5"}
        alpha={220}
        width={width}
        height={height}
      />
      <Description value={description} />
      <StatusBar />
      <ThemeSwitcher />
    </>
  );
});
