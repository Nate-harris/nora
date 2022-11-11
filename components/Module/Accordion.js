import React, { useState } from "react";
import { m } from "framer-motion";
import cx from "classnames";

const accordionAnim = {
  open: {
    opacity: 1,
    height: "auto",
  },
  closed: {
    opacity: 0,
    height: 0,
  },
};

const Accordion = ({
  id,
  title,
  isOpen = false,
  isControlled = false,
  onToggle = () => {},
  className,
  children,
}) => {
  const [hasFocus, setHasFocus] = useState(isOpen);

  return (
    <div key={id} className={cx("accordion", className)}>
      {!isControlled && (
        <button
          onClick={() => onToggle(id, !isOpen)}
          aria-expanded={isOpen}
          aria-controls={`accordion-${id}`}
          className={cx("accordion--toggle", { "is-open": isOpen })}
        >
          {title}
          <div className="accordion--icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox={"0 0 100 100"}>
              <polygon points="51.5 85.657 8.672 42.828 14.328 37.172 51.5 74.343 88.672 37.172 94.328 42.828 51.5 85.657" />
            </svg>
          </div>
        </button>
      )}

      <m.div
        id={`accordion-${id}`}
        className="accordion--content"
        initial={isOpen ? "open" : "closed"}
        animate={isOpen ? "open" : "closed"}
        variants={accordionAnim}
        transition={{ duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}
        onAnimationComplete={(v) => setHasFocus(v === "open")}
      >
        <div className="accordion--inner" hidden={!isOpen && !hasFocus}>
          {children}
        </div>
      </m.div>
    </div>
  );
};

export default Accordion;
