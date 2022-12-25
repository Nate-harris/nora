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

const TopDrawer = observer(({ children }) => {
  return (
    <div className="hidden md:flex flex-col fixed top-0 left-0 right-0 items-center justify-center">
      {children}
    </div>
  );
});
export default TopDrawer;
