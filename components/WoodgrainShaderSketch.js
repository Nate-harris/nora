import Sketch from "react-p5";
import { hexToRgb } from "../utils/colors";
// import vert from "../lib/shaders/woodgrain/texture.vert";
// import frag from "../lib/shaders/woodgrain/texture.frag";

const WoodgrainShaderSketch = ({ color, alpha = 240 }) => {
  let theShader;
  let shaderTexture;

  let theta = 0;

  let width = 1400;
  let height = 1000;

  let x;
  let y;
  let outsideRadius = 200;
  let insideRadius = 100;
  let font,
    fontsize = 160;

  let fillColor = hexToRgb(color);

  function preload(p5) {
    // load the shader
    theShader = p5.loadShader(
      "/shaders/woodgrain/texture.vert",
      "/shaders/woodgrain/texture.frag"
    );
    font = p5.loadFont("fonts/DelaGothicOne-Regular.ttf");
  }

  function setup(p5, canvasParentRef) {
    // disables scaling for retina screens which can create inconsistent scaling between displays
    //pixelDensity(1);
    // shaders require WEBGL mode to work

    p5.createCanvas(width, height, p5.WEBGL).parent(canvasParentRef);
    p5.noStroke();

    // initialize the createGraphics layers
    shaderTexture = p5.createGraphics(width, height, p5.WEBGL);

    // turn off the createGraphics layers stroke
    shaderTexture.noStroke();

    x = 0;
    y = 0;

    p5.textFont(font);
    p5.textSize(fontsize);
    p5.textAlign(p5.CENTER, p5.CENTER);
  }

  function draw(p5) {
    p5.clear();
    // instead of just setting the active shader we are passing it to the createGraphics layer
    shaderTexture.shader(theShader);

    // here we're using setUniform() to send our uniform values to the shader
    theShader.setUniform("u_resolution", [width, height]);
    theShader.setUniform("u_time", p5.millis() / 1000.0);

    p5.blendMode(p5.ADD);
    // passing the shaderTexture layer geometry to render on
    shaderTexture.rect(0, 0, width, height);

    p5.texture(shaderTexture);
    p5.rect((-1 * width) / 2, (-1 * height) / 2, width, height);

    p5.fill(fillColor.r, fillColor.g, fillColor.b, alpha);
    p5.rect((-1 * width) / 2, (-1 * height) / 2, width, height);
    p5.blendMode(p5.SCREEN);
    p5.translate(0, 0, 0);
    p5.push();
    p5.rotateZ(p5.mouseX * 0.01);
    p5.rotateX(p5.mouseX * 0.01);
    p5.rotateY(p5.mouseX * 0.01);

    //p5.sphere(125); //pass the shader as a texture

    p5.translate(0, 0, 100);
  }

  return <Sketch setup={setup} draw={draw} preload={preload} />;
};

export default WoodgrainShaderSketch;
