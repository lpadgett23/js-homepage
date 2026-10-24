import { Engine } from "./Engine.js";
import { ParticleSystem } from "./ParticleSystem.js";

console.log("MAIN.JS LOADED");

// canvas and its containing section
const canvas = document.querySelector("#particles");
const playground = document.querySelector(
    "#particle-playground"
);

//initialize the engine
const engine = new Engine(canvas);

console.log("Canvas dimensions:", {
    width: engine.width,
    height: engine.height
});

// handle browser resizing
window.addEventListener("resize", () => {
    engine.resize();
});


playground.addEventListener("pointerdown", (event) => {
    console.log("CLICK DETECTED!");

    if (!event.isPrimary) return;

    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    engine.add(new ParticleSystem(x, y));
});

//start the animation
engine.start();