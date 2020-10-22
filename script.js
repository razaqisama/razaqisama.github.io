/**TODO
 * --- JAVASCRIPT ---
 * 1. Make Poo Bounching and Moving
 * 2. Create Another Poo (Enemy Poo) / Can't be eaten
 * 3. Add feature: jika poo dimakan, enemy bertambah, jika semua poo telah dimakan akan ada lubang hitam tanda selesai
 * 4. Add level: More Poo More Enemy More Faster
 * ---HTML & CSS---
 * 1. Add start game and exit game button
 * 2. Add How to play
 * 3. Add score  
 */


window.onload = function () {
    canv = document.getElementById("canvasGame")
    c = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000/150);
    
}

//Fungsi untuk gerak player dan prevent windows scrolling; 
function keyPush(event){
    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
    switch (event.keyCode) {
        case 37:
            vx = -1;
            vy = 0;
            break;
        case 38:
            vx = 0;
            vy = -1;
            break;
        case 39:
            vx = 1;
            vy = 0;
            break;
        case 40:
            vx = 0;
            vy = 1;
            break;
    }
}

function drawPlayer(px, py, pW, pH){
    c.fillStyle = "red";
    c.fillRect(px, py, pW, pH);
}
function drawPoo(poo0X, poo0Y, poo0W, poo0H){
    c.fillStyle = "green";
    c.fillRect(poo0X, poo0Y, poo0W, poo0H);
}

function playerNpooCollision(px, py, pW, pH, poo0X, poo0Y, poo0W, poo0H) {
    if((px + pW > poo0X) && (px < poo0X + poo0W) &&
    (py < poo0Y + poo0H) && (py + pH > poo0Y)) {
        return true;
    }
}


//Inisialisasi Awal
const gameWidth = 600;
const gameHeight = 400;

//player
let px = 10;
let py = 10;
let pW = 20;
let pH = 20;
let vx = 0;
let vy = 0;

//Poo
let pooObj = {
    livingPoo: [{
        x: Math.floor((Math.random() * 1000) % 550),
        y: Math.floor((Math.random() * 1000) % 350),
        height: 20,
        width: 20,
        termakan: false
    }],  
}

let allPoos = 5

for(let i = 0; i < allPoos; i++){
    pooObj.livingPoo.push({
        x: Math.floor((Math.random() * 1000) % 550),
        y: Math.floor((Math.random() * 1000) % 350),
        height: 20,
        width: 20,
        termakan: false
    })
}

let numberPoo = pooObj.livingPoo.length;


//Game variable
let gameOver = false;


//gameUpdate
function game() {
    c.fillStyle = "black";
    c.fillRect(0,0, canv.width, canv.height);

    if(!gameOver){
        px += vx;
        py += vy;
        //Player inside screen
        if(px < -10){
            px = gameWidth;
        }
        if(px > gameWidth){
            px = 0;
        }
        if(py < -15){
            py = gameHeight - 1;
        }
        if(py > gameHeight - 1){
            py = -15;
        }
        
        //Drawing
        drawPlayer(px,py, pW,pH);

        for(let i = 0; i < numberPoo; i++){
            if(!pooObj.livingPoo[i].termakan){
                drawPoo(pooObj.livingPoo[i].x, pooObj.livingPoo[i].y, pooObj.livingPoo[i].width, pooObj.livingPoo[i].height)
                
                pooObj.livingPoo[i].termakan = playerNpooCollision(px, py, pW, pH, pooObj.livingPoo[i].x, pooObj.livingPoo[i].y, pooObj.livingPoo[i].width, pooObj.livingPoo[i].height)
            }
        }
           
    } else {

    }
    
}

