"use client";

import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../providers/RootStoreProvider";
import { useCallback, useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/utils/helpers";

const getLetterData = (svgSource, letter) => {
  if (letter === "&") {
    letter = "ampersand";
  }
  const letterData = svgSource[letter];
  if (!letterData) {
    console.error("No letter data found for", nameLetter);
  }
  return letterData;
};

export default observer(({ name, scale, onClick }) => {
  const { colors } = useDataStore();
  const r = useRef();
  const [svgSrc, setSvgSrc] = useState(null);
  const [svgData, setSvgData] = useState(null);
  const [letterScale, setLetterScale] = useState(0.445);
  const windowSize = useWindowSize();

  const borderWidth = 12;

  // fetches the letters json file from public/SVG/letters/letters.json
  useEffect(() => {
    fetch("/SVG/letters/letters.json")
      .then((resp) => resp.json())
      .then((json) => {
        setSvgSrc(json.letters);
      });
  }, []);

  const usingPlaceholder = name.length === 0;
  if (usingPlaceholder) {
    name = "NAME";
  }

  const LETTER_WIDTH = 162.25;
  const LETTER_HEIGHT = 288.25;
  const PADDING = 8;
  // small breakpoint from tailwind https://tailwindcss.com/docs/responsive-design
  const LETTER_SPACING = 5;
  const STROKE = 4;
  const MIN_BOX_PADDING = 50;
  const MAX_BOX_PADDING = 100;
  const MAX_SCALE = 0.6;

  const x = LETTER_WIDTH * name.length + LETTER_SPACING * (name.length - 1);
  // cbw = c + L * x
  const calculatedBoxWidth = PADDING * 2 + letterScale * x;

  const isTooWide = calculatedBoxWidth > windowSize.width - MIN_BOX_PADDING;
  const isTooSmall = calculatedBoxWidth < windowSize.width - MAX_BOX_PADDING;

  if (isTooWide || isTooSmall) {
    // algebra, solve for L above
    const avgBoxPadding = (MIN_BOX_PADDING + MAX_BOX_PADDING) / 2;
    const newScale = Math.min(
      (windowSize.width - avgBoxPadding - PADDING * 2) / x,
      MAX_SCALE
    );

    if (Math.abs(newScale - letterScale) > 0.01) {
      setLetterScale(newScale);
    }
  }

  useEffect(() => {
    if (!svgSrc) return;
    setSvgData(
      name
        .split("")
        .map((l) => l.toUpperCase())
        .map((nameLetter, i) => {
          const letterData = getLetterData(svgSrc, nameLetter);
          const scale = `scale(${letterScale})`;
          // we need to offset the letters by the padding amt, which should be
          // constant -- so we divide by letterScale
          const translate = `translate(${
            PADDING / letterScale + i * LETTER_SPACING + i * LETTER_WIDTH
          } ${PADDING / letterScale})`;

          const hole = (
            <mask
              id={`${nameLetter}_mask_${i}`}
              key={`${nameLetter}-mask-${i}`}
            >
              <rect
                fill="white"
                x={-PADDING}
                y={-PADDING}
                width={LETTER_WIDTH + PADDING * 2}
                height={LETTER_HEIGHT + PADDING * 2}
                key={`${nameLetter}-mask-op-def-${i}`}
              />
              {letterData.holes.map((h, j) => (
                <circle
                  cx={h.cx}
                  cy={h.cy}
                  r={h.r}
                  fill="black"
                  key={`${nameLetter}-hole-${i}-${j}`}
                />
              ))}
            </mask>
          );
          const paths = letterData.paths.map((p, j) => {
            return (
              <path
                d={p.d}
                stroke="black"
                strokeWidth={STROKE}
                mask={`url(#${nameLetter}_mask_${i})`}
                key={`path-${nameLetter}-${i}-${j}`}
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
                key={`${nameLetter}-${i}-stroke`}
                transform={`${scale} ${translate}`}
              />
            );
          });
          return {
            hole,
            paths,
            strokes,
          };
        })
        .reduce(
          (m, e) => ({
            holes: [...m.holes, e.hole],
            // we want the colors to sequence over all blocks, not just one
            // letter, and each path needs its own key
            paths: [...m.paths, ...e.paths].map((p, i) => ({
              ...p,
              props: {
                ...p.props,
                opacity: usingPlaceholder ? 0.2 : 1,
                key: `path-${i}`,
                fill: colors.length ? colors[i % colors.length].hex : "#fff",
              },
            })),
            strokes: [...m.strokes, ...e.strokes].map((h) => ({
              ...h,
              props: {
                ...h.props,
                opacity: usingPlaceholder ? 0.2 : 1,
              },
            })),
          }),
          { holes: [], paths: [], strokes: [] }
        )
    );
  }, [svgSrc, colors.length, name, name.length, letterScale]);

  const lineX = usingPlaceholder
    ? calculatedBoxWidth / 2
    : calculatedBoxWidth - PADDING / 2;

  const height = LETTER_HEIGHT * letterScale + PADDING * 2;
  const frame_join_offset = 7 * letterScale;
  const leftrightwidth = 14;

  return (
    <>
      <div>
        <img
          id="left"
          src="/frame_side.png"
          style={{
            position: "absolute",
            height: height + 2 * borderWidth,
            width: leftrightwidth,
            top: 0,
          }}
        ></img>
        <img
          id="right"
          src="/frame_side.png"
          style={{
            position: "absolute",
            height: height + 2 * borderWidth,
            right: 0,
            width: leftrightwidth,
            transform: "rotate(180deg)",
          }}
        ></img>
        <img
          id="top"
          src="/frame-top.jpeg"
          style={{
            left: borderWidth - frame_join_offset - 2,
            position: "absolute",
            height: leftrightwidth + frame_join_offset,
            width: calculatedBoxWidth + 2 * frame_join_offset + 2,
          }}
        ></img>
        <img
          id="bottom"
          src="/frame-top.jpeg"
          style={{
            left: borderWidth - frame_join_offset - 1,
            position: "absolute",
            height: leftrightwidth,
            width: calculatedBoxWidth + 2 * frame_join_offset + 2,
            bottom: 0,
          }}
        ></img>
      </div>
      <svg
        tabIndex={-1}
        width={calculatedBoxWidth}
        className="letters"
        ref={r}
        style={{
          borderWidth: `${borderWidth}px`,
          height,
          paddingBottom: 0,
          background: 'url("/oak_BG.jpeg")',
          borderColor: "#a06c47",
        }}
        onClick={onClick}
      >
        {svgData && svgData.holes}
        {svgData && svgData.paths}
        {svgData && svgData.strokes}
        {name.length > 0 && (
          <motion.g
            className="blinky-line"
            stroke="white"
            strokeWidth={2}
            animate={{ opacity: [0.3, 1, 0.0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <line
              x1={lineX}
              y1={PADDING}
              x2={lineX}
              y2={LETTER_HEIGHT * letterScale + PADDING}
            ></line>
          </motion.g>
        )}
      </svg>
    </>
  );
});
