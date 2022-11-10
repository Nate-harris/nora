import { commissionFormQuery } from "../lib/sanity/queries";
import Head from "../components/Head";
import FormPageControls from "../components/Controls/FormPageControls";
import Form from "../components/Form/Form";

import PriceTracker from "../components/PriceTracker/PriceTracker";
import StatusBar from "../components/StatusBar/StatusBar";
import { sanityClient } from "../lib/sanity/client";

export const FORM_SCREENS = 4;

const Home = ({ formData }) => {
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
  const formData = await sanityClient.fetch(commissionFormQuery);

  return {
    props: { formData },
  };
};

export default Home;
