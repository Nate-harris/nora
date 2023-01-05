import { PortableText, toPlainText } from "@portabletext/react";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useUIStore } from "../../providers/RootStoreProvider";

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.4 },
  },
};

const Description = observer(({ value, step }) => {
  const { formStep } = useUIStore();
  if (!value) return null;
  return (
    <AnimatePresence>
      <motion.div layout="position" className={`description`}>
        <motion.span layout="position" className={`description-index`}>
          {step}
        </motion.span>
        <motion.div
          layout="position"
          className="max-w-md"
          key={toPlainText(value)}
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          <PortableText value={value} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});
export default Description;
