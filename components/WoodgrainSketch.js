import Sketch from "react-p5";

const WoodgrainSketch = () => {
  var particles = [];

  var numParticles = 100;
  var noiseScale = 3200;

  var obstacles = [];
  var numObstacles = 1;

  function setup(p5, canvasParentRef) {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.background(0, 0, 0);
    for (var i = 0; i < numParticles; i++) {
      particles[i] = new Particle(p5, p5.random(0, 500), 0);
    }
    for (var i = 0; i < numObstacles; i++) {
      obstacles[i] = new Obstacle(p5, p5.random(0, 500), p5.random(0, 500), 50);
      obstacles[i].display();
    }
  }

  function draw(p5) {
    p5.noStroke();
    p5.smooth();

    for (var i = 0; i < numParticles; i++) {
      var radius = p5.map(i, 0, numParticles, 1, 2);
      var alpha = p5.map(i, 0, numParticles, 0, 250);

      p5.fill(255, 255, 255, alpha);
      particles[i].move();
      particles[i].display(radius);
      particles[i].checkEdge();
    }
  }

  function Obstacle(p5, x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    p5.fill(255, 255, 255, 10);
    this.checkEdge = function (x, y, speed, dir) {
      var inCircle =
        p5.pow(this.x - x, 2) + p5.pow(this.y - y, 2) <= p5.pow(this.r, 2);
      if (inCircle) {
        return p5.createVector(-y, x);
      }
      return dir;
    };
    this.display = function () {
      p5.ellipse(this.x, this.y, this.r * 2, this.r * 2);
    };
  }

  function Particle(p5, x, y) {
    this.dir = p5.createVector(0, 0);
    this.vel = p5.createVector(0, 0);
    this.pos = p5.createVector(x, y);
    this.speed = 0.8;

    this.move = function () {
      var angle = 0;
      //p5.noise(this.pos.x / noiseScale, this.pos.y / noiseScale) *p5.TWO_PI *noiseScale;

      this.dir.x = p5.sin(angle);
      this.dir.y = p5.cos(angle);

      this.dir = obstacles[0].checkEdge(
        this.pos.x,
        this.pos.y,
        this.speed,
        this.dir
      );
      this.vel = this.dir.copy();
      this.vel.mult(this.speed);
      this.pos.add(this.vel);
    };

    this.checkEdge = function () {
      if (
        this.pos.x > 500 ||
        this.pos.x < 0 ||
        this.pos.y > 500 ||
        this.pos.y < 0
      ) {
        // this.pos.x = p5.random(50, 500);
        // this.pos.y = p5.random(50, 500);
      }
    };

    this.display = function (r) {
      p5.ellipse(this.pos.x, this.pos.y, r, r);
    };
  }
  return <Sketch setup={setup} draw={draw} />;
};

export default WoodgrainSketch;
