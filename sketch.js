// pong clone
// mouse controls paddles

let paddleA, paddleB, ball, wallTop, wallBottom;


let MAX_SPEED = 5;


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

  paddleA.position.y = constrain(mouseY, paddleA.height / 2, height - paddleA.height / 2);
  paddleB.position.y = constrain(mouseY, paddleA.height / 2, height - paddleA.height / 2);
  ball.bounce(wallTop);
  ball.bounce(wallBottom);

  ball.bounce(paddleA);
  ball.bounce(paddleB);
  //let swing;

  drawSprites();
  
}