import { useStore } from "../../lib/context";
import { useForm } from "react-hook-form";

import css from "styled-jsx/css";

const { className, styles } = css.resolve`
  form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (max-width: 768px) {
    form {
    }
  }
`;

export default ({ children }) => {
  const {
    uiStore: { formStep },
  } = useStore();

  const { handleSubmit } = useForm();

  return (
    <>
      <form className={className} onSubmit={handleSubmit((data) => {})}>
        {children}
      </form>
      {styles}
    </>
  );
};
