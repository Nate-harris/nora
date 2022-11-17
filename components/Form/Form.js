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
import { useUIStore } from "../../providers/RootStoreProvider";
import StatusBar from "../StatusBar/StatusBar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

const { className, styles } = css.resolve`
  form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (max-width: 768px) {
    form {
    }
  }
`;

export default observer(({ formData }) => {
  const { formStep } = useUIStore();

  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
  }, []);

  let formScreen = null;
  let description = null;
  switch (formStep) {
    case 0:
      const { nameSelection } = formData;
      formScreen = (
        <FormNameInput maxNumLetters={nameSelection?.maxNumLetters} />
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

        {styles}
      </Layout>
      <Description value={description} />
      <StatusBar />
      <ThemeSwitcher />
    </>
  );
});
