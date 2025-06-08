"use client";

import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../providers/RootStoreProvider";
import { useEffect, useRef, useState } from "react";
import { use } from "react";

const blah = (windowWidth) => (windowWidth > 640 ? 12 : 24);

export default observer(({ name, scale }) => {
  const r = useRef();
  const [svgSrc, setSvgSrc] = useState(null);
  const [borderWidth, setBorderWidth] = useState(blah(window.screen.width));
  useEffect(() => {
    const updateSize = () => {
      console.log("updating size", window.innerWidth);
      setBorderWidth(blah(window.innerWidth));
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    fetch("/SVG/letters/letters.json")
      .then((resp) => resp.json())
      .then((json) => {
        setSvgSrc(json.letters);
      });
  }, []);

  useEffect(() => {
    // utility to load svg file letters into json
    const letters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "-27",
    ];
    Promise.all(
      letters.map((l) => {
        return fetch(`/SVG/letters/NORA__${l}.svg`)
          .then((r) => r.text())
          .then((text) => {
            const svg = new DOMParser().parseFromString(
              text,
              "image/svg+xml"
            )?.documentElement;
            const holes = [...svg.querySelectorAll("circle")];
            const paths = [...svg.querySelectorAll("path")];
            return {
              [l]: {
                svg,
                holes: holes.map((h) => ({
                  cx: h.getAttribute("cx"),
                  cy: h.getAttribute("cy"),
                  r: h.getAttribute("r"),
                })),
                paths: paths.map((p) => ({
                  d: p.getAttribute("d"),
                })),
              },
            };
          });
      })
    ).then((results) => {
      localStorage.setItem("letters", JSON.stringify(results));
    });
  }, []);

  const LETTER_WIDTH = 162.25;
  const LETTER_HEIGHT = 288.25;
  const PADDING = 17;
  // small breakpoint from tailwind https://tailwindcss.com/docs/responsive-design
  const LETTER_SPACING = 12;
  const LETTER_SCALE = 0.445;

  const getBoxWidth = (name) => {
    if (name.length === 0) return 300;
    return (
      PADDING * 2 +
      LETTER_SCALE *
        (LETTER_WIDTH * name.length + LETTER_SPACING * (name.length - 1))
    );
  };

  const paths = svgSrc
    ? name
        .split("")
        .map((l) => l.toUpperCase())
        .map((letter, i) => {
          const letterData = svgSrc[letter];
          if (letterData) {
            return letterData.paths.map((p) => (
              <path
                d={p.d}
                stroke="currentColor"
                strokeWidth={1.4}
                fill="white"
                transform={`scale(${LETTER_SCALE}) translate(${
                  PADDING / LETTER_SCALE + i * LETTER_SPACING + i * LETTER_WIDTH
                } ${PADDING / LETTER_SCALE})`}
              />
            ));
          }
        })
        .reduce((m, e) => [...m, ...e], [])
    : null;

  return (
    <svg
      width={getBoxWidth(name)}
      className="letters"
      ref={r}
      style={{
        ...scale,
        borderWidth: `${borderWidth}px`,
        height: LETTER_HEIGHT * LETTER_SCALE + PADDING * 2,
        paddingBottom: 0,
      }}
    >
      {paths}
    </svg>
  );
});
