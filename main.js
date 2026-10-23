import * as Lib from "https://uixodev.github.io/library/index.js";

const canvas = document.getElementById("canvas");
// const pencil = canvas.getContext("2d");

const cw = Math.min(600, window.innerWidth - 40);
const ch = Lib.aspectRatio(cw, 16, 10); // to add the ratio

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


const peachRec = {
    x: 50,
    y: 60,
    w: ch / 2,
    h: ch / 2
}

const blueRec = {
    x: peachRec.x + peachRec.w + 20, 
    y: 100,
    w: 200,
    h: 80
}

const goldenRec = {
    x: 120 + (ch / 2),
    y: 55 + (ch / 2),
    w: 80,
    h: 50
}

function animate(){ 
    pencil.clearRect(0, 0, cw, ch);

    // circle.x = circle.x + circle.s;

    pencil.beginPath();
    // pencil.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);

    // pencil.fill();
    pencil.fillStyle = "rgb(233, 154, 120)";
    pencil.fillRect(peachRec.x, peachRec.y, peachRec.w, peachRec.h);

    pencil.fillStyle = "#668A86";
    pencil.fillRect(blueRec.x, blueRec.y, blueRec.w, blueRec.h);

    pencil.fillStyle = "#E2BD65";
    pencil.fillRect(goldenRec.x, goldenRec.y, goldenRec.w, goldenRec.h);

    requestAnimationFrame(animate); // basically it says, loop, animate, like play, 
    // PLAY, LOOP
}

animate();