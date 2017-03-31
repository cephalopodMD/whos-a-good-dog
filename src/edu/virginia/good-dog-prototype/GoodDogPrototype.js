"use strict";

/**
 * Main class. Instantiate or extend Game to create a new game of your own
 */
class GoodDogPrototype extends Game {

  constructor(canvas){
    super("Who's A Good Dog?", 640, 480, canvas);

    var sm = GoodDogPrototype.soundManager;
    sm.loadSoundEffect('poo', 'sounds/smw_poo.wav');
    sm.loadSoundEffect('jump', 'sounds/smb_jump-small.wav');
    sm.loadSoundEffect('yip', 'sounds/yip.mp3');
    sm.loadMusic('theme', 'sounds/yakety-sax.mp3')
    sm.playMusic('theme');

    this.poos = new DisplayObjectContainer('poos');
    this.addChild(this.poos);

    this.dog = new Dog(90, 200);
    this.addChild(this.dog);
    var dogFadeIn = new Tween(this.dog);
    dogFadeIn.animate(TweenableParams.ALPHA, 0, 1, 3000);
    TweenJuggler.add(dogFadeIn);

    this.platforms = [
      new Platform('p0', 350, 30),
      new Platform('p1', 350, 300),
      new Platform('p2', 480, 250),
      new Platform('p3', 0, 470),
      new Platform('p4', 160, 470),
      new Platform('p5', 320, 470),
      new Platform('p6', 480, 470),
      new Platform('p7', 10, 0),
      new Platform('p8', 10, 160),
      new Platform('p9', 10, 320),
      new Platform('p10', 0, -40),
      new Platform('p11', 160, -40),
      new Platform('p12', 320, -40),
      new Platform('p13', 480, -40),
      new Platform('p14', 680, 0),
      new Platform('p15', 680, 160),
      new Platform('p16', 680, 320),
    ]
    this.platforms[0].setRotation(Math.PI / 2)
    this.platforms[1].setRotation(Math.PI / 2)

    this.platforms[7].setRotation(Math.PI / 2)
    this.platforms[8].setRotation(Math.PI / 2)
    this.platforms[9].setRotation(Math.PI / 2)
    this.platforms[14].setRotation(Math.PI / 2)
    this.platforms[15].setRotation(Math.PI / 2)
    this.platforms[16].setRotation(Math.PI / 2)

    for (let plat of this.platforms)
      this.addChild(plat);

    this.clock = new GameClock();
  }

  handleEvent(e) {
    if (e.eventType == PickedUpEvent.COIN_PICKED_UP) {
      GoodDogPrototype.soundManager.playSoundEffect('poo');
      var pooZoom = new Tween(e.getSource().sprite, TweenTransitions.quadinout);
      pooZoom.animate(TweenableParams.SCALEX, .2, .8, 1000);
      pooZoom.animate(TweenableParams.SCALEY, .2, .8, 1000);
      pooZoom.animate(TweenableParams.X, e.getSource().sprite.position.x, 200, 1000);
      pooZoom.animate(TweenableParams.Y, e.getSource().sprite.position.y, 150, 1000);
      pooZoom.addEventListener(this, TweenEvent.TWEEN_COMPLETE_EVENT);
      TweenJuggler.add(pooZoom);
    } else if (e.eventType == TweenEvent.TWEEN_COMPLETE_EVENT) {
      if (e.getTween().object.id == 'Poo') {
        if (e.getSource().object.alpha == 0) {
          this.removeChild(e.getSource().object);
          this.poos.remove(e.getSource().object);
        } else {
          var pooFade = new Tween(e.getSource().object);
          pooFade.animate(TweenableParams.ALPHA, 1, 0, 1000);
          pooFade.addEventListener(this, TweenEvent.TWEEN_COMPLETE_EVENT);
          TweenJuggler.add(pooFade);
        }
      }
    }
  }

  update(pressedKeys, gamepads) {
    super.update(pressedKeys, gamepads);

    this.dog.checkCollisions(this);

    // update tweens
    TweenJuggler.nextFrame();
    // reset timings
    this.clock.resetGameClock();
  }

  draw(g){
    /*if(!this.pressedKeys.contains(66)) */ g.clearRect(0, 0, this.width, this.height);
    super.draw(g);
    g.font='bold 16px Arial';
    g.fillStyle = 'white';
  }
}


/**
 * THIS IS THE BEGINNING OF THE PROGRAM
 * YOU NEED TO COPY THIS VERBATIM ANYTIME YOU CREATE A GAME
 */
function tick(){
  game.nextFrame();
}

/* Get the drawing canvas off of the  */
GoodDogPrototype.soundManager = new SoundManager();

var drawingCanvas = document.getElementById('game');
var debug = false;
if(drawingCanvas.getContext) {
  var game = new GoodDogPrototype(drawingCanvas);
  game.start();
}
