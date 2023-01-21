//Game constants and variables
let direction = { x: 0, y: 0 };
let board = document.getElementById("board");
const isStart = false;
const foodSound = new Audio("../music/food.mp3");
const gameoverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
let scoreElem = document.querySelector(".score")
let speed = 5;
let lastPaintTime = 0;
let inputDir = { x: 0, y: 0 };
let score = 0;
let snakeArr = [
    { x: 13, y: 15 }
]

let foodCoord = { x: 4, y: 5 };
// const generateFood = () => {
//     let m = Math.floor(Math.random() * 19);
//     let n = Math.floor(Math.random() * 19);

//     foodCoord = { x: m, y: n }

//     if (checkFoodCoord(foodCoord, snakeArr)) {
//         generateFood();
//     }
// }
// const checkFoodCoord = (food, snakeArr) => {
//         if (snakeArr.filter((a) => { return (a.x === food.x && a.y === food.y) }) > 0) {
//             return true
//         }
//     }
// game functions
const main = (ctime) => {
    window.requestAnimationFrame(main)

    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
        return
    }
    lastPaintTime = ctime;
    gameEngin();

}
const isCollide = (snake) => {
    // if snake bump in itself

    for (let i = 1; i < snake.length; i++) {

        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }

    }
    // if snake collides with wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        console.log("in")
        return true
    }




}



gameEngin = () => {
    //musicSound.play();
    //update snake array and food
    if (isCollide(snakeArr)) {
        gameoverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 }
        alert("Game Over.😭 Press any key to play again.")
        snakeArr = [{ x: 13, y: 15 }]
            //musicSound.play();
        score = 0;
    }

    //if u ate the food increment the scre and regenrate the food
    if (snakeArr[0].y === foodCoord.y && snakeArr[0].x === foodCoord.x) {
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        // snakeArr.unshift(foodCoord)
        score++;
        scoreElem.innerHTML = score;
        console.log(snakeArr)
        let a = 2;
        let b = 16;
        foodCoord = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

    }

    //move snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i] }
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //display snake and food
    //display snake
    board.innerHTML = "";

    snakeArr.forEach((ele, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = ele.y;
        snakeElement.style.gridColumnStart = ele.x;

        if (index == 0) {
            snakeElement.classList.add("head");

        } else {

            snakeElement.classList.add("snake");
        }

        board.appendChild(snakeElement)


    })

    //display food

    food = document.createElement("div");
    food.style.gridRowStart = foodCoord.y;
    food.style.gridColumnStart = foodCoord.x;
    food.classList.add("food");
    board.appendChild(food)
}



updateSnake = () => {
    while (snakeArr[0].x != 18) {
        snakeArr[0].x = snakeArr[0].x + 1
    }
    paintSnake()
}


// game main
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    // inputDir = { x: 0, y: 1 };
    moveSound.play();
    if (e.key == 'ArrowUp') {
        console.log("up")
        inputDir.x = 0;
        inputDir.y = -1;
    }
    if (e.key == 'ArrowDown') {
        console.log("down")
        inputDir.x = 0;
        inputDir.y = 1;
    }
    if (e.key == 'ArrowLeft') {
        console.log("left")
        inputDir.x = -1;
        inputDir.y = 0;
    }
    if (e.key == 'ArrowRight') {
        console.log("right")
        inputDir.x = 1;
        inputDir.y = 0;
    }
    console.log(inputDir)
})