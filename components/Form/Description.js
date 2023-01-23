import { swipeAnim, swipeDownAnim } from "@/lib/framer/animations";
import { replaceTemplateTags } from "@/utils/helpers";
import { PortableText, toPlainText } from "@portabletext/react";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";

const variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, delay: 0.4 },
  },
};

const Description = observer(({ value, step }) => {
  if (!value) return null;
  const { name } = useDataStore();
  const templateTags = [
    {
      tag: "{{name}}",
      value: name,
    },
  ];
  const valueWithTags = replaceTemplateTags(
    JSON.stringify(value),
    templateTags
  );
  const parsedValue = JSON.parse(valueWithTags);
  return (
    <div className={`description`}>
      <div className={`description-index`}>
        <AnimatePresence mode="wait">
          <motion.span
            key={step}
            initial="hide"
            animate="show"
            exit="hide"
            variants={swipeAnim}
          >
            {step}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={toPlainText(parsedValue)}
            initial="hide"
            animate="show"
            exit="hide"
            variants={swipeDownAnim}
          >
            <PortableText value={parsedValue} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});
export default Description;
