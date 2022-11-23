import { PortableText, toPlainText } from "@portabletext/react";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
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

const Description = observer(({ value }) => {
  const { formStep } = useUIStore();
  if (!value) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center">
      <AnimatePresence>
        <motion.div
          layout
          data-step={formStep + 1}
          className={`shadow-md my-38 py-8 pr-24 bg-pageText text-pageBG rounded-full flex items-center before:content-[attr(data-step)] before:text-12 before:shadow-md before:bg-pageBG before:text-pageText before:h-28 before:w-48 before:flex before:items-center before:justify-center before:rounded-full before:mx-12 before:mr-16`}
        >
          <motion.div
            key={toPlainText(value)}
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            <PortableText value={value} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});
export default Description;
