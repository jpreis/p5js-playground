const seed = s => {
  const minCount = 3;
  const maxCount = 5;
  let spinners = [];
  let completionFrame = 0;
  let shouldReset = false;

  s.setup = () => {
    s.createCanvas(300, 300);
    s.colorMode(s.HSB, 360, 100, 100, 100);
    s.reset();
  };

  s.draw = () => {
    if (shouldReset) {
      if (s.frameCount - completionFrame === 120) {
        s.reset();
        shouldReset = false;
      }
    } else {
      // reset after one complete rotation of the central spinner
      if (Math.abs(spinners[0].angle) >= s.TWO_PI) {
        shouldReset = true;
        completionFrame = s.frameCount;
      }

      s.push();
      s.translate(s.width / 2, s.height / 2);
      s.rotate(s.radians(-90));
      spinners.forEach(spinner => {
        spinner.move();
        spinner.draw();
      });
      s.pop();
    }
  };

  s.reset = () => {
    if (Math.random() > 0.5) {
      s.stroke(0, 0, 0, 10);
      s.background(0, 0, 100);
    } else {
      s.stroke(0, 0, 100, 10);
      s.background(0, 0, 0);
    }

    s.generateSpinners();
    s.loop();
  };

  s.generateSpinners = () => {
    spinners = [];
    const count = Math.floor(s.random(minCount, maxCount));
    for (let i = 0; i < count; i++) {
      let newSpinner;
      let length = s.random((0.2 * s.width) / count, (0.7 * s.width) / count);
      let rotationDirection = s.round(s.random() > 0.5 ? 1 : -1); // rotate clockwise or counter-clockwise
      let baseSpeed = s.speedForDuration(10, rotationDirection);
      if (i == 0) {
        newSpinner = new Spinner(0, 0, length, baseSpeed);
      } else {
        newSpinner = new Spinner(
          null,
          null,
          length,
          baseSpeed * s.floor(s.random(1, 3)),
          spinners[i - 1]
        );
      }
      spinners[i] = newSpinner;
    }
  };

  class Spinner {
    constructor(x, y, length, speed, parent) {
      this.x1 = x;
      this.y1 = y;

      this.length = length;
      this.speed = speed;
      this.parent = parent;

      // assigned in move()
      this.x2 = 0;
      this.y2 = 0;
      this.angle = 0;
    }

    draw() {
      s.line(this.x1, this.y1, this.x2, this.y2);
    }

    move() {
      if (!!this.parent) {
        this.x1 = this.parent.x2 + s.cos(this.angle);
        this.y1 = this.parent.y2 + s.sin(this.angle);
      }

      this.angle += this.speed;
      this.x2 = this.x1 + s.cos(this.angle) * this.length;
      this.y2 = this.y1 + s.sin(this.angle) * this.length;
    }
  }

  s.speedForDuration = (duration, rotationDirection) => {
    return (rotationDirection * s.TWO_PI) / (60 * duration); // assuming 60 fps
  };
};

const sketch = {
  name: "Spinners",
  seed
};

export default sketch;
