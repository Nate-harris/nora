import React, { useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import cx from "classnames";

import { InPortal } from "@/utils/helpers";

const Modal = ({ isOpen = false, onClose = () => {}, className, children }) => {
  const modalRef = useRef();
  const [isActive, setIsActive] = useState(isOpen);

  useEffect(() => {
    setIsActive(isOpen);
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.which === 27) {
      onClose(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive]);

  return (
    <InPortal id="modal">
      <>
        <FocusTrap
          active={isActive}
          focusTrapOptions={{
            fallbackFocus: () => modalRef.current,
            allowOutsideClick: true,
          }}
        >
          <m.div
            ref={modalRef}
            key="modal"
            initial="hide"
            animate={isActive ? "show" : "hide"}
            variants={{
              show: {
                opacity: 1,
              },
              hide: {
                opacity: 0,
              },
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={cx("modal", className, {
              "is-active": isActive,
            })}
          >
            <div className="modal--inner">{children}</div>
          </m.div>
        </FocusTrap>

        <div
          className={cx("modal--backdrop", {
            "is-active": isOpen,
          })}
          onClick={() => onClose(false)}
        />
      </>
    </InPortal>
  );
};

export default Modal;
