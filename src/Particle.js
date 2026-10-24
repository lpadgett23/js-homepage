export class Particle {
  //establish my state
  constructor(x, y, angle, speed) {
    // its position
    this.x = x;
    this.y = y;

    // its velocity
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;

    // its trail, remember where it has been
    this.trail = [{ x: this.x, y: this.y }];
    this.maxTrailLength = 8;

    // when does it appear and for how long (lifetime)
    this.size = 1 + Math.random() * 2;
    this.age = 0;
    // this.maxAge = 0.8 + Math.random() * 1.2;
    this.maxAge = 3;
    this.fadeStart = 2;
  }

  //change state
  update(dt) {
    this.age += dt

    // gradually slow it down
    const damping = Math.exp(-1.8 * dt);

    this.vx *= damping;
    this.vy *= damping;

    // move it
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // remember the new position
    this.trail.push({
      x: this.x,
      y: this.y
    });

    // keep only the most recent positions
    if (this.trail.length > this.maxTrailLength) {
      this.trail.shift();
    }
  }

  //display my state
  draw(ctx) {
    let opacity = 1;

    if (this.age > this.fadeStart) {
      opacity = 1 - 
        (this.age - this.fadeStart) / 
        (this.maxAge - this.fadeStart);
    }

    ctx.globalAlpha = Math.max(
      0,
      opacity
      //1 - this.age / this.maxAge
    );

    ctx.save();

    // 1. draw the thin motion trail
    if (this.trail.length > 1) {
      ctx.beginPath();

      ctx.moveTo(
        this.trail[0].x,
        this.trail[0].y
      );

      for (let i = 1; i < this.trail.length; i++) {
        ctx.lineTo(
          this.trail[i].x,
          this.trail[i].y
        );
      }

      ctx.strokeStyle = "#f54927";
      ctx.lineWidth = 0.6;
      ctx.globalAlpha = opacity * 0.9;
      ctx.stroke();
    }

    // 2.draw the particle dot
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    ctx.fillStyle = "#f54927";
    ctx.globalAlpha = opacity;
    ctx.fill();

    ctx.restore();
  }

  //what was lifecycle state
  get finished() {
    return this.age >= this.maxAge;
  }
}