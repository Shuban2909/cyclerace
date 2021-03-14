//creating variables
var path,mainCyclist;
var opponent1,opponent2,opponent3;
var obstacle1,obstacle2,obstacle3;
var gameover;
var pathImg,mainRacerImg1,mainRacerImg2;
var OpponentImg1,Opponent1Img2;
var Opponent2Img1,Opponent2Img2;
var Opponent3Img1,Opponent3Img2;
var Obstacle1img;
var Obstacle2img;
var Obstacle3img;
var gameOver;
var bellsound;
var pinkcyclistgroup;
var redcyclistgroup;
var yellowcyclistgroup;
var OG1,OG2,OG3;
var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  
//loading images,animations and sound  
pathImg = loadImage("images/Road.png");
mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
mainRacerImg2= loadAnimation("images/mainPlayer3.png");
Opponent1Img1= loadAnimation("images/opponent1.png","images/opponent2.png");
Opponent1Img2= loadAnimation("images/opponent3.png");
Opponent2Img1= loadAnimation("images/opponent7.png","images/opponent8.png");
Opponent2Img2= loadAnimation("images/opponent9.png");
Opponent3Img1=loadAnimation("images/opponent4.png","images/opponent5.png");
Opponent3Img2=loadAnimation("images/opponent6.png");
gameOver=loadImage("images/gameOver.png");
Obstacle1img=loadImage("images/obstacle1.png");
Obstacle2img=loadImage("images/obstacle2.png");
Obstacle3img=loadImage("images/obstacle3.png");
bellsound=loadSound("sound/bell.mp3");
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -(6+2*distance/150);

//creating boy cycling
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation("Sahilfalling",mainRacerImg2);  
mainCyclist.scale=0.07; 
mainCyclist .setCollider("rectangle",0,0,1000,1500);
  
//gameover poster
gameover= createSprite(250,150,60,20);  
gameover.addImage("over",gameOver);
gameover.scale=0.7;
gameover.visible=false;

//creating the groups
pinkcyclistgroup= new Group(); 
redcyclistgroup= new Group(); 
yellowcyclistgroup= new Group(); 
OG1= new Group();
OG2= new Group();
OG3= new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  
  //making the distance sign
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);

  
  if(gameState===PLAY){
    
    mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
    
  //making the boy move
    mainCyclist.y = World.mouseY;
    
  //creating the edges  
    edges= createEdgeSprites();
    
  //making the boy collide with the edges  
    mainCyclist .collide(edges);
   
  //playing the bell sound  
  if(keyWentDown("space")){
    bellsound.play();
    }
   
  //spawning the opponents and obstacles  
  var select_opp=Math.round(random(1,6));
  if(frameCount%150==0){
  switch(select_opp){
        case 1: pinkcyclist();
              break;
      case 2: redcyclist();
              break;
      case 3: yellowcyclist();
              break;
      case 4: ob1();
              break;
      case 5: ob2();
              break;
      case 6: ob3();
              break;
      default: break;
    }
    }   
  
  //when the bicyclist is touching the other cyclists or obstacles the gamestate will become end  
  if(mainCyclist.isTouching(pinkcyclistgroup)){
    gameState=0;
    //  text("Press the up arrow button to restart the game",50,200);
    opponent1.changeAnimation("pink fall",Opponent1Img2);
    }
  if(mainCyclist.isTouching(redcyclistgroup)){
    gameState=0;
    //  text("Press the up arrow button to restart the game",50,200);
    opponent2.changeAnimation("red fall",Opponent2Img2);
    }
  if(mainCyclist.isTouching(yellowcyclistgroup)){
    gameState=0;
    //text("Press the up arrow button to restart the game",50,200);
    opponent3.changeAnimation("yellow fall",Opponent3Img2);
    }
  if(mainCyclist.isTouching(OG1)||mainCyclist.isTouching(OG2)||mainCyclist.isTouching(OG3)){
    gameState=0;
    //text("Press the up arrow button to restart the game",50,200);
    }
  
  //code to reset the background
  path.velocityX = -(6+2*distance/150);
  if(path.x < 0 ){
    path.x = path.width/2;
    
  }
    
  //increasing the distance  
  distance=distance+Math.round(getFrameRate()/55); 
  }
  
  if(gameState==END){
   //when the game ends the below will happen:   
    //text("Press the up arrow button to restart the game",50,270);
    gameover.visible=true;
    mainCyclist.changeAnimation("Sahilfalling",mainRacerImg2);
    path.velocityX=0;
    pinkcyclistgroup.setVelocityXEach(0);
    pinkcyclistgroup.setLifetimeEach(-1);
    //pinkcyclistgroup.destroyEach();
    redcyclistgroup.setVelocityXEach(0);
    redcyclistgroup.setLifetimeEach(-1);
    //redcyclistgroup.destroyEach();
    yellowcyclistgroup.setVelocityXEach(0);
    yellowcyclistgroup.setLifetimeEach(-1);
    //yellowcyclistgroup.destroyEach();
    OG1.setVelocityXEach(0);
    OG1.setLifetimeEach(-1);
    OG1.destroyEach();
    
    OG2.setVelocityXEach(0);
    OG2.setLifetimeEach(-1);
    OG2.destroyEach();
    
    OG3.setVelocityXEach(0);
    OG3.setLifetimeEach(-1);
    OG3.destroyEach();
     
    //when the enter key is pressed the game will restart
    if(keyDown("UP_ARROW")){
      reset();
    }
  } 
  
  }  
    



//creating the cyclists
function pinkcyclist(){
  opponent1= createSprite(500,Math.round(random(25,250)),10,10);
  opponent1.addAnimation("pinkopponent",Opponent1Img1);
  opponent1.addAnimation("pink fall",Opponent1Img2);
  opponent1.scale=0.07;
  opponent1.velocityX=-(6+2*distance/150);
  opponent1.setLifeTime=100;
  pinkcyclistgroup.add(opponent1);
}

function redcyclist(){
  opponent2= createSprite(500,Math.round(random(25,250)),10,10);
  opponent2.addAnimation("redopponent",Opponent2Img1);
  opponent2.addAnimation("red fall",Opponent2Img2);
  opponent2.scale=0.07;
  opponent2.velocityX=-(6+2*distance/150);
  opponent2.setLifeTime=100;
  redcyclistgroup.add(opponent2);
  
}

function yellowcyclist(){
  opponent3= createSprite(500,Math.round(random(25,250)),10,10);
  opponent3.addAnimation("yellowopponent",Opponent3Img1);
  opponent3.addAnimation("yellow fall",Opponent3Img2);
  opponent3.scale=0.07;
  opponent3.velocityX=-(6+2*distance/150);
  opponent3.setLifeTime=100;
  yellowcyclistgroup.add(opponent3);
  
}

//creating the obstacles
function ob1(){
  obstacle1= createSprite(500,Math.round(random(25,250)),10,10);
  obstacle1.addImage("cone",Obstacle1img);
  obstacle1.scale=0.07;
  obstacle1.setLifeTime=100;
  obstacle1.velocityX=-(6+2*distance/150);
  OG1.add(obstacle1);
}

function ob2(){
  obstacle2= createSprite(500,Math.round(random(25,250)),10,10);
  obstacle2.addImage("cap",Obstacle2img);
  obstacle2.scale=0.07;
  obstacle2.setLifeTime=100;
  obstacle2.velocityX=-(6+2*distance/150);
  OG2.add(obstacle2);
}

function ob3(){
  obstacle3= createSprite(500,Math.round(random(25,250)),10,10);
  obstacle3.addImage("unknown",Obstacle3img);
  obstacle3.scale=0.07;
  obstacle3.setLifeTime=100;
  obstacle3.velocityX=-(6+2*distance/150);
  OG3.add(obstacle3);
}

//creating the reset function
function reset(){
  gameState=PLAY;
  gameover.visible=false;
  redcyclistgroup.destroyEach();
  pinkcyclistgroup.destroyEach();
  yellowcyclistgroup.destroyEach();
  distance=0;
}