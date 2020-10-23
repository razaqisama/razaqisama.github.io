window.onload = function () {
    canv = document.getElementById("canvasGame")
    c = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    intervalSet();
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
    livingPoo: [],
    livingEnemy: [],
    isAllEaten: 0  
}
let allEnemies = 9;
let allPoos = 7;


for(let i = 0; i < allPoos; i++){
    pooObj.livingPoo.push({
        x: Math.floor((Math.random() * 1000) % 550),
        y: Math.floor((Math.random() * 1000) % 350),
        vx: Math.round(Math.random()) * Math.round(Math.random()) ? 1 : -1,
        vy: Math.round(Math.random()) * Math.round(Math.random()) ? 1 : -1,
        height: 20,
        width: 20,
        termakan: false
    })
}
for(let i = 0; i < allEnemies; i++){
    pooObj.livingEnemy.push({
        x: Math.floor(((Math.random() * 1000) % 550 + 50)),
        y: Math.floor(((Math.random() * 1000) % 350) + 50),
        vx: Math.round(Math.random()) * Math.round(Math.random()) ? 1 : -1,
        vy: Math.round(Math.random()) * Math.round(Math.random()) ? 1 : -1,
        height: 20,
        width: 20,
        termakan: false
    })
}


let numberPoo = pooObj.livingPoo.length;
let numberEnemies = pooObj.livingEnemy.length;

//Game variable
let gameStart = false;
let gameOver = false;
let countScore = 5000;
let score = document.getElementById("score");
let gameLose = false;
let gameWin = false;
function intervalSet(){
    return setInterval(game, 1000/150);
}


function myStopFunction() {
    clearInterval(intervalSet());
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
        case 13:
            gameStart = true;
    }
}

function drawPlayer(px, py, pW, pH){
    c.fillStyle = "white";
    c.fillRect(px, py, pW, pH);
}
function drawPoo(poo0X, poo0Y, poo0W, poo0H){
    c.fillStyle = "green";
    c.fillRect(poo0X, poo0Y, poo0W, poo0H);
}

function drawEnemy(poo0X, poo0Y, poo0W, poo0H){
    c.fillStyle = "red"
    c.fillRect(poo0X, poo0Y, poo0W, poo0H);
}

function drawGameState(){
    c.fillStyle = "#dc7633"
    c.fillRect(10, 10, 580, 380)
}

function playerNpooCollision(px, py, pW, pH, poo0X, poo0Y, poo0W, poo0H) {
    if((px + pW > poo0X) && (px < poo0X + poo0W) &&
    (py < poo0Y + poo0H) && (py + pH > poo0Y)) {
        return true;
    }
}

//gameUpdate
function game() {
    c.fillStyle = "black";
    c.fillRect(0,0, canv.width, canv.height);
    
    if(gameStart){
        //Player Logic & Draw
        drawPlayer(px,py, pW,pH);
        //Player Move 
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
        countScore--
        //Poo Logic & Draw
        pooObj.isAllEaten = 0;
        for(let i = 0; i < numberPoo; i++){
            let pooX = pooObj.livingPoo[i].x;
            let pooY = pooObj.livingPoo[i].y;
            let pooH = pooObj.livingPoo[i].height;
            let pooW = pooObj.livingPoo[i].width;
            
            //From Here To... 
            pooObj.livingPoo[i].x += pooObj.livingPoo[i].vx;
            pooObj.livingPoo[i].y += pooObj.livingPoo[i].vy;

            if(pooObj.livingPoo[i].x > gameWidth - 20
                || pooObj.livingPoo[i].x < 0){
                pooObj.livingPoo[i].vx *= -1;
            }
            if(pooObj.livingPoo[i].y > gameHeight - 15 || pooObj.livingPoo[i].y < 0){
                pooObj.livingPoo[i].vy *= -1;
            }
            //Here: Move & Bounce Poo

            //From Here To...
            if(!pooObj.livingPoo[i].termakan){
                drawPoo(pooObj.livingPoo[i].x, pooObj.livingPoo[i].y, pooObj.livingPoo[i].width, pooObj.livingPoo[i].height)

                pooObj.livingPoo[i].termakan = playerNpooCollision(px, py, pW, pH, pooX, pooY, pooW, pooH)
            } else {
                pooObj.isAllEaten++
            }
            //Here: drawing poo & check is all eaten
        }
        //Enemy Logic
        for(let i = 0; i < numberEnemies; i++){
            let pooX = pooObj.livingEnemy[i].x;
            let pooY = pooObj.livingEnemy[i].y;
            let pooH = pooObj.livingEnemy[i].height;
            let pooW = pooObj.livingEnemy[i].width;
            
            //From Here To... 
            pooObj.livingEnemy[i].x += pooObj.livingEnemy[i].vx;
            pooObj.livingEnemy[i].y += pooObj.livingEnemy[i].vy;

            if(pooObj.livingEnemy[i].x > gameWidth - 20
                || pooObj.livingEnemy[i].x < 0){
                pooObj.livingEnemy[i].vx *= -1;
            }
            if(pooObj.livingEnemy[i].y > gameHeight - 15 || pooObj.livingEnemy[i].y < 0){
                pooObj.livingEnemy[i].vy *= -1;
            }
            //Here: Move & Bounce Enemy

            //From Here To...
            if(!pooObj.livingEnemy[i].termakan){
                drawEnemy(pooObj.livingEnemy[i].x, pooObj.livingEnemy[i].y, pooObj.livingEnemy[i].width, pooObj.livingEnemy[i].height)

                pooObj.livingEnemy[i].termakan = playerNpooCollision(px, py, pW, pH, pooX, pooY, pooW, pooH)
            } else {
                gameStart = false;
                gameOver = true;
                gameLose = true;
            }
            //Here: drawing Enemy & check is eaten
        }

        //Game Victory Check
        
        if(pooObj.isAllEaten === numberPoo){
            gameStart = false;
            gameOver = true;
            gameWin = true;
        }
        if(countScore === 0){
            gameLose = true;
        }
        if(gameLose){
            score.innerHTML = `You Lose!`
        } else {
            if(gameWin){
                score.innerHTML = `You win! your score: ${countScore}`
            } else {
                score.innerHTML = `Score: ${countScore}`
            }
        }
    } else {
        if(gameOver){
            drawGameState()
            myStopFunction();
        } else {
            drawGameState()
            score.innerHTML = `Score: 0`
        }
    }
}
