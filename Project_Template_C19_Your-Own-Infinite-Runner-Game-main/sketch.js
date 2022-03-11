var PLAY = 1;
var END = 0;
var gameState= PLAY;


var  ground, groundImage
var racer , racerImage 

var candyjar, candyjarImage 

var backgroundImage
var road, roadImage
var cloud, cloudImage
var score = 0; 

var obstacle, obstacle1, obstacle2, obstacle3
var obstacleImage1, obstacleImage2, obstacleImage3
var cashGroup
var candyjarGroup
var restart, restartImage
var gameend, gameoverImage 

var cash, cashImg 



function preload(){
 jumpSound = loadSound("jump.wav")
 collidedSound = loadSound("crash.wav")
 winSound = loadSound("victory.wav")

 racerImage = loadImage("vanellope-removebg-preview 2.png")
 groundImage = loadImage("road.png")
 backgroundImage = loadImage("bckrnd.png")
 cloudImage = loadImage("cloud.png")
 obstacleImage1 = loadImage("candybush-removebg-preview.png")
 obstacleImage2 = loadImage("candybush_2-removebg-preview.png")
 obstacleImage3 = loadImage("candybush_4-removebg-preview.png")
 cashImg = loadImage("Cash-removebg-preview (1).png")
 gameoverImage = loadImage("gameover-removebg-preview.png")
 restartImage = loadImage("restart.png")
 candyjarImage = loadImage("candyjar.png")
}


function setup(){
    createCanvas(400,400);

    
    ground = createSprite(200,394,10,90)
    ground.addImage("pathway", groundImage)
    ground.scale = 0.7
    ground.x = width/2 
    ground.velocityX = -3

    racer = createSprite(70,230,10,30)
    racer.addImage("race", racerImage)
    racer.scale = 0.1
    racer.setCollider('circle', 0,0,100)
    edges = createEdgeSprites()

    
    
    invisibleGround = createSprite(130,380,390,20);  
    invisibleGround.shapeColor = "#f4cbaa";

    gameend = createSprite(width/2,height/2- 40);
    gameend.addImage(gameoverImage);

    restart = createSprite(width/2,height/2);
    restart.addImage(restartImage);

    gameend.scale = 0.5;
    restart.scale = 0.1;

    gameend.visible = false;
    restart.visible = false;


    

   invisibleGround.visible = false;

   cloudsGroup = new Group()
   obstaclesGroup = new Group()
   cashGroup = new Group()
   candyjarGroup = new Group()
  
   
score = 0;

}

function draw(){
    background(backgroundImage);
    textSize(12);
    fill("black");
    text("Score " + score,30,50)
   
 if(gameState === PLAY){

    if(racer.isTouching(candyjarGroup)) {
        winSound.play()
        score = score + 5 

    }

    if(racer.isTouching(cashGroup)){
        score = score + 2 
    }

    if(obstaclesGroup.isTouching(racer)){
        collidedSound.play()
        gameState = END;
    }

    if(ground.x < 100){    
      ground.x = 200
    }

    if(keyDown("SPACE")){
      jumpSound.play()
      racer.velocityY = -12

    }

    if(cashGroup.isTouching(racer)) {
        cashGroup.destroyEach(); 
    }

    if(candyjarGroup.isTouching(racer)) {
        candyjarGroup.destroyEach();
    }
  
    racer.velocityY = racer.velocityY + 0.7

    createCandy()
    createCash()
    spawnClouds();
    spawnObstacles();
    }  
     else if(gameState === END){
       

       gameend.visible = true;
       restart.visible = true;
       ground.velocityX = 0
       cashGroup.setVelocityXEach(0)
       candyjarGroup.setVelocityXEach(0)
       obstaclesGroup.setVelocityXEach(0)
       cloudsGroup.setVelocityXEach(0)

       obstaclesGroup.setLifetimeEach(-1);
       cloudsGroup.setLifetimeEach(-1);

       if(mousePressedOver(gameend)){
        reset()
    }

     }
     

    racer.collide(invisibleGround);


 drawSprites();    


}




function spawnClouds() {

    if(frameCount % 90 === 0){

        cloud = createSprite(340,30)
        cloud.y = Math.round(random(100,200));
        cloud.addImage("flow", cloudImage)
        cloud.scale = 0.2
        cloud.velocityX = -2;

        cloud.lifetime = 290;

        cloud.depth = racer.depth;
        racer.depth = racer.depth+1;
    
        cloudsGroup.add(cloud);


    }

}

function spawnObstacles() {

    if(frameCount % 90 === 0) {

        var obstacle = createSprite(280,340,10,80);
        obstacle.scale = 0.1
        obstacle.velocityX = -3
        
        var rand = Math.round(random(1,2,3,4));
        switch(rand) {
          case 1: obstacle.addImage(obstacleImage1);
                  break;
          case 2: obstacle.addImage(obstacleImage2);
                  break;
          case 3: obstacle.addImage(obstacleImage3);
                  break;
          default: break;
        }


                   
        obstacle.scale = 0.2;
        obstacle.lifetime = 300;
        obstacle.depth = racer.depth;
        racer.depth = racer.depth+1;
        obstacle.setCollider("circle",0,0,150)
        obstaclesGroup.add(obstacle);


    }

}

function createCash(){

    if (World.frameCount % 200 == 0) {
        var cash = createSprite(180,290, 10, 10);
        cash.addImage(cashImg);
        cash.scale=0.03;
        cash.velocityX = -3;
        cash.lifetime = 100;
        cashGroup.add(cash);
        }

    } 

    function createCandy(){

    if (World.frameCount % 500 == 0)  {
        var candyjar = createSprite(180,290,10,10);
        candyjar.addImage(candyjarImage);
        candyjar.scale = 0.06
        candyjar.velocityX = -3
        candyjar.lifetime = 100
        candyjarGroup.add(candyjar)
       }

    }

    function reset(){
        gameState = PLAY;

        ground.velocityX = -3

        gameend.visible = false;
        restart.visible = false;
        
        obstaclesGroup.destroyEach();
        cloudsGroup.destroyEach();
        
        score = 0;
        
      }
      
