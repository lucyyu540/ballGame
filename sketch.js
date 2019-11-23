// pong clone
// mouse controls paddles

let paddleA, paddleB, ball, wallTop, wallBottom;


let MAX_SPEED = 5;
let paddleSpeed=5;
let scoreLeft = 0 , scoreRight = 0;

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
  //make the bounce more interesting
  	let swing;

  if (ball.bounce(paddleA)) {

    swing = (ball.position.y - paddleA.position.y) / 3;
    ball.setSpeed(MAX_SPEED, ball.getDirection() + swing);
    if (paddleB.height > 10) {
    	paddleB.height-=2;
    }
    if (MAX_SPEED < 20) {
      MAX_SPEED += 5;
      ball.maxSpeed = MAX_SPEED;
    }
     

  }
  
    if (ball.bounce(paddleB)) {

    swing = (ball.position.y - paddleB.position.y) / 3;
    ball.setSpeed(MAX_SPEED, ball.getDirection() - swing);
    if (paddleA.height > 10) {
    	paddleA.height -= 2;
    }
    if (MAX_SPEED < 20) {
      MAX_SPEED += 5;
      ball.maxSpeed = MAX_SPEED;
    }
    

  }
}
function setPaddles() {
	if (keyDown('s')) {
    	if (paddleA.position.y <= height - paddleA.height/2) {
			paddleA.position.y += paddleSpeed;
    	}
    

  }

  if (keyDown('a')) {
  	if (paddleA.position.y >= paddleA.height/2) {
  		paddleA.position.y -= paddleSpeed;
  	}
    
  }
  
    if (keyDown('p')) {
    if (paddleB.position.y <= height - paddleA.height/2) {
			paddleB.position.y += paddleSpeed;
    	}
  }

  if (keyDown('o')) {
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
}

function checkScore() {

  if (scoreLeft === 5 || scoreRight === 5) {
    
    scoreLeft = 0;
    scoreRight = 0;
    
    paddleA.position.y=height/2;
    paddleB.position.y=height/2;
    
    paddleA.height = 100;
    paddleB.height = 100;

    MAX_SPEED = 5;
    ball.maxSpeed = MAX_SPEED;

    ball.position.x = width / 2;
    ball.position.y = height / 2;
    
  }
 }
