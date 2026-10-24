import { Engine } from "./Engine.js";
import { ParticleSystem } from "./ParticleSystem.js";
import { FlockSystem } from "./FlockSystem.js";
import { FallingLinesSystem } from "./FallingLinesSystem.js";

// console.log("MAIN.JS LOADED");

// canvas and its containing section --> find the html elements
const canvas = document.querySelector("#particles");
const playground = document.querySelector(
    "#particle-playground"
);


//initialize one engine
const engine = new Engine(canvas);


// create one persistent flock of boids at page load
const flock = new FlockSystem(
    engine.width,
    engine.height,
    150
);

// create a falling lines sys
const fallingLines = new FallingLinesSystem(
    engine.width,
    engine.height,
    120
);

// register both systems with the engine
engine.add(flock);
engine.add(fallingLines);

console.log(engine.systems);

console.log("Canvas dimensions:", {
    canvasWidth: engine.width,
    canvasHeight: engine.height, 
    fallingLinesCount: fallingLines.lines.length
});

// resize both systems when the canvas changes
window.addEventListener("resize", () => {
    engine.resize();

    flock.setBounds(engine.width, engine.height);
    fallingLines.setBounds(engine.width, engine.height);
});


// create a temporary particle burst on clicks
playground.addEventListener("pointerdown", (event) => {
    // console.log("CLICK DETECTED!");

    if (!event.isPrimary) return;

    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    engine.add(new ParticleSystem(x, y));
});


//start the animation loop
engine.start();