module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./components/**/*.js", "./lib/**/*.js", "./pages/**/*.js"],
  safelist: [
    {
      pattern: /grid-cols-/,
      variants: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      pattern: /col-span-/,
      variants: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      pattern: /col-start-/,
      variants: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      pattern: /justify-self-/,
      variants: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      pattern: /self-/,
      variants: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      pattern: /max-w-/,
    },
    {
      pattern: /bg-/,
    },
    {
      pattern: /text-/,
    },
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "768px",
      md: "940px",
      lg: "1200px",
      xl: "1600px",
    },
    colors: {
      inherit: "inherit",
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#FFFFFF",
      brown: "var(--brown)",
      orange: "var(--orange)",
      green: "var(--green)",
      yellow: "var(--yellow)",
      purple: "var(--purple)",
      pageBG: "var(--pageBG)",
      pageText: "var(--pageText)",
      frameDarkBorder: "var(--frame-dark-border)",
      frameDarkBG: "var(--frame-dark-bg)",
      frameLightBorder: "var(--frame-light-border)",
      frameLightBG: "var(--frame-light-bg)",
      headerText: "var(--header-text)",
      paletteBG: "var(--palette-bg)",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
      12: "12px",
      16: "16px",
      24: "24px",
    },
    fontSize: new Array(201)
      .fill()
      .map((_, i) => i)
      .reduce((acc, val) => {
        acc[val] = `${val / 10}rem`;
        return acc;
      }, {}),
    lineHeight: new Array(250)
      .fill()
      .map((_, i) => i)
      .reduce((acc, val) => {
        acc[val] = val / 100;
        return acc;
      }, {}),
    spacing: new Array(351)
      .fill()
      .map((_, i) => i)
      .reduce((acc, val) => {
        acc[val] = `${val / 10}rem`;
        return acc;
      }, {}),
    opacity: new Array(21)
      .fill()
      .map((_, i) => i * 5)
      .reduce((acc, val) => {
        acc[val] = `${val / 100}`;
        return acc;
      }, {}),
    zIndex: new Array(20)
      .fill()
      .map((_, i) => i)
      .reduce((acc, val) => {
        acc[val] = val;
        return acc;
      }, {}),
    extend: {
      fontFamily: {
        delaGothicOne: ["DelaGothicOne", "sans-serif"],
        courierSans: ["Courier Sans", "monospace"],
        inherit: "inherit",
      },
      screens: {
        "hover-hover": { raw: "(hover: hover)" },
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
      animation: {
        blink: "blink 1.5s linear infinite",
      },
      maxWidth: {
        xs: "20rem",
        sm: "30rem",
        md: "40rem",
        lg: "50rem",
        xl: "60rem",
        "2xl": "70rem",
        "3xl": "80rem",
        "4xl": "90rem",
        "5xl": "100rem",
        "6xl": "115rem",
        "7xl": "130rem",
        prose: "100ch",
      },
      width: {
        xs: "20rem",
        sm: "30rem",
        md: "40rem",
        lg: "50rem",
        xl: "60rem",
        "2xl": "70rem",
        "3xl": "80rem",
        "4xl": "90rem",
        "5xl": "100rem",
        "6xl": "115rem",
        "7xl": "130rem",
        prose: "100ch",
      },
    },
  },
  plugins: [],
};
