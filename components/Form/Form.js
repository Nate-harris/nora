import { observer } from "mobx-react-lite";

import NamePage from "@/components/Name/NamePage";
import ColorPage from "@/components/Color/ColorPage";
import { AnimatePresence, motion } from "framer-motion";
import { useIsSmall } from "../../utils/useMediaQueries";
import OrderSummary from "@/components/ReviewCommission/OrderSummary";

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
  switch (page) {
    case 1:
      return <NamePage data={data} />;
    case 2:
      return <OrderSummary data={data} />;
    default:
      return null;
  }
};

export default observer(({ data, step }) => {
  const isSmall = useIsSmall();

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
