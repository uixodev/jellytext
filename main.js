import * as Lib from "https://uixodev.github.io/library/index.js";

const canvas = document.getElementById("canvas");
// const pencil = canvas.getContext("2d");

const cw = Math.min(600, window.innerWidth - 40);
const ch = cw * (2 /3); // to add the ratio

const pencil = Lib.setupCanvas(canvas, cw, ch);

// const dpr = window.devicePixelRatio || 1; // make higher resolution canvas

// canvas.width = cw * dpr;
// canvas.height = ch * dpr;

// pencil.scale(dpr, dpr);

const circle = {
    x: cw / 2,
    y: ch / 2,
    // x: canvas.width / 2,
    // y: canvas.height / 2,
    r: 20, // radius
    s: 1 // speed
}

function animate(){
    pencil.clearRect(0, 0, cw, ch);

    // circle.x = circle.x + circle.s;

    pencil.beginPath();
    pencil.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);

    pencil.fill();

    requestAnimationFrame(animate); // basically it says, loop, animate, like play, 
    // PLAY, LOOP
}

animate();