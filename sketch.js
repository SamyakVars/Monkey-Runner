var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;  
var ground;

var PLAY = 1
var END = 0
var gState = PLAY;

var bCount = 0;

var endS, gO, gOi, restart, restartI;

var col = 210;

var font;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gOi = loadImage("go1.jpg");
  
  font = loadFont("ARCADECLASSIC.TTF")
  
  restartI = loadImage("rstart.jpg")
  
}



function setup() {
  createCanvas(400, 400);


  monkey = createSprite(50, 320, 20, 20)
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.1;

  ground = createSprite(200, 359, 800, 20)
  ground.velocityX = -5
  
  endS = createSprite(200, 200, 400, 400)
  endS.visible = false
  
  gO = createSprite(190, 140, 30, 30)
  gO.addImage(gOi)
  gO.scale = 0.5
  gO.visible = false

  restart = createSprite(200, 350, 20, 20)
  restart.addImage(restartI)
  restart.scale = 0.05
  restart.visible = false
  
  bananaGroup = createGroup()
  obstacleGroup = createGroup()


}


function draw() {

  background(210);
  
  monkey.collide(ground)

  if (gState === 1) {
    
    restart.visible = false
    gO.visible = false
    col = 210

    if (keyDown("space") && monkey.y > 100) {
      monkey.velocityY = -15
    }

    monkey.velocityY = monkey.velocityY + 0.8


    if (monkey.isTouching(bananaGroup)) {
      bCount += 1
      bananaGroup.destroyEach()
    }

    if (monkey.isTouching(obstacleGroup)) {
      gState = END;
    }


    if (ground.x <= 0) {
      ground.x = ground.width / 2
    }

    score += Math.round(getFrameRate() / 62)
    
    //score = Math.round(frameCount / getFrameRate())
  
    console.log(getFrameRate())
    text("Survival time: " + score, 150, 20)
    
    

    food()
    obstacles()
    
    
    
  } else if(gState === 0){
    ground.velocityX = 0
    
    bananaGroup.destroyEach()
    obstacleGroup.destroyEach()
    
    bananaGroup.setLifetimeEach = -1
    obstacleGroup.setLifetimeEach = -1
    
    bananaGroup.setVelocityXEach = -1
    obstacleGroup.setVelocityXEach = -1
    
    
    endS.visible = true
    endS.shapeColor = "black"
    
    gO.visible = true
    
    col = 255;
    
    restart.visible = true;
    
    if(mousePressedOver(restart)){
    reset();
    }
    
  }

  
  
  drawSprites();
  textFont(font)
  textSize(20)
  fill(col)
  
  text("You  survived  for   " + score + "   secs", 80, 265)
  
  text("You  ate   " + bCount + "   bananas  !!!", 100, 280)
  
  textSize(13)
  text("Press  to  restart", 150, 300)

}

function reset(){
  gState = PLAY;
  
  col = 210;
  
  restart.visible = false
  gO.visible = false
  endS.visible = false
  
  score = 0
  bCount = 0
  
}


function food() {

  if (frameCount % 80 === 0) {
    banana = createSprite(400, 200, 20, 20)
    banana.y = random(120, 200)
    banana.velocityX = -(4 + score / 15)
    banana.addAnimation("banana", bananaImage)
    banana.scale = 0.1
    banana.lifetime = 100
    bananaGroup.add(banana)
  }

}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400, 330, 50, 50)
    obstacle.velocityX = -(5 + score / 10);
    obstacle.addAnimation("obstacle", obstacleImage);
    obstacle.scale = 0.15
    obstacle.lifetime = 100

    obstacle.depth = 1
    ground.depth = 2
    obstacleGroup.add(obstacle)
    
    obstacle.setCollider("circle", 0, 0, obstacle.width / 2)
  }

}