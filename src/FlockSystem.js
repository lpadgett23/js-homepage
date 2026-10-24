import { Boid } from "./Boid.js";

export class FlockSystem {
  constructor(width, height, count = 150) {
    this.boids = [];

    this.setBounds(width, height);

    // spawn particles near the center of it
    for (let i = 0; i < count; i++) {
      const x = this.centerX +
        (Math.random() - 0.5) * this.radius;

      const y = this.centerY +
        (Math.random() - 0.5) * this.radius;

      this.boids.push(new Boid(x, y));
    }
  }

  setBounds(width, height) {
    this.centerX = width / 2;
    this.centerY = height / 2;

    this.radius = Math.max(
      40,
      Math.min(width, height) * 0.28
    );
  }

  calculateSteering(boid) {
    let alignX = 0;
    let alignY = 0;

    let cohesionX = 0;
    let cohesionY = 0;

    let separationX = 0;
    let separationY = 0;

    let total = 0;

    const perception = 70;

    for (const other of this.boids) {
      if (other === boid) continue;

      const dx = other.x - boid.x;
      const dy = other.y - boid.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 0.001 || distance > perception) {
        continue;
      }

      //alignment
      alignX += other.vx;
      alignY += other.vy;

      // cohesion
      cohesionX += other.x;
      cohesionY += other.y;

      // separation
      separationX -= dx / distance;
      separationY -= dy / distance;

      total++
    }

    let ax = 0;
    let ay = 0;

    if (total > 0) {
      // steer towards an average neighbor velocity
      ax += (alignX / total - boid.vx) * 0.75;
      ay += (alignY / total - boid.vy) * 0.75;

      // steer towards an average neighbor position
      ax += (cohesionX / total - boid.x) * 2;
      ay += (cohesionY / total - boid.y) * 2;

      // steer away from nearby neighbors
      ax += separationX * 10;
      ay += separationY * 10;
    }

    // soft circular containment
    const dxCenter = this.centerX - boid.x;
    const dyCenter = this.centerY - boid.y;

    const distanceFromCenter = Math.hypot(
      dxCenter,
      dyCenter
    );

    if (distanceFromCenter > this.radius) {
      ax += dxCenter * 4;
      ay += dyCenter * 4;
    }

    return { x: ax, y: ay };
  }

  update(dt) {
    // calculate forces for everyone force
    const forces = this.boids.map(boid => 
      this.calculateSteering(boid)
    );

    // then update everyone
    this.boids.forEach((boid, i) => {
      boid.update(forces[i], dt);
    });
  }

  draw(ctx) {
    for (const boid of this.boids) {
      boid.draw(ctx);
    }
  }

  get finished() {
    return false; // to persist the flock
  }
}