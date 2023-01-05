import { PortableText, toPlainText } from "@portabletext/react";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";

import { useUIStore } from "../../providers/RootStoreProvider";

const MobileDescription = observer(({ value, step }) => {
  if (!value) return null;
  return (
    <div className={`mobile-description`}>
      <span className="mobile-description-index">{step + 1}</span>
      <PortableText value={value} />
    </div>
  );
});
export default MobileDescription;
