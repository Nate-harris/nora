import { motion } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import cx from "classnames";

export default observer(
  ({ onClick, label, type, loading, disabled, className, ...props }) => {
    return (
      <>
        <button
          className={cx(
            "btn",
            loading && "is-active",
            disabled && "is-disabled",
            className
          )}
          onClick={onClick}
          disabled={disabled}
          {...props}
        >
          {loading ? <LoaderSpinner /> : label}
        </button>
      </>
    );
  }
);
