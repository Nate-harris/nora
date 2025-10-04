"use client";

import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../providers/RootStoreProvider";
import { useEffect, useRef, useState } from "react";
import { use } from "react";
import definedLetters from "./definedLetters";

const borderWidthFromWindowWidth = (windowWidth) =>
  windowWidth > 640 ? 12 : 24;

export default observer(({ name, scale, onClick }) => {
  const { colors } = useDataStore();
  const r = useRef();
  const [svgSrc, setSvgSrc] = useState(null);
  const [svgData, setSvgData] = useState(null);
  const [borderWidth, setBorderWidth] = useState(
    borderWidthFromWindowWidth(window.screen.width)
  );

  // sets the border width based on the window width
  useEffect(() => {
    const updateSize = () => {
      setBorderWidth(borderWidthFromWindowWidth(window.innerWidth));
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // fetches the letters json file from public/SVG/letters/letters.json
  useEffect(() => {
    fetch("/SVG/letters/letters.json")
      .then((resp) => resp.json())
      .then((json) => {
        setSvgSrc(json.letters);
      });
  }, []);

  // utility function not used by code
  // creates json objects from source svg files
  useEffect(() => {
    Promise.all(
      definedLetters.map((l) => {
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

  if (name.length === 0) {
    name = "NAME";
  }

  const LETTER_WIDTH = 162.25;
  const LETTER_HEIGHT = 288.25;
  const PADDING = 17;
  // small breakpoint from tailwind https://tailwindcss.com/docs/responsive-design
  const LETTER_SPACING = 20;
  const LETTER_SCALE = 0.445;
  const STROKE = 8.4;

  const getBoxWidth = (name) => {
    if (name.length === 0) return 300;
    return (
      PADDING * 2 +
      LETTER_SCALE *
      (LETTER_WIDTH * name.length + LETTER_SPACING * (name.length - 1))
    );
  };

  useEffect(() => {
    if (!svgSrc) return;
    setSvgData(
      name
        .split("")
        .map((l) => l.toUpperCase())
        .map((letter, i) => {
          if (letter === "&") {
            letter = "ampersand";
          }
          const letterData = svgSrc[letter];
          if (!letterData) {
            console.error("No letter data found for", letter);
          }
          const scale = `scale(${LETTER_SCALE})`;
          const translate = `translate(${PADDING / LETTER_SCALE + i * LETTER_SPACING + i * LETTER_WIDTH
            } ${PADDING / LETTER_SCALE})`;

          const hole = (
            <mask id={`${letter}_${i}`} key={`${letter}-${i}`}>
              <rect
                fill="white"
                x={-PADDING}
                y={-PADDING}
                width={LETTER_WIDTH + PADDING * 2}
                height={LETTER_HEIGHT + PADDING * 2}
                key={`${letter}-${i}-op-def`}
              />
              {letterData.holes.map((h, j) => (
                <circle
                  cx={h.cx}
                  cy={h.cy}
                  r={h.r}
                  fill="black"
                  key={`${letter}-${j}`}
                />
              ))}
            </mask>
          );
          const paths = letterData.paths.map((p) => {
            return (
              <path
                d={p.d}
                stroke="currentColor"
                strokeWidth={STROKE}
                mask={`url(#${letter}_${i})`}
                transform={`${scale} ${translate}`}
              />
            );
          });
          const strokes = letterData.holes.map((h, i) => {
            return (
              <circle
                r={h.r}
                cx={h.cx}
                cy={h.cy}
                fill="none"
                stroke="black"
                strokeWidth={STROKE}
                key={`${letter}-${i}-stroke`}
                transform={`${scale} ${translate}`}
              />
            )
          });
          return {
            hole,
            paths,
            strokes
          };
        })
        .reduce(
          (m, e) => ({
            holes: [...m.holes, e.hole],
            paths: [...m.paths, ...e.paths].map((p, i) => ({
              ...p,
              props: {
                ...p.props,
                fill: colors.length ? colors[i % colors.length].hex : "#fff",
              },
            })),
            strokes: [...m.strokes, e.strokes]
          }),
          { holes: [], paths: [], strokes: [] }
        )
    );
  }, [svgSrc, colors.length, name]);

  const lineX = getBoxWidth(name) - PADDING / 2;

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
      <mask id="test">
        <circle cx="50" cy="50" r="50" />
      </mask>
      {svgData && svgData.holes}
      {svgData && svgData.paths}
      {svgData && svgData.strokes}
      {name.length > 0 && (
        <motion.g
          className="blinky-line"
          stroke="currentColor"
          strokeWidth={2}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <line
            x1={lineX}
            y1={PADDING}
            x2={lineX}
            y2={LETTER_HEIGHT * LETTER_SCALE + PADDING}
          ></line>
        </motion.g>
      )}
    </svg>
  );
});
