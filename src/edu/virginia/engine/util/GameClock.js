"use strict";

/**
 * A very clock for keeping time (between frames or otherwise)
 *
 * */
class GameClock{

  constructor() {
    this.savedTime = 0;
    this.paused = false;
    this.resetGameClock();
  }

  /**
   * Returns Milliseconds passed since the last time resetGameClock() was called
   */
  getElapsedTime(){
    if (this.paused)
      return this.savedTime;
    else
      return new Date().getTime() - this.start + this.savedTime;
  }

  resetGameClock(){
    this.start = new Date().getTime();
  }

  pause() {
    this.savedTime += this.getElapsedTime();
    this.paused = true;
  }

  play() {
    this.resetGameClock();
    this.paused = false;
  }
}
