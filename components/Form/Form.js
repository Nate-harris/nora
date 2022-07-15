import { useStore } from "../../lib/context";
import { observer } from "mobx-react-lite";
import css from "styled-jsx/css";
import FormNameInput from "../Name/FormNameInput";
import FormPaletteSelect from "../Palette/FormPaletteSelect";
import FormFrameSelect from "../Frame/FormFrameSelect";
import FormShippingSelect from "../Shipping/FormShippingSelect";
import OrderSummary from "../ReviewCommission/OrderSummary";
import Description from "../Form/Description";
import Layout from "../Layout";
import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";

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
  const {
    uiStore: { formStep },
  } = useStore();

  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
  }, []);

  let formScreen = null;
  let description = null;
  switch (formStep) {
    case 0:
      formScreen = <FormNameInput />;
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
    <Layout id={formStep}>
      <Description value={description} />
      <form key="nora-commission-form" className={className}>
        {formScreen}
      </form>
      {styles}
    </Layout>
  );
});
