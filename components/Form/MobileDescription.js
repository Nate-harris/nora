import { PortableText, toPlainText } from "@portabletext/react";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import { useUIStore } from "../../providers/RootStoreProvider";

const MobileDescription = observer(({ value }) => {
  const { formStep } = useUIStore();
  if (!value) return null;
  return (
    <div
      data-step={formStep + 1}
      className={`flex sm:hidden shadow-md py-12 pr-24 bg-pageText text-pageBG rounded-3xl items-start before:content-[attr(data-step)] before:text-12 before:shadow-md before:bg-pageBG before:text-pageText before:min-h-28 before:min-w-48 before:h-28 before:w-48 before:flex before:items-center before:justify-center before:rounded-full before:px-24 before:mx-12 before:mr-16`}
    >
      <PortableText value={value} />
    </div>
  );
});
export default MobileDescription;
