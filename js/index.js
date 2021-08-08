// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
const deleteSound = new Audio('music/delete.mp3');
let sound = 1;
let hi;
let g = 1;
let mode = 0;
let score = 0;
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

// toggle-bar 
function toggle() {
    var sec = document.getElementById('sec');
    var nav = document.getElementById('navigation');
    sec.classList.toggle('active')
    nav.classList.toggle('active')
}

function active(){
    // console.log("active")
}

//speed-control function
function s(){
    var s = document.getElementById('speed');
    speed = s.value;
    // console.log(speed)
}

//music-control function
function musicvol(){
    var volume = document.getElementById('musicVolume').value; 
    musicSound.volume = volume;  
    console.log("working-music") 
    // console.log(volume) 
}

//sound-control function
function soundvol(){
    var volume = document.getElementById('soundVolume').value;  
    moveSound.volume = volume;  
    gameOverSound.volume = volume;  
    foodSound.volume = volume;  
    // console.log("working-sound") 
    // console.log(volume) 
}

// mode function
// strict-mode
function strict(){
    mode =0;
    // console.log(mode)
}
// delay-mode
function delay(){
    mode =1;
    // console.log(mode)
}

// play-pause function
function play(){
    musicSound.play();
    sound = 1;
}
function pause(){
    musicSound.pause();
    sound = 0;
}
// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if (mode == 0){
        if(snake[0].x >= 25 || snake[0].x <=0 || snake[0].y >= 25 || snake[0].y <=0){

            return true;
        }
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir =  {x: 0, y: 0}; 
        if(score < hiscore){
            alert("Game Over. Press any key to play again!");                        
        }else if(score = hiscore){
            alert("Hurray! New HiScore.");
        }
        snakeArr = [{x: 13, y: 15}];
        setTimeout(() => {
            document.location.reload();
            }, 100);
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here
if(sound == 1){
    musicSound.play();
}
else if(sound == 0){
    musicSound.pause()
}
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
            
        default:
            break;
    }

});


// joy-stick

//flopped idea
// function joystick(){
//     let  movement = document.getElementById('joy').value;
//     //    let movement = joystick.value;
//     console.log(movement)
// }

function up(){
    moveSound.play();
    inputDir.x = 0;
    inputDir.y = -1;
    // console.log("UP")
}
function right(){
    moveSound.play();
    inputDir.x = 1;
    inputDir.y = 0;
    // console.log("RIGHT")
}
function left(){
    moveSound.play();
    inputDir.x = -1;
    inputDir.y = 0;
    // console.log("LEFT")
}
function down(){
    moveSound.play();
    inputDir.x = 0;
    inputDir.y = 1;
    // console.log("DOWN")
}

// delete history
function d(){
    deleteSound.play();
    localStorage.clear();
    setTimeout(() => {
        document.location.reload();
        }, 100);
}
  
