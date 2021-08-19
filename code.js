var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["2af1740f-579e-4e8b-a3a3-b9f8e297b2d5","6ec8e415-c132-447b-9325-f3c5f84bf93c","2c6889ec-9aa5-445c-8a14-c41e34f38c5e"],"propsByKey":{"2af1740f-579e-4e8b-a3a3-b9f8e297b2d5":{"name":"fighter1","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"yzRvFAq45QOBJ7jNQXlIagfK.WkbOr54","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/2af1740f-579e-4e8b-a3a3-b9f8e297b2d5.png"},"6ec8e415-c132-447b-9325-f3c5f84bf93c":{"name":"fighter2","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"0nVFCddnhRvxYPxfCgw_o4Pn9UNvRdjd","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/6ec8e415-c132-447b-9325-f3c5f84bf93c.png"},"2c6889ec-9aa5-445c-8a14-c41e34f38c5e":{"name":"backgr","sourceUrl":"assets/api/v1/animation-library/gamelab/ECDHIcLnn516Iv.tkFDOJgHpdfXEqW_U/category_backgrounds/bg_landscape08.png","frameSize":{"x":400,"y":399},"frameCount":1,"looping":true,"frameDelay":2,"version":"ECDHIcLnn516Iv.tkFDOJgHpdfXEqW_U","categories":["backgrounds"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":399},"rootRelativePath":"assets/api/v1/animation-library/gamelab/ECDHIcLnn516Iv.tkFDOJgHpdfXEqW_U/category_backgrounds/bg_landscape08.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//var bg = createSprite(200,200);
//bg.setAnimation("backgr");
var gameState = "start" ;
var stick1 = createSprite(75,370);
  stick1.setAnimation("fighter1");

var stick2 = createSprite(325,370);
  stick2.setAnimation("fighter2");

var score1 = 0;
var score2 = 0;

var ground  = createSprite(200,375,400,10);
  //ground.visible= false;
//fixing ground problem
  stick1.scale = 3;
  stick2.scale = 3;

//stick1.debug = true;
  stick1.setCollider("circle",-25,-10,20);

//stick2.debug = true;
  stick2.setCollider("circle",25,-10,20);

//activity list 
//providing contolls to players 
//to use what keys for what players
//background
//score
//gamestate
//providing life 
// 100 score game end button
// animations and effects
// welcome screen , instructions ,play button ,
//details of player, when two players the game will start

function draw() {
  background("lightgrey");
  textSize(30);
  fill("black");
if (gameState === "start"){
  text("press S to start",105,105);
}
if (keyDown("s")){
  gameState = "play" ;
}

if (gameState === "play"){ 
  
//making the fighter jump
if (keyDown("space") && stick1.y >210){
  stick1.velocityY = -4;

}

//making the fighter move left or right
if (keyDown("q")){
  stick1.velocityX=-3;
}
if (keyWentUp("q")){
  stick1.velocityX= 0;
}

if (keyDown("e")){
  stick1.velocityX= 3;
}
if (keyWentUp("e")){
  stick1.velocityX= 0;
}

//add gravity
stick1.velocityY = stick1.velocityY + 0.8;

//making the  other fighter jump
if (keyDown("UP_ARROW") && stick2.y >210){
  stick2.velocityY = -4;

}

//making the fighter move left or right
if (keyDown("LEFT_ARROW")){
  stick2.velocityX=-4;
}
if (keyWentUp("LEFT_ARROW")){
  stick2.velocityX= 0;
}

if (keyDown("RIGHT_ARROW")){
  stick2.velocityX= 4;
}
if (keyWentUp("RIGHT_ARROW")){
  stick2.velocityX= 0;
}

// attack for p1
if (keyDown("w") && stick1.isTouching(stick2)){
  stick1.velocityX = -6;
  score1++ ;
}
if (keyWentUp("w")){
  stick1.x = 75;
}

//attack for p2
if (keyDown("DOWN_ARROW") && stick2.isTouching(stick1)){
  stick2.velocityX = 6;
  score2++ ;
}
if (keyWentUp("DOWN_ARROW")){
  stick2.x = 375;
}

//add gravity
stick2.velocityY = stick2.velocityY + 0.8;
if(score1 >= 200 || score2 >= 200){
  gameState = "end";
  }
}

if (gameState === "end"){
  if(score1 >= 200 ){
     text("congratulations Fighter 1",30,60);
     text("YOU WIN",125,125);
  }
  else
  if(score2 >= 200){
     text("congratulations Fighter 2",30,60);
  }
  text("press  R to restart", 95,205);
  stick1.velocityX = 0;
  stick1.velocityY = 0;
  stick2.velocityX = 0;
  stick2.velocityY = 0;
}
if (keyDown("r")){
  gameState = "start";
  score1 = 0;
  score2 = 0;
}
//making stick stand on the ground
stick1.collide(ground);
stick2.collide(ground);

  createEdgeSprites();
  stick1.bounceOff(edges);
  stick2.bounceOff(edges);
  drawSprites(); 
  textSize(30);
  fill("black");
  text(score1,30,30);
  textSize(30);
  fill("black");
  text(score2,350,30);
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
