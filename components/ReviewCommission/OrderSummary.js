import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import { formatCurrencyString } from "use-shopping-cart";
import Palette from "./Palette";
import imageUrlFor from "../../lib/sanity/imageUrlFor";
const { className, styles } = css.resolve`
  div {
    display: grid;
    grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    width: 100%;
    height: 100%;
  }
  @media only screen and (max-width: 768px) {
    div {
      padding: 0px;
      display: block;
      padding: 0 0.625rem;
      padding-top: 100px;
    }
  }
`;

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

const TextLine = ({ children }) => {
  return (
    <span>
      {children}
      <style jsx>{`
        span {
          display: block;
        }
      `}</style>
    </span>
  );
};

export default observer(() => {
  const {
    dataStore: { formData, productPrice },
  } = useStore();
  return (
    <div>
      <TextLine>
        A puzzle for {formData.name} will be{" "}
        {formatCurrencyString({
          value: productPrice,
          currency: "USD",
        })}
        . <br /> It will use the{" "}
        <span
          style={{
            display: "inline-block",
            margin: "0 var(--spacing-m)",
            marginTop: "10px",
          }}
        >
          <Palette colors={formData.palette.colors} width={200} />
        </span>
        palette and have a {formData.frame.type}
        <span
          style={{
            display: "inline-block",
            margin: "0 var(--spacing-m)",
            marginTop: "10px",
          }}
        >
          <img src={imageUrlFor(formData.frame.image).width(160)} />
        </span>
        frame. It will get to you in {formData.shipping}.
      </TextLine>
      <style jsx>{`
        div {
          max-width: 500px;
          font-size: 1.8rem;
          font-family: var(--font-family-heading);
          text-align: center;
        }
      `}</style>
    </div>
  );
});
