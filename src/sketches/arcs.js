const seed = function(s) {
  let arcs = [];
  let count = 40;

  s.setup = function() {
    s.createCanvas(300, 300);
    s.colorMode(s.HSB, 360, 100, 100, 100);

    for (let i = 0; i < count; i++) {
      let radius = s.random(0.05 * s.width, 0.9 * s.width);
      let angle = s.radians(s.random(10, 180));
      let initialRotation = s.random(s.radians(s.random(360)));
      let arc = new Arc(radius, angle, initialRotation);
      arcs.push(arc);
    }
  };

  s.draw = function() {
    s.noStroke();
    s.fill(220, 90, 70, 10);
    s.rect(0, 0, s.width, s.height);
    s.stroke(0, 0, 100);
    s.noFill();

    s.push();
    s.translate(s.width / 2, s.height / 2);
    arcs.forEach(arc => {
      arc.rotate();
      arc.draw();
    });
    s.pop();
  };

  class Arc {
    constructor(radius, angle, initialRotation) {
      this.radius = radius;
      this.angle = angle;
      this.rotation = initialRotation;
      this.rotationSpeed = s.radians(s.random(-5, 5));
    }

    rotate() {
      this.rotation += this.rotationSpeed;
    }

    draw() {
      s.push();
      s.rotate(this.rotation);
      s.arc(0, 0, this.radius, this.radius, 0, this.angle);
      s.pop();
    }
  }

  s.controls = {};
};

const sketch = {
  name: "Arcs",
  seed
};

export default sketch;
