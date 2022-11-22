import dynamic from "next/dynamic";
import { useCallback } from "react";
import { memo } from "react";
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});
import { hexToRgb } from "../utils/colors";

const WoodgrainShaderSketch = ({
  className,
  color = "#ffffff",
  height = 1400,
  width = 1000,
  alpha = 240,
}) => {
  let shader;
  let shaderTexture;

  let fillColor = hexToRgb(color);

  function preload(p5) {
    // load the shader
    shader = p5.loadShader(
      "/shaders/woodgrain/texture.vert",
      "/shaders/woodgrain/texture.frag"
    );
  }

  const setup = useCallback((p5, canvasParentRef) => {
    // disables scaling for retina screens which can create inconsistent scaling between displays
    p5.pixelDensity(1);
    // shaders require WEBGL mode to work

    p5.createCanvas(width, height, p5.WEBGL).parent(canvasParentRef);
    p5.noStroke();

    // initialize the createGraphics layers
    shaderTexture = p5.createGraphics(width, height, p5.WEBGL);

    // turn off the createGraphics layers stroke
    shaderTexture.noStroke();
  }, []);

  const draw = useCallback((p5) => {
    p5.clear();
    // instead of just setting the active shader we are passing it to the createGraphics layer
    shaderTexture.shader(shader);

    // here we're using setUniform() to send our uniform values to the shader
    shader.setUniform("u_resolution", [width, height]);
    shader.setUniform("u_time", p5.millis() / 1000.0);
    shader.setUniform("u_percent", 1.0);
    p5.blendMode(p5.ADD);

    // passing the shaderTexture layer geometry to render on
    shaderTexture.rect(0, 0, width, height);

    p5.texture(shaderTexture);
    p5.rect((-1 * width) / 2, (-1 * height) / 2, width, height);

    p5.blendMode(p5.SCREEN);
    p5.translate(0, 0, 0);
    p5.push();
  }, []);

  return (
    <Sketch className={className} setup={setup} draw={draw} preload={preload} />
  );
};

export default memo(WoodgrainShaderSketch);
