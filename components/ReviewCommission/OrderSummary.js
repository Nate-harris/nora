import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import { formatCurrencyString } from "use-shopping-cart";
import Palette from "./Palette";
import imageUrlFor from "../../lib/sanity/imageUrlFor";
import { useDataStore } from "../../providers/RootStoreProvider";
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
  const { formData, productPrice } = useDataStore();
  return (
    <div className="sm:text-36 text-18 font-light leading-150 text-center flex flex-col gap-32">
      <div>
        A puzzle for{" "}
        <span className="font-delaGothicOne uppercase border-6 border-pageText px-8 pb-4">
          {formData.name}
        </span>{" "}
        will be{" "}
        <span className="font-delaGothicOne uppercase whitespace-nowrap">
          {formatCurrencyString({
            value: productPrice,
            currency: "USD",
          })}
        </span>
        .
      </div>

      <div className="flex justify-center items-center">
        It will use the
        <span className="inline-block mx-12">
          <Palette colors={formData.palette.colors} width={180} />
        </span>
        palette
      </div>

      <div className="flex justify-center items-center">
        It will have a
        <span className="font-delaGothicOne uppercase ml-4 whitespace-nowrap">
          {formData.frame.type}
        </span>
        <img
          className="inline-block mx-12"
          src={imageUrlFor(formData.frame.image).width(120)}
        />
        frame.
      </div>
      <div>
        And it will get to you in{" "}
        <span className="font-delaGothicOne uppercase whitespace-nowrap">
          {formData.shipping}
        </span>
        .
      </div>
    </div>
  );
});
