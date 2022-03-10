function preload(){

    //preloading mario's running animations
    runningAnimation = loadAnimation("./images/mar1.png",
    "./images/mar2.png",
    "./images/mar3.png",
    "./images/mar4.png",
    "./images/mar5.png",
    "./images/mar6.png",
    "./images/mar7.png",)

    //preloading background images
    bgImage = loadImage("./images/bgnew.jpg")

    //preloading bricks images
    brickImage = loadImage("./images/brick.png")

    //preloading coins's animation
    coinAnimation = loadAnimation("./images/con1.png",
    "./images/con2.png",
    "./images/con3.png",
    "./images/con4.png",
    "./images/con5.png",
    "./images/con6.png",)

    //preloading turtle's running animation
    turtleAnimation = loadAnimation("./images/tur1.png",
    "./images/tur2.png",
    "./images/tur3.png",
    "./images/tur4.png",
    "./images/tur5.png",)

    //preloading mushroom running animation
    mushroomAnimation = loadAnimation("./images/mush1.png",
    "./images/mush2.png",
    "./images/mush3.png",
    "./images/mush4.png",
    "./images/mush5.png",
    "./images/mush6.png",)

    //preloading power images
    powerImage = loadImage("./images/power.png")

    //preloading crow images
    crowImage = loadImage("./images/crow.png")

    restartImage = loadImage("./images/restart.png")

    deadAnimation = loadAnimation("./images/dead.png")

}

function setup() {

    //it creates the canvas area for the game
    createCanvas(1000, 600);

    //we are creating the background for the game
    bg = createSprite(500,300)
    bg.addImage(bgImage)
    bg.scale=0.5
    bg.velocityX=-8

    //adding mario in the game and adding running animation
    mario = createSprite(200.500)
    mario.addAnimation("running",runningAnimation)
    mario.addAnimation("dead",deadAnimation)
    mario.scale=0.3

    //making platform to mario stand on it and making it invisible
    platform = createSprite(200,585,300,10)
    platform.visible=false

    //making groups for coins,obstacles,bricks
    bricksGroup = new Group()
    coinsGroup = new Group()
    /*turtlesGroup = new Group()*/
    obstaclesGroup = new Group()
    powersGroup = new Group()
    crowsGroup = new Group()
    restart = createSprite(500,300)
    restart.addImage(restartImage)
    restart.visible = false

    // a flag to check if mario is in air or not; j=0 represent mario is on the grounnd and j=1 present mario is in the air
    j=0

    //instaillising score to 0
    score=0

    //instiallising mario health 100
    health =100

    gameState="PLAY"
}





function draw() {
    background('cyan')

    if(gameState=="PLAY"){


    // to reduce the mario size according to it's health 
    if(health>80 && health<=100){
        mario.scale =0.5
    }
    else if(health>60 && health<=80){
        mario.scale=0.4
    }
    else if(health>40 && health<=60){
        mario.scale=0.3
    }
    else if(health>20 && health<=40){
        mario.scale=0.2
    }
    else if(health>0 && health<=20){
        mario.scale=0.1
    }
    else{
        gameState="END"
    }

    // to make the mario move forword when right arrow key is pressed
    if(keyDown('right')){

        // to create infinte background effect
        if(bg.x<120){
            bg.x=500
        }

        // to make the background move from right to left
        bg.velocityX=-8

        // to make coins.bricks,obstacles move from right to left
        bricksGroup.setVelocityXEach(-8)
        coinsGroup.setVelocityXEach(-8)
        obstaclesGroup.setVelocityXEach(-8)
        powersGroup.setVelocityXEach(-8)
        crowsGroup.setVelocityXEach(-8)

        if(frameCount%150==0){
            generatePower()
        }

        // to generate a brick after each 50 frames
        if(frameCount%50==0){
            generateBricks()
        }

        // to generate a coinss after each 30 frames
        if(frameCount%30==0){
            generateCoins()

        }  
        
        // to generate a obstaxcles after each 40 frames
        if(frameCount%40==0){
            generateObstacles()
        }
        if(frameCount%200==0){
            generateCrows()
        }
    }

    // to make the mario move backward until backgrounds X corrdinate <800
    else if(keyDown("left") && bg.x<800){
            bg.velocityX=8
            bricksGroup.setVelocityXEach(8)
            coinsGroup.setVelocityXEach(8)
            obstaclesGroup.setVelocityXEach(8)
            powersGroup.setVelocityXEach(8)
            crowsGroup.setVelocityXEach(8)
    }

    // to make the mario stop if the background x corridinate greater than 800 and mario is going backward
    else{
        bg.velocityX=0
        bricksGroup.setVelocityXEach(0)
        coinsGroup.setVelocityXEach(0)
        obstaclesGroup.setVelocityXEach(0)
        powersGroup.setVelocityXEach(0)
        crowsGroup.setVelocityXEach(0)
    }   
    
    // to prevent the mario from leaving canvas area 
    if(mario.y<50){
        mario.y=50
    }

    // to make the maruio jump space bar is used
    if(keyDown('space') && j==0){
        mario.velocityY=-20
        j=1
    }

    // to add gravity in the game
    else{ 
        mario.velocityY=mario.velocityY+2
    }

    // to change j to 0 as soon as mario's y corrdinate is greater tha 400
    if(mario.y>400){
        j=0
    }

    // to make the mario stand on the bricks
    for(var x=0;x<bricksGroup.length;x++){
        var temp = bricksGroup.get(x)
        if(mario.isTouching(temp)){
            mario.collide(temp)
            j=0
        }
    }

    // to make the mario touch the coin and increment the score by one as well 
    for(var x=0;x<coinsGroup.length;x++){
        var temp = coinsGroup.get(x)
        if(mario.isTouching(temp)){
            temp.destroy()
            score=score+1
        }
    } 

    for(var x=0;x<powersGroup.length;x++){
        var temp = powersGroup.get(x)
        if(mario.isTouching(temp)){
            temp.destroy()
            
            if(health<100){
                health=health+20
            }
        }

        
    for(var x=0;x<crowsGroup.length;x++){
        var temp = crowsGroup.get(x)
        if(mario.isTouching(temp)){
            
            temp.destroy()

            if(health>0){
                health=health-20
            }
        }
    }

    } 


    /*for(var x=0;x<turtlesGroup.length;x++){
        var temp = turtlesGroup.get(x)
        if(mario.isTouching(temp)){
            temp.destroy()
            score=score+0
        }
    }*/


    // to reduce mario health by 20 as soon as an obstacles
    for(var x=0;x<obstaclesGroup.length;x++){
        var temp = obstaclesGroup.get(x)
        if(mario.isTouching(temp)){
            temp.destroy()
            health=health-20
        }
    } 
}

else if(gameState=="END"){
    restart.visible = true
    mario.changeAnimation("dead")
    bg.velocityX=0
    bricksGroup.setVelocityXEach(0)
    obstaclesGroup.setVelocityXEach(0)
    coinsGroup.setVelocityXEach(0)
    score=0
    powersGroup.setVelocityXEach(0)
    crowsGroup.setVelocityXEach(0)
}

   // to make the mario stand on the platform
   mario.collide(platform)


    // to prevent mario from going along with bricks
    if(mario.x!=200){
        mario.x=200
    } 
    if(mousePressedOver(restart)){
        gameState = "PLAY"
        mario.changeAnimation("running")
        restart.visible = false
        bricksGroup.destroyEach()
        obstaclesGroup.destroyEach()
        coinsGroup.destroyEach()
        powersGroup.destroyEach()
        crowsGroup.destroyEach()
        health = 100

    }
                                                       

    // to draw the sprites in the game
    drawSprites()

    // to display the score board along with the health of tha mario 
    fill("red")
    textSize(22)
    text("Your Score Is: "+ score,450,50)
    text("Health: "+ health,870,50)
}

function generateBricks(){
    brick = createSprite(1200,random(200,450))
    brick.velocityX=-8
    brick.addImage(brickImage)
    bricksGroup.add(brick)
    brick.scale=0.5
}
function generateCoins(){
    coin = createSprite(1200,random(50,450))
    coin.velocityX=-8
    coin.addAnimation("coin",coinAnimation)
    coin.scale=0.1
    coinsGroup.add(coin)
}
/*function generateTurtle(){
    turtle = createSprite(1200,random(50,450))
    turtle.velocityX=-8
    turtle.addAnimation("turtle",turtleAnimation)
    turtle.scale=0.3
    turtlesGroup.add(turtle)
}*/

function generateObstacles(){
    obstacle = createSprite(1200,520)
    obstacle.velocityX=-8
    obstacle.scale = 0.2
    var x = Math.round(random(1,2))
    switch(x){
        case 1:obstacle.addAnimation("mushroom",mushroomAnimation)
               break;
        case 2:obstacle.addAnimation("turtle",turtleAnimation)
               break;      
    }
    obstaclesGroup.add(obstacle)
}

function generatePower(){
    power = createSprite(1200,random(50,450))
    power.velocityX=-8
    power.scale=0.2
    power.addImage(powerImage)
    powersGroup.add(power)
}

function generateCrows(){
    crow= createSprite(1200,random(100,300))
    crow.velocityX=-8
    crow.addImage(crowImage)
    crowsGroup.add(crow)
    crow.scale=0.2
}

  