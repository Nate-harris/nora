import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";

const { className, styles } = css.resolve`
  div {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--spacing-l);
  }
  @media only screen and (max-width: 768px) {
    div {
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

export default observer(() => {
  const {
    uiStore: {
      incrementFormStep,
      decrementFormStep,
      isNextButtonDisabled,
      isPreviousButtonDisabled,
    },
  } = useStore();
  return (
    <div className={className}>
      <Button
        onClick={decrementFormStep}
        label="Previous"
        disabled={isPreviousButtonDisabled}
      />
      <Button
        onClick={incrementFormStep}
        label="Next"
        disabled={isNextButtonDisabled}
      />
      {styles}
    </div>
  );
});
