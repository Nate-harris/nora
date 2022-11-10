import { sanityClient } from "../lib/sanity/client";
import { commissionFormQuery } from "../lib/sanity/queries";
import FormPageControls from "../components/Controls/FormPageControls";
import Form from "../components/Form/Form";

import PriceTracker from "../components/PriceTracker/PriceTracker";

export const FORM_SCREENS = 4;

const OrderPage = ({ formData }) => {
  return (
    <>
      <Form formData={formData} />
      <FormPageControls />
      <PriceTracker />
    </>
  );
};

export const getStaticProps = async () => {
  const formData = await sanityClient.fetch(commissionFormQuery);

  return {
    props: { formData },
  };
};

export default OrderPage;
