"use client";

import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../providers/RootStoreProvider";
import { useEffect, useRef, useState } from "react";
import { use } from "react";

const borderWidthFromWindowWidth = (windowWidth) =>
  windowWidth > 640 ? 12 : 24;

export default observer(({ name, scale, onClick }) => {
  const r = useRef();
  const [svgSrc, setSvgSrc] = useState(null);
  const [borderWidth, setBorderWidth] = useState(
    borderWidthFromWindowWidth(window.screen.width)
  );
  useEffect(() => {
    const updateSize = () => {
      setBorderWidth(borderWidthFromWindowWidth(window.innerWidth));
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

  const svgData = svgSrc
    ? name
        .split("")
        .map((l) => l.toUpperCase())
        .map((letter, i) => {
          const letterData = svgSrc[letter];
          if (!letterData) {
            console.error("No letter data found for", letter);
          }
          if (letterData.holes.length !== 1) {
            console.error(
              "Expected one hole in letter",
              letter,
              letterData.holes
            );
          }
          const scale = `scale(${LETTER_SCALE})`;
          const translate = `translate(${
            PADDING / LETTER_SCALE + i * LETTER_SPACING + i * LETTER_WIDTH
          } ${PADDING / LETTER_SCALE})`;

          const holes = letterData.holes.map((h, j) => (
            <mask id={`${letter}_${i}`} key={`${letter}-${i}`}>
              <rect
                fill="white"
                x="0"
                y="0"
                width={LETTER_WIDTH}
                height={LETTER_HEIGHT}
              />
              <circle
                cx={h.cx}
                cy={h.cy}
                r={h.r}
                fill="black"
                key={`${letter}-${j}`}
              />
            </mask>
          ));
          const paths = letterData.paths.map((p) => (
            <path
              d={p.d}
              stroke="currentColor"
              strokeWidth={1.4}
              fill="white"
              mask={`url(#${letter}_${i})`}
              transform={`${scale} ${translate}`}
            />
          ));
          return {
            holes,
            paths,
          };
        })
        .reduce(
          (m, e) => ({
            holes: [...m.holes, ...e.holes],
            paths: [...m.paths, ...e.paths],
          }),
          { holes: [], paths: [] }
        )
    : null;

  return (
    <svg
      tabIndex={-1}
      width={getBoxWidth(name)}
      className="letters"
      ref={r}
      style={{
        ...scale,
        borderWidth: `${borderWidth}px`,
        height: LETTER_HEIGHT * LETTER_SCALE + PADDING * 2,
        paddingBottom: 0,
        backgroundColor: "#968884",
      }}
      onClick={onClick}
    >
      <circle cx="50" cy="50" r="50" />
      <mask id="test">
        <circle cx="50" cy="50" r="50" />
      </mask>
      {svgData && svgData.holes}
      {svgData && svgData.paths}
    </svg>
  );
});
