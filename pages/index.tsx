import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import sanity from "../lib/sanity/client";
import { commissionFormQuery } from "../lib/sanity/queries";
import Head from "../components/Head";
import Layout from "../components/Layout";
import FormNameInput from "../components/Name/FormNameInput";
import FormPaletteSelect from "../components/Palette/FormPaletteSelect";
import FormFrameSelect from "../components/Frame/FormFrameSelect";
import FormShippingSelect from "../components/Shipping/FormShippingSelect";
import FormPageControls from "../components/Controls/FormPageControls";
import Form from "../components/Form/Form";
import { observer } from "mobx-react-lite";
import { useStore } from "../lib/context";
import { useForm } from "react-hook-form";
import Description from "../components/Form/Description";

export const FORM_SCREENS = 4;

const Home: NextPage = ({ formData }) => {
  const {
    uiStore: { formStep },
  } = useStore();

  const { handleSubmit } = useForm();

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
    default:
  }

  return (
    <>
      <Head />

      <Layout id={formStep}>
        <Description value={description} />
        <Form>{formScreen}</Form>
      </Layout>
      <FormPageControls />
    </>
  );
};

export const getStaticProps = async () => {
  const formData = await sanity.fetch(commissionFormQuery);

  return {
    props: { formData },
  };
};

export default observer(Home);
