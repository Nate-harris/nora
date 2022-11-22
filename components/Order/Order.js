import FormPageControls from "../Controls/FormPageControls";
import Form from "../Form/Form";
import PriceTracker from "../PriceTracker/PriceTracker";

const Order = ({ data }) => {
  return (
    <>
      <Form formData={data} />
      <FormPageControls />
      <PriceTracker />
    </>
  );
};

export default Order;
