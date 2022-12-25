import { PortableText, toPlainText } from "@portabletext/react";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";

import { useUIStore } from "../../providers/RootStoreProvider";

const MobileDescription = observer(({ value, step }) => {
  if (!value) return null;
  return (
    <div
      className={`flex sm:hidden shadow-md py-12 pr-24 bg-pageText text-pageBG rounded-3xl items-start`}
    >
      <span className="text-12 shadow-md bg-pageBG text-pageText min-h-28 min-w-48 h-28 w-48 flex items-center justify-center rounded-full px-24 mx-12 mr-16">
        {step + 1}
      </span>
      <PortableText value={value} />
    </div>
  );
});
export default MobileDescription;
