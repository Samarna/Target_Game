var form;
var gameState = 0;
var dartBoard;
var score = 0,hit = 0;
var bow;
var arrow;
var blockA, blockB;
var chances;
var collideFlag = false;

function preload() {
  backgroundImg = loadImage("images/images.jpg");
  stage = loadImage("images/dart_wall.jpg");
  dartBoardImg = loadImage("images/archeryNew.png");
  instructionImg = loadImage("images/instructions.png");
  bowImg = loadImage("images/bow.png");
  arrowImg = loadImage("images/arrow.png");
  arrowHitImg = loadImage("images/arrow_hit.png");
  winImg = loadImage("images/won.png");
  loseImg = loadImage("images/lose.png");
  billPaidImg = loadImage("images/billPaid.png");
  billNotPaidImg = loadImage("images/billNotPaid.jpg");
  backgroundMusic = loadSound("sounds/music.mp3");
  winMusic = loadSound("sounds/win.mp3");
  loseMusic = loadSound("sounds/lose.mp3");
  shotMusic = loadSound("sounds/shot.mp3");
  hitMusic = loadSound("sounds/hit.mp3");
}

function setup() {
  createCanvas(displayWidth - 20,displayHeight-115);
  form = new Form();
  blockA = createSprite(displayWidth/6,displayHeight/2 - 200,70,10);
  blockB = createSprite(displayWidth/6,displayHeight/2 + 300,70,10);
  dartBoard = createSprite(displayWidth/2 + 495,displayHeight/2 + 85,80,80);

  bow = createSprite(displayWidth/6,displayHeight/2 + 70);
  bow.addImage(bowImg);
  bow.velocityY = 10;
  bow.scale = 0.25;

  arrow = createSprite(displayWidth/6,displayHeight/2 + 100);
  arrow.addImage("normal",arrowImg);
  arrow.addImage("hit",arrowHitImg);
  arrow.setCollider("rectangle",0,0,75,10);
  arrow.scale = 0.25; 
}


function draw() {
  //backgroundMusic.play();
  if(gameState === 0){
    background(backgroundImg);
  }
  else if(gameState === 2){
    form.displayInstructions();
  }
  else if(gameState === 1){
    background(stage);
    image(dartBoardImg,displayWidth/2 + 400,displayHeight/2- 20);
    textSize(25);
    fill("black");
    text("You need to earn 400 points in 8 throws to go home without paying....All The Best!!",displayWidth/2 - 450,displayHeight/2 - 260);

    edges = createEdgeSprites();

   if(arrow.isTouching(dartBoard) || arrow.isTouching(edges[1])){
      arrow.velocityX = 0;
      arrow.changeImage("hit");
      if(arrow.collide(dartBoard)){
        score = score + 50;
      }
    }

    if(keyIsDown(32) && (arrow.x === bow.x )){
      shotMusic.play();
      bow.velocityY = 0;
      arrow.velocityX = 7; 
      hit = hit + 1;
    }

    if(keyDown("enter") && arrow.velocityX === 0) {
      arrow.x = bow.x;
      arrow.y = bow.y;
      bow.velocityY = 10;
      arrow.changeImage("normal");
    }
    if(hit > 8){
      gameState = 4;
    }
      drawSprites();
      noStroke();
      textSize(35);
      fill("black");
      text("Score : "+ score, displayWidth/2 + 400, displayHeight/4+ 30);
      text("Hits : "+ hit, displayWidth/2 + 400, displayHeight/4);
    }
    else{
      background(backgroundImg);
      arrow.visible = false;
      bow.visible = false;
      if(score === 400){
        if(!winMusic.isPlaying()){ winMusic.play(); }
        image(winImg,displayWidth/2,displayHeight/2 - 100);
        image(billPaidImg,displayWidth/2, displayHeight/2 - 20);
      }else{
        if(!loseMusic.isPlaying()){ loseMusic.play(); }
        image(loseImg,displayWidth/2,displayHeight/2 + 100);
        image(billNotPaidImg,displayWidth/2,displayHeight/2 - 20);
      }
    }

  noStroke();
  textSize(65);
  fill("black");
  text("Target Shooter !",displayWidth/2 - 200, 100);
  textSize(35);
  text("Showcase your talent in archery and save the day !",displayWidth/3 - 100, 150);
  dartBoard.visible = false;
  form.display();
  arrow.y = bow.y;
  bow.bounceOff(blockA);
  bow.bounceOff(blockB);
  arrow.collide(dartBoard);
  blockA.visible = false;
  blockB.visible = false;
}
