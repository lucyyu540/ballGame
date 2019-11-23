// pong clone
// mouse controls paddles

let paddleA, paddleB, ball, wallTop, wallBottom;


let MAX_SPEED = 5;
let paddleSpeed=5;


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

  //paddleA.position.y = constrain(mouseY, paddleA.height / 2, height - paddleA.height / 2);
  //paddleB.position.y = constrain(mouseY, paddleA.height / 2, height - paddleA.height / 2);
  ball.bounce(wallTop);
  ball.bounce(wallBottom);
    if (keyDown('a')) {
    paddleA.position.y = paddleA.position.y + paddleSpeed;
  }

  if (keyDown('s')) {
    paddleA.position.y = paddleA.position.y - paddleSpeed;
  }
  
    if (keyDown('o')) {
    paddleB.position.y = paddleB.position.y + paddleSpeed;
  }

  if (keyDown('p')) {
    paddleB.position.y = paddleB.position.y - paddleSpeed;
  }

	//ball.bounce(paddleA);
  //ball.bounce(paddleB);
  //make the bounce more interesting
  let swing;

  if (ball.bounce(paddleA)) {

    swing = (ball.position.y - paddleA.position.y) / 3;
    ball.setSpeed(MAX_SPEED, ball.getDirection() + swing);

  }
  
    if (ball.bounce(paddleB)) {

    swing = (ball.position.y - paddleB.position.y) / 3;
    ball.setSpeed(MAX_SPEED, ball.getDirection() - swing);

  }

  if (ball.position.x < 0) {
    ball.position.x = width / 2;
    ball.position.y = height / 2;
    ball.setSpeed(MAX_SPEED, 0);
  }

  if (ball.position.x > width) {

    ball.position.x = width / 2;
    ball.position.y = height / 2;
    ball.setSpeed(MAX_SPEED, 180);
  }




  drawSprites();
  
}