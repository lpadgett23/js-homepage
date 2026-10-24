export class Engine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.systems = [];
    this.previousTime = null;
    this.running = false;

    this.resize();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1,2);

    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);

    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  add(system) {
    this.systems.push(system);
  }

  update(dt) {
    for (const system of this.systems) {
      system.update(dt);
    }

    this.systems = this.systems.filter(
      system => !system.finished
    );
  }

  draw() {
    this.ctx.clearRect(
      0,0, this.width, this.height
    );

    for (const system of this.systems) {
      this.ctx.save();
      system.draw(this.ctx);
      this.ctx.restore();
    }
  }

  frame = (timestamp) => {
    if (!this.running) return;

    const dt = this.previousTime === null
      ? 0
      : Math.min((timestamp - this.previousTime) / 1000, 0.05);

    this.previousTime = timestamp;

    this.update(dt);
    this.draw();

    requestAnimationFrame(this.frame);
  };

  start() {
    if (this.running) return;

    this.running = true;
    requestAnimationFrame(this.frame);
  }
}