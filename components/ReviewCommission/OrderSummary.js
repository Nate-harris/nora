import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import { formatCurrencyString } from "use-shopping-cart";
import Palette from "./Palette";
import imageUrlFor from "../../lib/sanity/imageUrlFor";
import { useDataStore } from "../../providers/RootStoreProvider";
import { truncateString } from "../../studio/lib/helpers";
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
    <div className="text-18 sm:text-36 font-light leading-240 md:leading-150 text-center flex flex-col gap-32 md:gap-32 px-32">
      <div>
        A puzzle for{" "}
        <span className="font-delaGothicOne uppercase border-4 sm:border-6 border-pageText px-2 pb-3 sm:px-8 sm:pb-4">
          {truncateString(formData.name, 10)}
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

      <div>
        It will use the
        <div className="inline-block mx-20 translate-y-16 sm:translate-y-16">
          <Palette colors={formData.palette.colors} width={240} />
        </div>
        palette.
      </div>

      <div>
        It will have a
        <span className="font-delaGothicOne uppercase ml-8 sm:ml-16 whitespace-nowrap">
          {formData.frame.type}
        </span>
        <img
          className="inline-block mx-8 sm:mx-12 translate-y-16 sm:translate-y-16"
          src={imageUrlFor(formData.frame.image).width(160)}
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
