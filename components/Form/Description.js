import { swipeAnim, swipeDownAnim } from "@/lib/framer/animations";
import { replaceTemplateTags } from "@/utils/helpers";
import { PortableText, toPlainText } from "@portabletext/react";
import { useRect } from "@reach/rect";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
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

  const [descriptionWidth, setDescriptionWidth] = useState(null);

  const descriptionRef = useRef();
  const descriptionRect = useRect(descriptionRef);

  useEffect(() => {
    if (descriptionRect) {
      setDescriptionWidth(descriptionRect.width);
    }
  }, [descriptionRect]);

  if (!value) return null;
  return (
    <div className={`description relative`}>
      <div className="top-1/2 -translate-y-1/2  absolute">
        <motion.div className={`-translate-x-28 description-index`}>
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
        </motion.div>
        <motion.div
          initial={{ width: 350 }}
          animate={{ width: descriptionWidth }}
        />
      </div>

      <motion.div className="ml-58 max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            ref={descriptionRef}
            key={toPlainText(parsedValue)}
            initial="hide"
            animate="show"
            exit="hide"
            variants={swipeDownAnim}
          >
            <PortableText value={parsedValue} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
});
export default Description;
