const seed = function(s) {
  let diamonds = [];

  s.setup = function() {
    s.createCanvas(300, 300);
    s.rectMode(s.CENTER);
    s.colorMode(s.HSB, 360, 100, 100, 100);
  };

  s.draw = function() {
    s.spawnDiamonds();
    s.background(0, 0, 200);

    s.push();
    s.translate(s.width / 2, s.height / 2);
    s.rotate(s.radians(-45.0));
    diamonds.forEach(diamond => {
      diamond.evolve();
      diamond.draw();
    });
    s.pop();

    // remove diamonds that are no longer visible
    diamonds.forEach(diamond => {
      if (
        diamond.width - diamond.strokeWeight * 2 - 20 >
        Math.sqrt(2 * s.width * s.width)
      ) {
        let idx = diamonds.indexOf(diamond);
        diamonds.splice(idx, 1);
      }
    });
  };

  s.spawnDiamonds = function() {
    if (s.frameCount % 60 === 0) {
      diamonds.push(new Diamond(s.color(230, 100, 100, 100), 30, 5));
    }
    if (s.frameCount % Math.floor(s.random(15, 60)) === 0) {
      diamonds.push(new Diamond(s.color(180, 100, 100, 100), 10, 6));
    }
    if (s.frameCount % 240 === 0) {
      diamonds.push(new Diamond(s.color(310, 100, 100, 100), 20, 2));
    }
  };

  class Diamond {
    constructor(color, strokeWeight, growthSpeed, growthAcceleration = 0) {
      this.color = color;
      this.strokeWeight = strokeWeight;
      this.growthSpeed = growthSpeed;
      this.growthAcceleration = growthAcceleration;
      this.width = 0;
    }

    evolve() {
      this.width += this.growthSpeed;
      this.growthSpeed += this.growthAcceleration;
    }

    draw() {
      s.push();
      s.noFill();
      s.stroke(this.color);
      s.strokeWeight(this.strokeWeight);
      s.rect(0, 0, this.width, this.width);
      s.pop();
    }
  }

  s.controls = {};
};

const sketch = {
  name: "Diamonds",
  seed
};

export default sketch;
