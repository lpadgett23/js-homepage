export class LineParticle {
  constructor(x, y) {
    // position
    this.x = x;
    this.y = y;

    // movement to be mostly downward
    this.vx = (Math.random() - 0.5) * 12;
    this.vy = 45 + Math.random() * 45;

    // appearance
    this.length = 16 + Math.random() * 5;
    this.opacity = 0.5 + Math.random() * 0.5;

    // where to start it? random orientation
    this.angle = Math.random() * Math.PI;
  }

  update(dt, targetAngle) {
    // 1. fall downward
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // 2. find the shortest rotation toward parallel
    const difference = targetAngle - this.angle;

    const angleDifference = Math.atan2(
      Math.sin(2 * difference),
      Math.cos(2 * difference)
    ) / 2;

    // 3. gradually align, dont instantly rotate
    const alignmentSpeed = 2.5;
    const amount = 1 - Math.exp(-alignmentSpeed * dt);

    this.angle += angleDifference * amount;
  }

  draw(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.strokeStyle = "#888800";
    ctx.lineWidth = 1;
    ctx.globalAlpha = this.opacity;

    ctx.beginPath();
    ctx.moveTo(-this.length / 2, 0);
    ctx.lineTo(this.length / 2, 0);
    ctx.stroke();

    ctx.restore();
  }
}