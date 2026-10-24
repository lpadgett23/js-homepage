import { Particle } from "./Particle.js";

export class ParticleSystem {
  constructor(x, y) {
    this.particles = [];

    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 50 + Math.random() * 150;

      this.particles.push(
        new Particle(x, y, angle, speed)
      );
    }
  }

  update(dt) {
    for (const particle of this.particles) {
      particle.update(dt);
    }

    this.particles = this.particles.filter(
      particle => !particle.finished
    );
  }

  draw(ctx) {
    ctx.fillStyle = "#70d6ed";

    for (const particle of this.particles) {
      particle.draw(ctx);
    }
  }

  get finished() {
    return this.particles.length === 0;
  }
}