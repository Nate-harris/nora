import { PortableText } from "@portabletext/react";

import { observer } from "mobx-react-lite";
import css from "styled-jsx/css";
import { formatCurrencyString } from "use-shopping-cart";
import { motion, useMotionValue } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
  FRAMER_TRANSITION_FASTEREASE,
} from "../../lib/framer/animations";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import imageUrlFor from "../../lib/sanity/imageUrlFor";
import Palette from "../ReviewCommission/Palette";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useRect } from "@reach/rect";
import cx from "classnames";
import { truncateString } from "../../studio/lib/helpers";
import { useIsSmall } from "../../utils/useMediaQueries";
import { FORM_SCREENS } from "../Order/Order";

const variants = {
  active: {
    opacity: 1,
    transition: FRAMER_TRANSITION_FASTEREASE,
  },
  inactive: {
    opacity: 0,
    transition: FRAMER_TRANSITION_FASTEREASE,
  },
};

const reviewVariants = {
  active: ({ height, width }) => ({
    height,
    width,
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 0.3,
      opacity: {
        delay: 0.4,
        duration: 0.8,
      },
    },
  }),

  inactive: {
    height: 0,
    width: 0,
    opacity: 0,
    transition: {
      ...FRAMER_TRANSITION_EASEOUT,
      delay: 0.1,
      opacity: {
        delay: 0,
        duration: 0.25,
      },
    },
  },
};

const overlayVariants = {
  active: {
    opacity: 0.8,
    transition: {
      ...FRAMER_TRANSITION_EASEOUT,
      delay: 0.3,
    },
  },

  inactive: {
    opacity: 0,
    transition: FRAMER_TRANSITION_EASEOUT,
  },
};

const PriceTracker = observer(({ step }) => {
  const { reviewOpen, toggleReviewOpen } = useUIStore();
  const {
    formData,
    name,
    colors,
    frame,
    shipping,
    isNameCompleted,
    isColorCompleted,
    isFrameCompleted,
    isShippingCompleted,
    productPrice,
    minNumLetters,
  } = useDataStore();

  const reviewRef = useRef();
  const reviewRect = useRect(reviewRef);
  const [reviewHeight, setReviewHeight] = useState(0);
  useEffect(() => {
    if (reviewRect) {
      setReviewHeight(reviewRect.height);
    }
  }, [reviewRect]);

  const mobileNamePrice = formatCurrencyString({
    value: formData.name.length * formData?.letterPrice,
    currency: "USD",
  });
  const namePrice = `${formData.name.length} x letters (${formatCurrencyString({
    value: formData?.letterPrice,
    currency: "USD",
  })} each) ${formatCurrencyString({
    value: formData.name.length * formData?.letterPrice,
    currency: "USD",
  })}`;

  const palettePrice = formatCurrencyString({
    value: 0,
    currency: "USD",
  });
  const framePrice = formatCurrencyString({
    value: formData?.framePrice,
    currency: "USD",
  });
  const shippingPrice = formatCurrencyString({
    value: formData?.shippingPrice,
    currency: "USD",
  });

  const isSmall = useIsSmall();

  return (
    <>
      <motion.div
        variants={variants}
        className={cx(
          "price-tracker",
          step === FORM_SCREENS + 1 && "is-checkout"
        )}
        initial={"inactive"}
        animate={
          productPrice === 0 || formData.name.length < minNumLetters
            ? "inactive"
            : "active"
        }
      >
        <motion.div
          variants={overlayVariants}
          initial={"inactive"}
          animate={reviewOpen ? "active" : "inactive"}
          className={cx(
            "price-tracker--overlay",
            reviewOpen && "pointer-events-auto"
          )}
        />

        <motion.div
          className={cx("price-tracker--container")}
          layout="position"
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="price-tracker--bubble">
            <div className="price-tracker--bubble-header">
              <div className="price-tracker--bubble-header-label">
                <span className="price-tracker--label">Total</span>
                {formatCurrencyString({
                  value: productPrice,
                  currency: "USD",
                })}
              </div>
            </div>

            <motion.div
              custom={{
                height: reviewHeight,
                width: isSmall ? "100%" : 500,
              }}
              variants={reviewVariants}
              initial={"inactive"}
              animate={reviewOpen ? "active" : "inactive"}
              className="price-tracker--review"
            >
              <div ref={reviewRef}>
                {isNameCompleted && (
                  <div className="price-tracker--row">
                    <span className="price-tracker--row--label">
                      {truncateString(name, 10)}
                    </span>
                    <span className="price-tracker--row--value">
                      {isSmall ? mobileNamePrice : namePrice}
                    </span>
                  </div>
                )}
                {isColorCompleted && (
                  <div className="price-tracker--row">
                    <span className="price-tracker--row--label">
                      <Palette colors={colors} width={180} size="small" />
                    </span>
                    <span className="price-tracker--row--value">
                      {palettePrice}
                    </span>
                  </div>
                )}
                {isFrameCompleted && (
                  <div className="price-tracker--row">
                    <span className="price-tracker--row--label">
                      <img
                        className="min-w-[120px]"
                        src={imageUrlFor(frame.image).width(120)}
                      />
                    </span>
                    <span className="price-tracker--row--value">
                      {framePrice}
                    </span>
                  </div>
                )}
                {isShippingCompleted && (
                  <div className="price-tracker--row">
                    <span className="price-tracker--row--label">
                      {shipping}
                    </span>
                    <span className="price-tracker--row--value">
                      {shippingPrice}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <button
            onClick={toggleReviewOpen}
            className={cx("price-tracker--toggle", reviewOpen && "is-active")}
          >
            {reviewOpen ? "x" : "i"}
          </button>
        </motion.div>
      </motion.div>
    </>
  );
});

export default PriceTracker;
