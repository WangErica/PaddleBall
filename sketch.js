let paddleW = 100
let paddleH = 20
let paddleX = 250
let paddleY = 380
let ballX, ballY
let diameter = 30
let radius = diameter / 2
let xvel, yvel
let lives = 3
let img
let imgSize = 100
let collisions = 0
let level = 1
var bounceSound;

function setup() {
    bounceSound = loadSound('boing.mp3')

    createCanvas(600, 400)
    ballX = random(width)
    ballY = 0
    xvel = 3
    yvel = 4

    alert('Press the Enter key to restart the whole game. Click your mouse to continue playing once you have lost a life.')
}

function draw() {
    background(0)

    fill(255)
    rect(paddleX, paddleY, paddleW, paddleH)

    if (keyIsPressed) {
        if (keyCode == LEFT_ARROW && paddleX > 0) {
            paddleX -= 5
        }
        else if (keyCode == RIGHT_ARROW && paddleX + paddleW < width) {
            paddleX += 5
        }

        if (keyCode == ENTER){
            ballX = random(width)
            ballY = 0
            xvel = 3
            yvel = 4
            lives = 3
        }

        if (level>= 3){
            if (keyCode == LEFT_ARROW && paddleX > 0) {
                paddleX -= 7.5
            }
            else if (keyCode == RIGHT_ARROW && paddleX + paddleW < width) {
                paddleX += 7.5
            }
        }
    }

    fill("RED")
    circle(ballX, ballY, diameter)
    ballX += xvel
    ballY += yvel

    fill('#d9c3f7');
    textSize(24);
    text("Lives Remaining: " + lives, 10, 25);


    let bounceAngle = radians(45 + level * 5);
    if (collide()) {
        yvel = -yvel
        let interact = paddleX + paddleW / 2 - ballX;
        let normalIntersection = interact / (paddleW / 2);
        let bounceAngleOffset = normalIntersection * bounceAngle;
        xvel = 7 * sin(bounceAngleOffset);
        yvel = -6 * cos(bounceAngleOffset);
    }

    if (hitEdges()) {
        xvel = -xvel
    }

    if (fall()){
        lives = lives - 1
        collisions = 0
        stop()

    }

    if (noLives()){
        image(img, 35, 30)
        ballX = 32
        ballY = 34
    }

    yvel += 0.05; // increase yvel

    if(collisions >= 4){
        level = 2
    }
    if(collisions >= 8){
        level = 4
    }
    if(collisions >= 10){
        level = 6
    }
    if(collisions >= 12){
        level = 9
    }
    if(collisions >= 15){
        level = 12
    }
    if(collisions >= 18){
        level = 14
    }
    if(collisions >= 21){
        level = 18
    }


    paddleW = max(50, 100 - level * 2); //changes the paddle width with every level change
}

function fall(){
    if (ballY + radius >= height){
        return true
    }
}

function stop(){
    ballX = random(width)
    ballY = -30
}

function collide() {
    if (ballY + radius >= paddleY && ballX >= paddleX & ballX <= paddleX + paddleW) {
        if (bounceSound.isPlaying()) {
            // .isPlaying() returns a boolean
            bounceSound.stop();
          } else {
            bounceSound.play();
          }
        collisions = collisions + 1
        return true
    }
    if (ballY + radius <= 0){
        return true
    }
}


function hitEdges() {
    if (ballX - radius <= 0 || ballX + radius >= width) {
        return true
    }
}

function mouseClicked(){
    ballX = random(width)
    ballY = 0
    xvel = 3
    yvel = 5

    paddleW = 100
    paddleH = 20
    paddleX = 250
    paddleY = 380

    level = 1
}

function preload(){
    img = loadImage("gameover.png")
}

function noLives(){
    if (lives == 0){
        return true
    }
}