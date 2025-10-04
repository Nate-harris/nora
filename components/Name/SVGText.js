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


  if (name.length === 0) {
    name = "NAME";
  }

  const LETTER_WIDTH = 162.25;
  const LETTER_HEIGHT = 288.25;
  const PADDING = 8;
  // small breakpoint from tailwind https://tailwindcss.com/docs/responsive-design
  const LETTER_SPACING = 5;
  const LETTER_SCALE = 0.445;
  const STROKE = 4;

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
                stroke="black"
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

  const height = LETTER_HEIGHT * LETTER_SCALE + PADDING * 2;
  const frame_join_offset = 7;
  const leftrightwidth = 14;

  return (
    <>
      <div>
        <img id="left" src="/frame_side.png" style={{ position: "absolute", height: height + 2 * borderWidth, width: leftrightwidth, top: 0 }}></img>
        <img id="right" src="/frame_side.png" style={{ position: "absolute", height: height + 2 * borderWidth, right: 0, width: leftrightwidth, transform: "rotate(180deg)" }}></img >
        <img id="top" src="/frame-top.jpeg" style={{ left: borderWidth - frame_join_offset - 2, position: "absolute", height: leftrightwidth, width: getBoxWidth(name) + 2 * frame_join_offset + 2 }}></img >
        <img id="bottom" src="/frame-top.jpeg" style={{ left: borderWidth - frame_join_offset - 1, position: "absolute", height: leftrightwidth, width: getBoxWidth(name) + 2 * frame_join_offset + 2, bottom: 0 }}></img >
      </div >
      <svg
        tabIndex={-1}
        width={getBoxWidth(name)}
        className="letters"
        ref={r}
        style={{
          ...scale,
          borderWidth: `${borderWidth}px`,
          height,
          paddingBottom: 0,
          background: "url(\"/oak_BG.jpeg\")",
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
            stroke="black"
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
      </svg></>
  );
});
