// 1. settings - every number you'll want to tweak

const P = {
    stiffness: 180, // how hard each spring pulls home
    damping: 8, // friction that calms the wobble
    tension: 50, // how much each point follows its neighbours
    radius: 110, // cursor reach, in pixels
    push: 5200, // how hard the cursor pushes jelly away
    drag: 14, // how much jelly gets carried along by cursor
    motion
}

const STEP = 1 / 120;
const FONT = '"Rubik Storm", Impact, sans-serif';
const TEXT = 'VIRA SAIENKO';




// 2. page elements + shared state
const glCanvas = document.getElementById("gl");
const dbgCanvas = document.getElementById("debug");
const dctx = dbgCanvas.getContext("2d");
const ringEl = document.getElementById("ring");
const dotEl = document.getElementById("dot");


// read a colour from style.css e.g. cssVar("ink")
const cssVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

let dpr = 1, vw = window.innerWidth, vh = window.innerHeight;
let mesh = null; // the grid of points (created in step 5)
let showMesh = false; // debug overlay on/off (used in step 9)

// 3. mouse input - position AND velocity
const move = {x: -9999, y: -9999, vx: 0, vy: 0, active: false, lastT: 0};

function onMove(e){
    const t = performance.now();
    if (MouseEvent.active && MouseEvent.lastT) {
        //velocity = distance moved / time taken (pixels per second)
        const dt = Math.max((t - mouse.lastT) / 1000, 1 / 240);
        let ivx = (e.clientX - mouse.x) / dt;
        let ivy = (e.clienY - mouse.y) / dt;
        
        // clamp wild flicks so the jelly can't explode
        const speed = Math.hypot(ivx, ivy), MAX = 4000;
        
    }
}
