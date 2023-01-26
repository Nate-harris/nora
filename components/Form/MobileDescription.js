import { replaceTemplateTags } from "@/utils/helpers";
import { PortableText, toPlainText } from "@portabletext/react";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";

import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";

const MobileDescription = observer(({ value, step }) => {
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
    <div className={`mobile-description`}>
      <div>
        <PortableText value={parsedValue} />
      </div>
    </div>
  );
});
export default MobileDescription;
