export class Boid {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vx = (Math.random() - 0.5) * 40;
    this.vy = (Math.random() - 0.5) * 40;

    this.size = 1 + Math.random() * 1.2;
    this.opacity = 0.6 + Math.random() * 0.4;
  }

  update(force, dt) {
    // what will be the steering force on it?
    this.vx += force.x * dt;
    this.vy += force.y * dt;

    // slow its movement gradually
    const damping = Math.exp(-0.3 * dt);

    this.vx *= damping;
    this.vy *= damping;

    // limit the maximum speed
    const speed = Math.hypot(this.vx, this.vy);
    const maxSpeed = 60;

    if (speed > maxSpeed) {
      this.vx = (this.vx / speed) * maxSpeed;
      this.vy = (this.vy / speed) * maxSpeed;
  }

    // make it move
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  // the boid object will be a triangle
  draw(ctx) {
    const angle = Math.atan2(this.vy, this.vx);

    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(angle);

    ctx.strokeStyle = "#70d6ed";
    ctx.lineWidth = 0.8;
    ctx.globalAlpha = this.opacity;

    // narrow, elongated triangle
    ctx.beginPath();
    ctx.moveTo(6, 0);
    ctx.lineTo(-4, -2);
    ctx.lineTo(-4, 2);
    ctx.closePath();

    ctx.stroke(); // outline only

    ctx.restore();
  }
  // draw(ctx) {
  //   ctx.globalAlpha = this.opacity;
  //   ctx.fillStyle = "#70d6ed";

  //   ctx.beginPath();
  //   ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  //   ctx.fill();
  // }
}