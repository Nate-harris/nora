"use client";

import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../providers/RootStoreProvider";
import { useEffect, useRef, useState } from "react";
import { use } from "react";

export default observer(({ name, scale }) => {
  const r = useRef();
  const [svgSrc, setSvgSrc] = useState(null);
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

  const WIDTH = 168;
  const PADDING = 24;
  const LETTER_SCALE = 0.445;

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
                  i * WIDTH + PADDING
                } ${PADDING})`}
              />
            ));
          }
        })
        .reduce((m, e) => [...m, ...e], [])
    : null;

  return (
    <svg
      width={WIDTH * LETTER_SCALE * name.length + PADDING * 3}
      className="letters"
      ref={r}
      style={{ ...scale, paddingBottom: 0 }}
    >
      {paths}
    </svg>
  );
});
