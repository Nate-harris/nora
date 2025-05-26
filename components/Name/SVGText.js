"use client";

import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../providers/RootStoreProvider";
import { useEffect, useRef, useState } from "react";
import { use } from "react";

const parts_per_letter = {
  a: 2,
};

const getSourceSVG = async () => {};

const pathFromLetter = async (letter) => {
  const s = await src_svg();
  debugger;
};

export default observer(({ name, scale }) => {
  const r = useRef();
  const [svgSrc, setSvgSrc] = useState(null);
  useEffect(() => {
    fetch("/SVG/letters/letters.svg")
      .then((resp) => resp.text())
      .then((text) => {
        const svgSrc = new DOMParser().parseFromString(
          text,
          "image/svg+xml"
        )?.documentElement;
        setSvgSrc(svgSrc);
      });
  }, []);
  useEffect(() => {
    if (!svgSrc) {
      return;
    }
    r.current.innerHTML = "";
    name
      .split("")
      .map((l) => l.toLowerCase())
      .forEach((letter) => {
        const n = parts_per_letter[letter];
        console.log(letter, n);
        for (let i = 0; i < n; i++) {
          const blah = `#${letter}_${i + 1}`;
          console.log(blah);
          const letterSVG = svgSrc.querySelector(blah);
          if (letterSVG) {
            const clone = letterSVG.cloneNode(true);
            clone.fill = "red";
            r.current.appendChild(clone);
          }
        }
      });
  }, [name]);

  return <svg className="letters" ref={r} style={scale}></svg>;
});
