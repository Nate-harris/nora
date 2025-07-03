import dynamic from "next/dynamic";
import { useRef } from "react";
import cx from "classnames";
import { colorValues, useIsSafari } from "../utils/helpers";
import { useIsSmall } from "../utils/useMediaQueries";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  loading: () => "",
  ssr: false,
});

const getRefValue = (val, fallback) =>
  val && typeof val === "object" && "current" in val ? val.current : val ?? fallback;

const WoodgrainShaderSketch = ({
  className,
  color = "rgb(255,255,255)",
  offset = { x: 1.0, y: 1.0 },
  rate = 0.8,
  scale = 5.0,
  height = 1000,
  width = 1000,
  alpha = 0.15,
}) => {
  const hasLoaded = useRef(false);
  const shaderTexture = useRef(null);
  const shader = useRef(null);
  const canvasRef = useRef(null);
  const frameRate = useRef(30);

  const isSafari = useIsSafari();
  const isSmall = useIsSmall();
  if (isSafari || isSmall) return null;

  // Normalize values for use in uniforms
  const colorVal = getRefValue(color, "rgb(255,255,255)");
  const offsetVal = getRefValue(offset, { x: 1.0, y: 1.0 });
  const rateVal = getRefValue(rate, 0.8);
  const scaleVal = getRefValue(scale, 5.0);
  const alphaVal = getRefValue(alpha, 0.15);

  function preload(p5) {
    shader.current = p5.loadShader(
      "/shaders/woodgrain/texture.vert",
      "/shaders/woodgrain/texture.frag",
      () => {
        hasLoaded.current = true;
      }
    );
  }

  // DO NOT call .parent(canvasParentRef)
  const setup = (p5 /*, canvasParentRef */) => {
    p5.pixelDensity(1);
    p5.setAttributes("alpha", true);
    canvasRef.current = p5.createCanvas(width, height, p5.WEBGL);
    p5.noStroke();
    shaderTexture.current = p5.createGraphics(width, height, p5.WEBGL);
    shaderTexture.current.noStroke();
  };

  const draw = (p5) => {
    p5.clear();
    shaderTexture.current.shader(shader.current);
    p5.resizeCanvas(width, height);

    shader.current.setUniform("u_resolution", [width, height]);
    shader.current.setUniform("u_offset", [offsetVal.x, offsetVal.y]);
    shader.current.setUniform("u_rate", rateVal);
    shader.current.setUniform("u_scale", scaleVal);
    shader.current.setUniform("u_color", colorValues(colorVal));
    shader.current.setUniform("u_time", p5.millis() / 1000.0);
    shader.current.setUniform("u_percent", 1.0);
    shader.current.setUniform("u_alpha", alphaVal);

    p5.blendMode(p5.ADD);
    shaderTexture.current.rect(0, 0, width, height);
    p5.texture(shaderTexture.current);
    p5.rect((-1 * width) / 2, (-1 * height) / 2, width, height);
    p5.push();
    p5.frameRate(frameRate.current);
  };

  return (
    <>
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
