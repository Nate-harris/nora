import { PortableText, toPlainText } from "@portabletext/react";
import { AnimatePresence, motion } from "framer-motion";
import { useIdleTimer } from "react-idle-timer";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useRef } from "react";

import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import cx from "classnames";

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const useTyping = (text) => {
  const [typed, setTyped] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isDeleting && typed.length < text.length) {
      const delay = typed.length === 0 ? 2000 : 200;
      setTimeout(() => {
        setTyped(typed + text[typed.length]);
      }, delay);
    } else {
      setIsDeleting(typed.length !== 0);

      const delay = typed.length === text.length ? 2000 : 200;
      timerRef.current = setTimeout(() => {
        setTyped(typed.slice(0, -1));
      }, delay);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [typed, text, isDeleting]);

  return typed;
};

const TypingTutorial = observer(({ name = "George" }) => {
  const { formData } = useDataStore();
  const typed = useTyping(name);

  const [showingTutorial, setShowingTutorial] = useState(false);

  const onIdle = () => {
    setShowingTutorial(true);
  };

  const onActive = (event) => {
    setShowingTutorial(false);
  };

  const idleTimer = useIdleTimer({
    onIdle,
    onActive,
    timeout: 1000 * 60 * 0.5,
  });

  return (
    <div className="hidden sm:flex justify-center items-start fixed z-9 bottom-4 inset-x-0 text-12 leading-100 p-32 pointer-events-none">
      <AnimatePresence>
        {showingTutorial && formData.name.length === 0 && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cx(
              "relative font-delaGothicOne uppercase text-36 h-56 border-8 border-pageText pb-6 px-10 after:content-[''] after:absolute after:top-2 after:bottom-2 after:right-6 after:w-1 after:bg-orange after:animate-blink",
              typed.length === 0 && "text-orange"
            )}
          >
            {typed.length === 0 ? "Nora" : typed}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
export default TypingTutorial;
