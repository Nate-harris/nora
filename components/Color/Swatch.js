import { motion } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";

import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import ColoringBook from "./ColoringBook";
import cx from "classnames";
const variants = {
  in: {
    opacity: 1,
    transition: FRAMER_TRANSITION_FASTEASE,
  },
  out: {
    opacity: 0,
    transition: FRAMER_TRANSITION_FASTEASE,
  },
};

export default observer(({ data }) => {
  const { addColor, removeColor, colors, maxNumColors } = useDataStore();

  const active = colors.map((color) => color.hex).includes(data.hex);
  const handleClick = () => {
    if (active) {
      removeColor(data);
    } else {
      if (colors.length < maxNumColors) {
        addColor(data);
      }
    }
  };

  return (
    <div
      key={data.name}
      onClick={handleClick}
      className={cx(
        "color-picker--swatch",
        active && "is-active",
        colors.length >= maxNumColors && !active && "is-disabled"
      )}
    >
      <div
        className={cx("color-picker--swatch-border", active && "is-active")}
      ></div>
      <div
        className={cx("color-picker--swatch-fill")}
        style={{ background: data.hex }}
      ></div>
    </div>
  );
});
