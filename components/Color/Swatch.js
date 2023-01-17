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

  const handleClick = (color) => {
    if (colors.includes(color.hex)) {
      removeColor(color.hex);
    } else {
      if (colors.length < maxNumColors) {
        addColor(color.hex);
      }
    }
  };

  return (
    <div
      key={data.name}
      onClick={() => handleClick(data)}
      className={cx(
        "color-picker--swatch",
        colors.includes(data.hex) && "is-active",
        colors.length >= maxNumColors &&
          !colors.includes(data.hex) &&
          "is-disabled"
      )}
    >
      <div
        className={cx(
          "color-picker--swatch-border",
          colors.includes(data.hex) && "is-active"
        )}
      ></div>
      <div
        className={cx("color-picker--swatch-fill")}
        style={{ background: data.hex }}
      ></div>
    </div>
  );
});
