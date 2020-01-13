// pong clone
// mouse controls paddles

let paddleA, paddleB, ball, wallTop, wallBottom;


let MAX_SPEED = 5;
let paddleSpeed=5;
let scoreLeft = 0 , scoreRight = 0;
let ballAngle = 0;

let myFont;
//function preload() {
	//myFont = loadFont('font.ttf');
//}


function setup() {

  createCanvas(800, 400);
  paddleA = createSprite(30, height / 2, 10, 100);
  paddleA.immovable = true;

  paddleB = createSprite(width - 28, height / 2, 10, 100);
  paddleB.immovable = true;

  ball = createSprite(width / 2, height / 2, 10, 10);
  ball.maxSpeed = MAX_SPEED;

  paddleA.shapeColor = paddleB.shapeColor = color(0);
  ball.shapeColor = color(204, 204, 255);

  ball.setSpeed(MAX_SPEED, -180);

  wallTop = createSprite(width / 2, -30 / 2, width, 30);
  wallTop.immovable = true;
  
  wallBottom=createSprite(width/2, height+30/2,width,30);
  wallBottom.immovable=true;

}

function draw() {

  background(255, 255, 255);
  setScoreText();
  //paddleA.position.y = constrain(mouseY, paddleA.height / 2, height - paddleA.height / 2);
  //paddleB.position.y = constrain(mouseY, paddleA.height / 2, height - paddleA.height / 2);
  setBounce();
  setPaddles();
  resetBall();
  drawSprites();
  
}
function resetBall(){
	if (ball.position.x < 0) {
    ball.position.x = width / 2;
    ball.position.y = height / 2;

    MAX_SPEED = 5;
    ball.setSpeed(MAX_SPEED, 0);

    paddleA.height = 100;
    paddleB.height = 100;

    scoreRight += 1;
    checkScore();
  }

  if (ball.position.x > width) {
    ball.position.x = width / 2;
    ball.position.y = height / 2;

    MAX_SPEED = 5;
    ball.setSpeed(MAX_SPEED, 180);

    paddleA.height = 100;
    paddleB.height = 100;

    scoreLeft += 1;
    checkScore();
  }
}

function setBounce() {
	ball.bounce(wallTop);
  ball.bounce(wallBottom);
  //ball.bounce(paddleA);
  //ball.bounce(paddleB);
  let swing;

  if (ball.bounce(paddleA)) {//if hit A
    swing = (ball.position.y - paddleA.position.y) / 3;//tilt angle of new direction
    ballAngle = ball.getDirection() + swing;
      //ballangle has to be between 0 and 90 OR -90 and 0

    if (ballAngle > 90) {//if the new angle still heads left
      //max value = 180, min value = 91
      //ballAngle -= 91;
      ballAngle = -ball.getDirection();
    }
    else if (ballAngle < -90) {
      //min value = -180, max value = -91
      //ballAngle += 91;
      ballAngle = -ball.getDirection();

    }
    ball.setSpeed(MAX_SPEED, ballAngle);//set tilted angle
    if (paddleB.height > 10) {//shrink paddle
    	paddleB.height-=1;
    }
    if (MAX_SPEED < 20) {//speed up ball
      MAX_SPEED += 1;
      ball.maxSpeed = MAX_SPEED;
    }
     

  }
  
    if (ball.bounce(paddleB)) {//hits B
    swing = (ball.position.y - paddleB.position.y) / 3;
    ballAngle = ball.getDirection()- swing;
    //ballangle has to be between 90 and 180 OR -90 and -180
    if (ballAngle < 90) {//if new angle still heads right
      //ballAngle += 91;//make it head left
      ballAngle = -ball.getDirection();
    }
    else if (ballAngle > -90) {
      //ballAngle -= 91;
      ballAngle = -ball.getDirection();
    }
    ball.setSpeed(MAX_SPEED, ballAngle);
    if (paddleA.height > 10) {
    	paddleA.height -= 1;
    }
    if (MAX_SPEED < 20) {
      MAX_SPEED += 1;
      ball.maxSpeed = MAX_SPEED;
    }
    

  }
}
function setPaddles() {
	if (keyDown('a')) {
    	if (paddleA.position.y <= height - paddleA.height/2) {
			paddleA.position.y += paddleSpeed;
    	}
  }

  if (keyDown('q')) {
  	if (paddleA.position.y >= paddleA.height/2) {
  		paddleA.position.y -= paddleSpeed;
  	}
    
  }
  
  if (keyDown('l')) {
    if (paddleB.position.y <= height - paddleA.height/2) {
			paddleB.position.y += paddleSpeed;
    	}
  }

  if (keyDown('p')) {
    if (paddleB.position.y >= paddleB.height/2) {
  		paddleB.position.y -= paddleSpeed;
  	}
  }
}
function setScoreText() {
  textSize(32);
  //textFont(myFont);
  text(scoreLeft, width / 2 - 50, 50);
  text(scoreRight, width / 2 + 50, 50);
  //text(ballAngle, width/2, 350)
}

function checkScore() {

  if (scoreLeft === 11 || scoreRight === 11) {//reset game when any player reaches 11
    
    scoreLeft = 0;
    scoreRight = 0;
    
    paddleA.position.y=height/2;//middle
    paddleB.position.y=height/2;
    
    paddleA.height = 100;//reset paddle height
    paddleB.height = 100;

    MAX_SPEED = 5;//reset paddle speed
    ball.maxSpeed = MAX_SPEED;

    ball.position.x = width / 2;//reset ball
    ball.position.y = height / 2;
    
  }
 }
