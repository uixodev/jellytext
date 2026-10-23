import * as Lib from "https://uixodev.github.io/library/index.js";

const canvas = document.getElementById("canvas");

const cw = Math.min(600, window.innerWidth - 40);
const ch = Lib.aspectRatio(cw, 3, 4);

const columns = 5;
const cellWidth = cw / columns;
const heightColumns = ch / cellWidth;
const cellHeight = ch / heightColumns;
console.log("Canvas width:", cw);
console.log("Cell width:", cellWidth);

const pencil = Lib.setupCanvas(canvas, cw, ch);



function animate(){
    pencil.clearRect(0, 0, cw, ch);

    pencil.beginPath();

    // pencil.fillStyle = "#668A86";
    // pencil.fillRect(0, 0, cellWidth, cellWidth);

    // pencil.fillStyle = "#90b4b0";
    // pencil.fillRect(cellWidth, 0, cellWidth, cellWidth);

    // pencil.fillStyle = "rgb(60, 180, 30)";
    // pencil.fillRect(cellWidth * 2, 0, cellWidth, cellWidth);

    for (let row = 0; row < heightColumns; row++){
        for (let i = 0; i < columns; i++){
        // const redStep = (255 - 179) / (columns - 1);
        // const greenStep = (255 - 219) / (columns - 1);
        // const blueStep = (255 - 214) / (columns - 1);
        // pencil.fillStyle = `rgb(${179 + i * redStep}, ${219 + i * greenStep}, ${214 + i * blueStep})`;
        // rgb(${179 + i * 15}, ${219 + i * 7}, ${214 + i * 8})
        
        pencil.fillStyle = "#90b4b0";
            pencil.fillRect(
                cellWidth * i, 
                cellHeight * row, 
                cellWidth, 
                cellHeight
            )
        }

        pencil.strokeStyle = "#ffffff";
        pencil.lineWidth = 2;

            pencil.strokeRect(
                cellWidth * i, 
                cellHeight * row, 
                cellWidth, 
                cellHeight
            )
        
    }
    

    // for (let i = 0; i < columns; i++){
    //     pencil.fillStyle = "#e99a78";
    //     pencil.fillRect(cellWidth * i, cellWidth * 2, cellWidth, cellWidth)
    // }

    requestAnimationFrame(animate);
}

animate();