import * as Lib from "https://uixodev.github.io/library/index.js";

const canvas = document.getElementById("canvas"); // my canva
const ctx = canvas.getContext("2d"); // my pen, a paintbrush, and an erasor, the TOOL with which you paint with code

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

canvas.addEventListener("mousemove", function(event){
    mouseX = event.clientX;
    mouseY = event.clientY;
});

let dotX = mouseX;
let dotY = mouseY;

let ringX = mouseX;
let ringY = mouseY;

// moves a value closer to a target.
// inputs: current position, target position, amount
// output: the new position
// tweak amount: 0.05 is slower, 0.3 is faster
// other use: smoothly moving a menu

let springX = canvas.width / 2 - 150; // where the ball is RIGHT NOW
let homeX = canvas.width / 2; // where the ball wants to RETURN
let velocityX = 0;

let jellyStretch = 0;
let jellyVelocity = 0;

let jellyTilt = 0;
let tiltVelocity = 0;

let previousMouseX = 0;

let letterSprings = [
    { offset: 0, velocity: 0}, // V
    { offset: 0, velocity: 0}, // I
    { offset: 0, velocity: 0}, // R
    { offset: 0, velocity: 0}  // A
];

let jellySettings = {
    fontSize: 100
}

let touchY = canvas.height / 2;



canvas.addEventListener("mousemove", function(e){
    let mouseX = e.offsetX;

    let mouseMovement = mouseX - previousMouseX;
    previousMouseX = mouseX;
    console.log("Mouse movement:", mouseMovement);

    let distance = Math.abs(mouseX - springX); // non negative number
    console.log("Distance:", distance);

    // if (distance < 100 && mouseX < springX){
    //     velocityX = velocityX + 10;
    // } else {
    //     velocityX = velocityX - 10;
    // }

    // if(distance < 100){
    //     // let push = 1 * (1 - distance / 100);

    //     let push = Math.min(Math.abs(mouseMovement) * 0.2, 10) * (1 - distance / 100);

    //     // Click 10 pixels away → strong push.
    //     // Click 90 pixels away → gentle push.
    //     // Click more than 100 pixels away → no push.


    //     // if (mouseX < springX){
    //     //     velocityX = velocityX + push;
    //     // } else {
    //     //     velocityX = velocityX - push;
    //     // }

    //     if (mouseMovement > 0){
    //         velocityX = velocityX + push;
    //     } else if (mouseMovement < 0){
    //         velocityX = velocityX - push;
    //     }
    // }

    const spacing = 75;

    for (let i = 0; i < letterSprings.length; i++){
        let letterX = homeX + (i - 1.5) * spacing + letterSprings[i].offset;

        let distanceToLetter = Math.abs(mouseX - letterX);

        if (distanceToLetter < 45) {
            let push = Math.min(Math.abs(mouseMovement) * 0.2, 10) * (1 - distanceToLetter / 45);
            letterSprings[i].velocity = Math.sign(mouseMovement) * push;
        }
    }

    touchY = e.offsetY;
    

    
    // console.log("Push:", push);
    // velocityX = velocityX + 10;
});

// pulls a dot towards its home position
// inputs: current position, home, velocity, strength
// output: updated position and velocity
// tweak strength: bigger means a stronger pull
// other use: a bounching button



function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // erases the previous steps

    let oldRingX = ringX;
    let oldRingY = ringY;

    ringX = Lib.lerp(ringX, mouseX, 0.5);
    ringY = Lib.lerp(ringY, mouseY, 0.5);

    let moveX = ringX - oldRingX;
    let moveY = ringY - oldRingY;

    let speed = Math.hypot(moveX, moveY); 
    // console.log("Speed: ", speed);

    // console.log("X: " , moveX, "Y: ", moveY);

    dotX = Lib.lerp(dotX, mouseX, 0.5);
    dotY = Lib.lerp(dotY, mouseY, 0.5);

    ctx.beginPath(); // begin to draw
    ctx.arc(dotX, dotY, 10, 0, Math.PI * 2); // 10 is radius . 0 to Math.PI * 2 tells JavaScript to draw a full circle.
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // ctx.beginPath();
    // ctx.arc(ringX, ringY, 25, 0, Math.PI * 2);
    // ctx.strokeStyle = "#ffffff"; // choose the outline colour
    // ctx.lineWidth = 2; // makes the outline 2 pixels think
    // ctx.stroke(); // draws only the outline, instead of filling the circle

    let stretch = speed * 0.5;
    let angle = Math.atan2(moveY, moveX);


    ctx.beginPath();
    // ctx.ellipse(ringX, ringY, 25 + stretch, 25, angle, 0, Math.PI * 2);
    ctx.ellipse(
        ringX,
        ringY,
        25 + stretch, 
        Math.max(15, 25 - stretch), // For example, if stretch = 8, it compares 10 and 17, then chooses 17. 
                                    // If stretch = 30, it compares 10 and -5, then chooses 10.
        angle,
        0,
        Math.PI * 2
    )
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // if (mouseX > canvas.width - 100){
    //     velocityX = -5;
    // } // If the mouse is near the right edge, make the green dot move left.

    let spring = Lib.updateSpring(springX, homeX, velocityX, 0.05);

    // UPDATE updated
    springX = spring.position;
    velocityX = spring.velocity;

   // console.log("Ball:", springX, "Home:", homeX);

    ctx.font = `bold ${jellySettings.fontSize}px Arial`;
    ctx.fillStyle = "black";

    // center the letter around that position
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // ctx.fillText("J", springX, canvas.height / 2);

    ctx.save(); // remembers the current drawing settings
    // Your existing ctx.save() and ctx.restore() make sure the rotation doesn't affect your cursor.

    ctx.translate(homeX, canvas.height /2); // moves the drawing origin to the letter's position
    // let letterStretch = Math.abs(velocityX) * 0.02;
    // ctx.scale(1 + letterStretch, 1 / (1 + letterStretch));

    let targetTilt = velocityX * 0.005;

    let tiltSpring = Lib.updateSpring(
        jellyTilt,
        targetTilt,
        tiltVelocity,
        0.05,
        0.85
    );

    jellyTilt = tiltSpring.position;
    tiltVelocity = tiltSpring.velocity;

    // ctx.rotate(jellyTilt);
    // ctx.transform(1, 0, jellyTilt * 2, 1, 0, 0);

    let targetStretch = Math.abs(velocityX) * 0.02;

    let jelly = Lib.updateSpring(jellyStretch, targetStretch, jellyVelocity, 0.05, 0.85);

    jellyStretch = jelly.position;
    jellyVelocity = jelly.velocity;

    // ctx.scale(1 + jellyStretch, 1 / (1 + jellyStretch));

    // let scaleX = Math.max(0.5, 1 + jellyStretch);
    // let scaleY = 1 / scaleX;

    // ctx.scale(scaleX, scaleY);

    // ctx.fillText("J", 0, 0); // draws the letter at that new origin


    // divide the letter into horizontal slices

    for (let spring of letterSprings){
        let result = Lib.updateSpring(
            spring.offset,
            0,
            spring.velocity,
            0.05
        );

        spring.offset = result.position;
        spring.velocity = result.velocity;
    }

    for (let y = -100; y < 100; y += 2){
        ctx.save();

        ctx.beginPath();
        ctx.rect(-canvas.width / 2, y, canvas.width, 2);
        ctx.clip();
        
        let mouseLocalY = touchY - canvas.height / 2;
        let distanceY = Math.abs(y - mouseLocalY);

        let bend = 1 - Math.max(0, 1 - distanceY / 60);

        let sliceOffset = bend * jellyTilt * 8;

        // ctx.fillText("VIRA", sliceOffset, 0);

        const letters = ["V", "I", "R", "A"];
        const spacing = 75;

        // for (let i = 0; i < letters.length; i++){
        //     let letterX = (i - 1.5) * spacing;

        //     ctx.fillText(letters[i], letterX + sliceOffset, 0);
        // }


        for (let i = 0; i < letters.length; i++){
            let letterX = (i - 1.5) * spacing;
            
            let spring = letterSprings[i];

            // let result = Lib.updateSpring(
            //     spring.offset,
            //     0,
            //     spring.velocity,
            //     0.05
            // );

            // spring.offset = result.position;
            // spring.velocity = result.velocity;

            ctx.fillText(
                letters[i],
                letterX + spring.offset + sliceOffset,
                0
            );
        }

        ctx.restore();
    }


    ctx.restore(); // resets the drawing settings so your cursor isn't affected

    requestAnimationFrame(animate); // so you don't need to refresh the page to view the changes
}

animate();