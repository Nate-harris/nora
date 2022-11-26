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

const BottomDrawer = observer(({ children }) => {
  return (
    <div className="hidden md:flex flex-col fixed bottom-0 left-0 right-0 items-center justify-center">
      {children}
    </div>
  );
});
export default BottomDrawer;
