import { PortableText } from "@portabletext/react";
import { useStore } from "../../lib/context";
import { observer } from "mobx-react-lite";
import css from "styled-jsx/css";
import { formatCurrencyString } from "use-shopping-cart";
import { motion, useMotionValue } from "framer-motion";
import {
  FRAMER_TRANSITION_EASEOUT,
  FRAMER_TRANSITION_FASTEASE,
} from "../../lib/framer/animations";
import { useDataStore, useUIStore } from "../../providers/RootStoreProvider";
import imageUrlFor from "../../lib/sanity/imageUrlFor";
import Palette from "../ReviewCommission/Palette";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useRect } from "@reach/rect";
import cx from "classnames";
import { truncateString } from "../../studio/lib/helpers";

const variants = {
  active: {
    opacity: 1,
    y: 0,
    padding: "auto",
    transition: FRAMER_TRANSITION_FASTEASE,
  },

  inactive: {
    opacity: 0,
    y: -100,
    transition: FRAMER_TRANSITION_FASTEASE,
  },
};

const reviewVariants = {
  active: (height) => ({
    height,
    width: 500,
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
    opacity: 0.5,

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

export default observer(() => {
  const { reviewOpen, toggleReviewOpen } = useUIStore();
  const { formData, productPrice } = useDataStore();

  const reviewRef = useRef();
  const reviewRect = useRect(reviewRef);
  const [reviewHeight, setReviewHeight] = useState(0);
  useEffect(() => {
    if (reviewRect) {
      setReviewHeight(reviewRect.height);
    }
  }, [reviewRect]);

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
  return (
    <>
      <motion.div
        variants={variants}
        className={"price-tracker"}
        initial={"inactive"}
        animate={productPrice === 0 ? "inactive" : "active"}
      >
        <motion.div
          variants={overlayVariants}
          animate={reviewOpen ? "active" : "inactive"}
          className={cx(
            "price-tracker--overlay",
            reviewOpen && "pointer-events-auto"
          )}
        />

        <div className="price-tracker--container">
          <div className="price-tracker--bubble">
            <div>
              <span className="price-tracker--label">Total</span>
              {formatCurrencyString({
                value: productPrice,
                currency: "USD",
              })}
            </div>

            <motion.div
              custom={reviewHeight}
              variants={reviewVariants}
              animate={reviewOpen ? "active" : "inactive"}
              className="price-tracker--review"
            >
              <div ref={reviewRef}>
                {formData?.name && (
                  <div className="price-tracker--row">
                    <span className="price-tracker--row--label">
                      {truncateString(formData.name, 10)}
                    </span>
                    <span className="price-tracker--row--value">
                      {namePrice}
                    </span>
                  </div>
                )}
                {formData?.palette && (
                  <div className="price-tracker--row">
                    <span className="price-tracker--row--label">
                      <Palette colors={formData.palette.colors} width={180} />
                    </span>
                    <span className="price-tracker--row--value">
                      {palettePrice}
                    </span>
                  </div>
                )}
                {formData?.frame && (
                  <div className="price-tracker--row">
                    <span className="price-tracker--row--label">
                      <img
                        className="min-w-[120px]"
                        src={imageUrlFor(formData.frame.image).width(120)}
                      />
                    </span>
                    <span className="price-tracker--row--value">
                      {framePrice}
                    </span>
                  </div>
                )}
                {formData?.shipping && (
                  <div className="price-tracker--row">
                    <span className="price-tracker--row--label">
                      {formData.shipping}
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
        </div>
      </motion.div>
    </>
  );
});
