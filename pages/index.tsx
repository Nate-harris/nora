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
import OrderSummary from "../components/ReviewCommission/OrderSummary";
import Form from "../components/Form/Form";
import { observer } from "mobx-react-lite";
import { useStore } from "../lib/context";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CartSummary from "../components/CartSummary";
import PriceTracker from "../components/PriceTracker/PriceTracker";
import { useShoppingCart } from "use-shopping-cart";
export const FORM_SCREENS = 4;

const Home: NextPage = ({ formData }) => {
  const {
    dataStore: { setCommissionId },
  } = useStore();

  return (
    <>
      <Head />
      <Form formData={formData} />
      <FormPageControls />
      <PriceTracker />
    </>
  );
};

export const getStaticProps = async () => {
  const formData = await sanity.fetch(commissionFormQuery);

  return {
    props: { formData },
  };
};

export default Home;
