import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback, useRef } from "react";
import { memo } from "react";
import { colorValues, isBrowser, useIsSafari } from "../utils/helpers";
import { useIsSmall } from "../utils/useMediaQueries";
import cx from "classnames";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

const WoodgrainShaderSketch = ({
  className,
  color = { current: "rgb(255,255,255)" },
  offset = { current: { x: 1.0, y: 1.0 } },
  rate = { current: 0.8 },
  scale = { current: 5.0 },
  height = 1000,
  width = 1000,
  alpha = { current: 0.15 },
}) => {
  const shaderTexture = useRef(null);
  const shader = useRef(null);
  const canvasRef = useRef(null);
  // Safari doesn't support alpha channle so this effect doesn't work.
  const isSafari = useIsSafari();
  const isSmall = useIsSmall();
  if (isSafari || isSmall) return null;
  function preload(p5) {
    // load the shader
    shader.current = p5.loadShader(
      "/shaders/woodgrain/texture.vert",
      "/shaders/woodgrain/texture.frag"
    );
  }

  const setup = (p5, canvasParentRef) => {
    // disables scaling for retina screens which can create inconsistent scaling between displays
    p5.pixelDensity(1);
    p5.setAttributes("alpha", true);

    // shaders require WEBGL mode to work
    canvasRef.current = p5
      .createCanvas(width, height, p5.WEBGL)
      .parent(canvasParentRef);

    p5.noStroke();

    // initialize the createGraphics layers
    shaderTexture.current = p5.createGraphics(width, height, p5.WEBGL);

    // turn off the createGraphics layers stroke
    shaderTexture.current.noStroke();
  };

  const draw = (p5) => {
    p5.clear();
    // instead of just setting the active shader we are passing it to the createGraphics layer
    shaderTexture.current.shader(shader.current);

    p5.resizeCanvas(width, height);

    // here we're using setUniform() to send our uniform values to the shader
    shader.current.setUniform("u_resolution", [width, height]);
    shader.current.setUniform("u_offset", [offset.current.x, offset.current.y]);
    shader.current.setUniform("u_rate", rate.current);
    shader.current.setUniform("u_scale", scale.current);

    shader.current.setUniform("u_color", colorValues(color.current));
    shader.current.setUniform("u_time", p5.millis() / 1000.0);
    shader.current.setUniform("u_percent", 1.0);
    shader.current.setUniform("u_alpha", alpha.current);

    p5.blendMode(p5.ADD);

    // passing the shaderTexture layer geometry to render on
    shaderTexture.current.rect(0, 0, width, height);

    p5.texture(shaderTexture.current);
    p5.rect((-1 * width) / 2, (-1 * height) / 2, width, height);

    p5.push();
  };

  return (
    <>
      {/* This suppresses the loading message from p5's preload method */}
      <p id="p5_loading" className="hidden"></p>
      <Sketch
        className={cx(className)}
        setup={setup}
        draw={draw}
        preload={preload}
      />
    </>
  );
};

export default WoodgrainShaderSketch;
