"use client;";

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

export default observer(({ name }) => {
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
      debugger;
      return;
    }
    r.current.innerHTML = "";
    name.split("").forEach((letter) => {
      const letterSVG = svgSrc.querySelector(`path#${letter.toLowerCase()}_1`);
      if (letterSVG) {
        const clone = letterSVG.cloneNode(true);
        r.current.appendChild(clone);
      }
    });
  }, [name]);

  return <svg ref={r}></svg>;
});
