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
      delay: 0.1,
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, delay: 0.4 },
  },
};

const indexContainerVariants = {
  hide: {
    opacity: 0,
    transition: {
      opacity: {
        duration: 0.3,
      },
    },
  },
  show: {
    opacity: 1,
    transition: {
      opacity: {
        delay: 0.3,
        duration: 0.2,
      },
    },
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
    <div className={`description`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial="hide"
          animate="show"
          exit="hide"
          variants={indexContainerVariants}
          className={`description-index`}
        >
          <motion.span
            key={step}
            initial="hide"
            animate="show"
            exit="hide"
            variants={swipeAnim}
          >
            {step}
          </motion.span>
        </motion.div>
      </AnimatePresence>

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
