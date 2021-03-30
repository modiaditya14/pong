const startBut = document.querySelector("#start");
const board = document.querySelector("#board");
const pad = document.querySelector("#pong");
const ball = document.querySelector("#ball");
var bLeft = false;
var bUp = true;
const info = document.querySelector("#info");
let ballBot;
pad.style.left = "150px";
pad.style.bottom = "30px";
ball.style.left = "150px";
ball.style.bottom = "40px";
startBut.addEventListener("click", start);
function start() {
    startBut.setAttribute("disabled", true);
    let moveL, moveR;
    sBall();
    document.addEventListener("keydown", (key) => {

        if (key.key === "ArrowLeft") {
            clearInterval(moveR);
            clearInterval(moveL);
            pad.style.left = parseInt(pad.style.left.slice(0, -2)) - 15 + "px";
            moveL = setInterval(keyMoveLeft, 100);
        }
        else if (key.key === "ArrowRight") {
            clearInterval(moveR);
            clearInterval(moveL);
            pad.style.left = parseInt(pad.style.left.slice(0, -2)) + 15 + "px";
            moveR = setInterval(keyMoveRight, 100);
        }
        else {
            clearInterval(moveR);
            clearInterval(moveL);
        }
    });
}
let bGoUp;
function sBall() {
    bGoUp = setInterval(goUp, 100);
}
function goUp() {
    ballBot = parseInt(ball.style.bottom.slice(0, -2));
    ballLeft = parseInt(ball.style.left.slice(0, -2));
    if (bLeft && ballLeft > 0) ball.style.left = (ballLeft - 10) + "px";
    else if (!bLeft && ballLeft < 400 - 20) { ball.style.left = (ballLeft + 10) + "px"; }
    else { bLeft = !bLeft; }
    if (ballBot < (200 - 20) && bUp) {
        ball.style.bottom = (ballBot + 10) + "px";
    }
    else if (ballBot > 0 && !bUp) {
        ball.style.bottom = (ballBot - 10) + "px";
    }
    else {
        bUp = !bUp;
    }
    if (ballBot < 5) {
        console.log("Over");
        clearInterval(bGoUp);
        info.innerHTML = "<h1>Game Over. You Lose</h1>";
    }
    checkPad(ballBot, ballLeft);
}
function checkPad(ballBot, ballLeft) {
    let padleft = parseInt(pad.style.left.slice(0, -2));

    if (ballBot == 40) {
        console.log(ballBot);
        console.log(ballLeft + `(ball) ${padleft} (pad)`);
        if (
            ballLeft > padleft && ballLeft < padleft + 80
        ) {
            bUp = true;

        }
    }
    // else if (ballLeft > padleft && ballLeft < padleft + 80 && (ballBot < 29 && ballBot > )) {
    //     console.log("Over");
    //     clearInterval(bGoUp);
    // }
}
function keyMoveLeft() {
    let leftNo = pad.style.left.slice(0, -2);
    if (parseInt(leftNo) > 0) { pad.style.left = parseInt(leftNo) - 10 + "px"; }
    else { pad.style.left = "0px"; }
}
function keyMoveRight() {
    let rightNo = pad.style.left.slice(0, -2);
    if (parseInt(rightNo) < 320) { pad.style.left = parseInt(rightNo) + 10 + "px"; }
    else { pad.style.left = "320px"; }
}