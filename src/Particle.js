export class Particle {
  //establish my state
  constructor(x, y, angle, speed) {
    // its position
    this.x = x;
    this.y = y;

    // its velocity
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;

    // when does it appear and for how long (lifetime)
    this.size = 1 + Math.random() * 2;
    this.age = 0;
    this.maxAge = 0.8 + Math.random() * 1.2;
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
  }

  //display my state
  draw(ctx) {
    ctx.globalAlpha = Math.max(
      0,
      1 - this.age / this.maxAge
    );

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  //what was lifecycle state
  get finished() {
    return this.age >= this.maxAge;
  }
}