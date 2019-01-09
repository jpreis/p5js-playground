const seed = function(s) {
  let shapeCount = 100;
  let shapes = [];

  let hastiness = {
    name: "Hastiness",
    type: "number",
    minValue: 0,
    maxValue: 100,
    v: 50
  };

  let debug = false;

  s.setup = function() {
    s.createCanvas(300, 300);
    s.colorMode(s.HSB, 360, 100, 100, 100);
    for (let i = 0; i < shapeCount; i++) {
      let shape = new Shape(5, s.color(i * (360 / shapeCount), 100, 100, 20));
      shapes.push(shape);
    }
  };

  s.draw = function() {
    s.fill(0, 0, 0, 10);
    s.noStroke();
    s.rect(0, 0, s.width, s.height);
    s.push();
    s.blendMode(s.SCREEN);
    s.translate(s.width / 2, s.height / 2);
    s.rotate(-s.PI / 2);
    shapes.forEach(shape => {
      shape.hastiness = hastiness.v;
      shape.move();
      shape.draw();
    });
    s.pop();
  };

  class Shape {
    constructor(nodeCount = 5, fillColor = s.color(0), hastiness = 20) {
      nodeCount = s.max(nodeCount, 3); // we need at least three nodes for a shape
      this.nodes = [];
      this.fillColor = fillColor;
      this.hastiness = hastiness;

      let minRadius = 0.1 * s.width;
      let maxRadius = (0.95 * s.width) / 2;
      for (let i = 0; i < nodeCount; i++) {
        let angle = (s.TWO_PI * i) / nodeCount;
        this.nodes[i] = new Node(this, angle, minRadius, maxRadius);
      }
    }

    move() {
      this.nodes.forEach(node => {
        node.move();
      });
    }

    draw() {
      s.push();
      s.noStroke();
      s.fill(this.fillColor);
      s.beginShape();
      this.nodes.forEach(node => {
        s.curveVertex(node.x, node.y);
      });
      this.nodes.forEach(node => {
        s.curveVertex(node.x, node.y);
      });
      s.endShape(s.CLOSE);
      s.pop();

      if (debug) {
        this.nodes.forEach(node => {
          s.push();
          s.noFill();
          s.stroke(0);
          s.ellipse(node.x, node.y, 10, 10);
          s.line(node.x, node.y, 0, 0);
          s.pop();
        });
      }
    }
  }

  class Node {
    constructor(parent, angle, minDist = 100, maxDist = 200) {
      this.parent = parent;
      this.angle = angle;
      this.minDist = minDist;
      this.maxDist = maxDist;
      this.noiseOffset = s.random(10);
    }

    move() {
      let dist =
        this.minDist +
        s.noise(this.noiseOffset) * (this.maxDist - this.minDist);
      this.x = s.cos(this.angle) * dist;
      this.y = s.sin(this.angle) * dist;
      let offsetIncrease = s.map(
        this.parent.hastiness,
        hastiness.minValue,
        hastiness.maxValue,
        0.001,
        0.05
      );
      this.noiseOffset += offsetIncrease;
    }
  }

  s.controls = {
    hastiness
  };
};

const sketch = {
  name: "Softbody",
  seed
};

export default sketch;
