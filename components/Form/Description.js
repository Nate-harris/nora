import { swipeDownAnim } from "@/lib/framer/animations";
import { replaceTemplateTags } from "@/utils/helpers";
import { PortableText, toPlainText } from "@portabletext/react";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../providers/RootStoreProvider";

const variants = {
  hidden: {
    opacity: 0,
    transition: {
      delay: 0.1,
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, delay: 0.4 },
  },
};

const Description = observer(({ value, step }) => {
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

  if (!value) return null;
  return (
    <div className={`description`}>
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
  );
});
export default Description;
