"use strict";

/**
 * Main class. Instantiate or extend Game to create a new game of your own
 */
class GoodDogPrototype extends Game {

  constructor(canvas){
    super("Who's A Good Dog?", 640, 480, canvas);

    var sm = GoodDogPrototype.soundManager;
    sm.loadSoundEffect('coin', 'sounds/smw_coin.wav');
    sm.loadSoundEffect('jump', 'sounds/smb_jump-small.wav');
    sm.loadSoundEffect('yip', 'sounds/yip.mp3');
    sm.loadMusic('theme', 'sounds/yakety-sax.mp3')
    // sm.playMusic('theme');

    this.mario = new Dog(90, 200);
    this.addChild(this.mario);
    var marioFadeIn = new Tween(this.mario);
    marioFadeIn.animate(TweenableParams.ALPHA, 0, 1, 3000);
    TweenJuggler.add(marioFadeIn);

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

    this.coins = new ArrayList([
      new Coin(this, 100, 20),
      new Coin(this, 550, 400),
      new Coin(this, 20, 330),
    ]);
    this.questManager = new QuestManager();
    for (let coin of this.coins.contents) {
      coin.addEventListener(this, PickedUpEvent.COIN_PICKED_UP);
      coin.addEventListener(this.questManager, PickedUpEvent.COIN_PICKED_UP);
    }

    this.clock = new GameClock();

    // AI Testing
    // var grid = [
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    //   [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    //   [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    //   [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    //   [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // ];

    this.cellSize = 40;
    var grid = []
    var numCols = this.width / this.cellSize;
    var numRows = this.height / this.cellSize;
    for (var r = 0; r < numRows; r++) {
      var row = []
      for (var c = 0; c < numCols; c++) {
        row.push(0);
      }
      grid.push(row);
    }
    grid[0][8] = new Node(8, 0, false);
    grid[1][8] = new Node(8, 1, false);
    grid[2][8] = new Node(8, 2, false);
    grid[3][8] = new Node(8, 3, false);
    grid[4][8] = new Node(8, 4, false);
    grid[0][7] = new Node(7, 0, false);
    grid[1][7] = new Node(7, 1, false);
    grid[2][7] = new Node(7, 2, false);
    grid[3][7] = new Node(7, 3, false);
    grid[4][7] = new Node(7, 4, false);


    // Obstacles
    // for (var r = 0; r < grid.length; r++) {
    //   for (var c = 0; c < grid[0].length; c++) {
    //     if (grid[r][c] == 1) {
    //       grid[r][c] = new Node(c, r, false);
    //     }
    //   }
    // }

    // Init start/end nodes
    grid[0][0] = new Node(0, 0);
    grid[1][1] = new Node(1, 1);

    // Find the path
    this.ai = new PathAI(grid);
    this.startNode = grid[0][0];
    this.path = this.ai.aStar(this.startNode, grid[1][1]);

    // AI move update delay
    this.aiMoveTime = 200;
    this.curAiMoveTime = 0;
  }

  handleEvent(e) {
    if (e.eventType == PickedUpEvent.COIN_PICKED_UP) {
      GoodDogPrototype.soundManager.playSoundEffect('coin');
      var coinZoom = new Tween(e.getSource().sprite, TweenTransitions.quadinout);
      coinZoom.animate(TweenableParams.SCALEX, .2, .8, 1000);
      coinZoom.animate(TweenableParams.SCALEY, .2, .8, 1000);
      coinZoom.animate(TweenableParams.X, e.getSource().sprite.position.x, 200, 1000);
      coinZoom.animate(TweenableParams.Y, e.getSource().sprite.position.y, 150, 1000);
      coinZoom.addEventListener(this, TweenEvent.TWEEN_COMPLETE_EVENT);
      TweenJuggler.add(coinZoom);
    } else if (e.eventType == TweenEvent.TWEEN_COMPLETE_EVENT) {
      if (e.getTween().object.id == 'Coin') {
        if (e.getSource().object.alpha == 0) {
          this.removeChild(e.getSource().object);
          this.coins.remove(e.getSource().object);
        } else {
          var coinFade = new Tween(e.getSource().object);
          coinFade.animate(TweenableParams.ALPHA, 1, 0, 1000);
          coinFade.addEventListener(this, TweenEvent.TWEEN_COMPLETE_EVENT);
          TweenJuggler.add(coinFade);
        }
      }
    }
  }

  update(pressedKeys, gamepads) {
    super.update(pressedKeys, gamepads);

    // Update ai
    var dogPos = this.mario.getPosition();
    var cellX = ((dogPos.getx() + this.mario.getUnscaledWidth()/2)/this.cellSize) | 0;
    var cellY = ((dogPos.gety() + this.mario.getUnscaledHeight()/2)/this.cellSize) | 0;
    var endNode = new Node(cellX, cellY);
    this.ai.grid[cellY][cellX] = endNode;
    this.ai.resetCells();
    this.path = this.ai.aStar(this.startNode, endNode);
    this.curAiMoveTime += this.clock.getElapsedTime();
    if (this.path.length > 1 && !this.pressedKeys.contains(16)) {
      // Only update the AI so often
      if (this.curAiMoveTime > this.aiMoveTime) {
        this.curAiMoveTime = 0;
        this.startNode = this.path[1];
      }
    }

    this.mario.checkCollisions(this);

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
    g.fillText("Coin grabbed: "+this.questManager.getQuestStatus(PickedUpEvent.COIN_PICKED_UP), 260, 25);

    // DEBUG: Draw grid
    if (debug) {
      var cellSize = this.cellSize;
      var grid = this.ai.grid;
      for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[0].length; c++) {
          var cell = grid[r][c];
          if (cell == 0 || cell.fCost == 0) {
            g.fillStyle = "rgba(0, 0, 0, 0.2)";
            g.fillRect(c*cellSize, r*cellSize, cellSize, cellSize);
          }

          if (cell && !cell.traversable) {
            g.fillStyle = "rgba(0, 0, 0, 0.5)";
            g.fillRect(cell.x*cellSize, cell.y*cellSize, cellSize, cellSize);
          }
        }
      }

      for (var i = 0; i < this.path.length; i++) {
        if (i == 0) {
          g.fillStyle = "rgba(0, 255, 0, 0.5)";
        } else if (i == this.path.length-1) {
          g.fillStyle = "rgba(255, 0, 0, 0.5)";
        } else {
          g.fillStyle = "rgba(0, 255, 255, 0.4)";
        }
        var cell = this.path[i];
        g.fillRect(cell.x*cellSize, cell.y*cellSize, cellSize, cellSize);
      }
    }
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
var debug = true;
if(drawingCanvas.getContext) {
  var game = new GoodDogPrototype(drawingCanvas);
  game.start();
}
