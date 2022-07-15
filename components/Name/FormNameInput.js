import { motion } from "framer-motion";
import { FRAMER_TRANSITION_FASTEASE } from "../../lib/framer/animations";
import css from "styled-jsx/css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/context";
import { useEffect, useRef } from "react";
const { className, styles } = css.resolve`
  input {
    border: 15px solid var(--white);
    background-color: transparent;
    color: var(--white);
    text-transform: uppercase;
    text-align: center;
    font-size: 5rem;
    padding: var(--spacing-s) var(--spacing-l);
    font-family: var(--font-family-heading);
    min-width: 300px;
    width: 400px;
    max-width: 90vw;
  }
  ::-webkit-input-placeholder {
    color: var(--white);
    opacity: 0.5;
    -webkit-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :-moz-placeholder {
    color: var(--white);
    opacity: 0.5;
    -moz-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  ::-moz-placeholder {
    color: var(--white);
    opacity: 0.5;
    -moz-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :-ms-input-placeholder {
    color: var(--white);
    opacity: 0.5;
    -ms-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }

  /* Place Holder CSS for Focus */
  :hover::-webkit-input-placeholder {
    opacity: 0.75;
    -webkit-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :hover:-moz-placeholder {
    opacity: 0.75;
    -moz-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :hover::-moz-placeholder {
    opacity: 0.75;
    -moz-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :hover:-ms-input-placeholder {
    opacity: 0.75;
    -ms-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }

  /* Place Holder CSS for Focus */
  :focus::-webkit-input-placeholder {
    opacity: 0;
    -webkit-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :focus:-moz-placeholder {
    opacity: 0;
    -moz-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :focus::-moz-placeholder {
    opacity: 0;
    -moz-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :focus:-ms-input-placeholder {
    opacity: 0;
    -ms-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  @media only screen and (max-width: 768px) {
    input {
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
  const inputRef = useRef();
  const spanRef = useRef();
  const {
    dataStore: { formData, setName, updateBasePrice },
  } = useStore();

  const resize = (name) => {
    spanRef.current.textContent = name;
    inputRef.current.style.width =
      Math.max(400, spanRef.current.offsetWidth) + "px";
  };

  const handleChange = (e) => {
    resize(e.target.value);
    const name = e.target.value.toUpperCase();
    setName(name);
    const nameNoSpaces = name.replace(/\s/g, "");
    updateBasePrice(nameNoSpaces.length * 6000);
  };

  useEffect(() => {
    resize(formData.name);
  }, []);

  return (
    <p>
      <span ref={spanRef} />
      <input
        ref={inputRef}
        className={className}
        onBlur={() => {
          if (formData.name.length === 0) {
            inputRef.current.style.width = "400px";
          }
        }}
        type="text"
        onChange={handleChange}
        value={formData.name}
        placeholder="NORA"
      />
      {styles}
      <style jsx>{`
        span {
          margin: 0;
          padding: 0;
          position: absolute;
          height: 0;
          overflow: hidden;
          white-space: pre;
          font-size: 5rem;
          border: 15px solid transparent;
          text-align: center;
          text-transform: uppercase;
          padding: var(--spacing-s) var(--spacing-l);
          font-family: var(--font-family-heading);
        }
      `}</style>
    </p>
  );
});
