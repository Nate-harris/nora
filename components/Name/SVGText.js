import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../providers/RootStoreProvider";

const parts_per_letter = {
  a: 2,
};

const getSourceSVG = async () => {
  const resp = await fetch("/SVG/letters/letters.svg");
  const text = await resp.text();
  return new DOMParser().parseFromString(text, "image/svg+xml")
    ?.documentElement;
};

const src_svg = getSourceSVG();

const pathFromLetter = async (letter) => {
  const s = await src_svg();
  debugger;
};

export default observer(({ data }) => {
  const { name, setName } = useDataStore();

  return (
    <motion.svg>
      {name.split("").forEach((letter) => {
        [...Array(parts_per_letter[letter])].map((_, i) => {});
      })}
    </motion.svg>
  );
});
