import { LineParticle } from "./LineParticle.js";

export class FallingLinesSystem {
  constructor(width, height, count = 120) {
    this.lines = [];
    this.setBounds(width, height);

    // desired final orientation -- i'm starting at approx 70 deg
    this.targetAngle = 70 * Math.PI / 180;

    for (let i = 0; i < count; i++) {
      this.lines.push(this.createLine(true));
    }
  }

  setBounds(width, height) {
    this.width = width;
    this.height = height;
  }

  createLine(anywhere = false) {
    const x = Math.random() * this.width;

    const y = anywhere
      ? Math.random() * this.height
      : -10 - Math.random() * 50;

    return new LineParticle(x, y);
  }

  update(dt) {
    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i];

      line.update(dt, this.targetAngle);

      // recycle when the line falls off the gbottom
      if (line.y > this.height + 20) {
        this.lines[i] = this.createLine();
        continue;
      }

      // wrap horizontally if necessary
      if (line.x < -10) {
        line.x = this.width + 10;
      }

      if (line.x > this.width + 10) {
        line.x = -10;
      }
    }
  }

  draw(ctx) {
    for (const line of this.lines) {
      line.draw(ctx);
    }
  }

  get finished() {
    return false;
  }
}