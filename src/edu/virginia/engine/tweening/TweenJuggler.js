'using strict'

class TweenJuggler  {

  constructor() {
    if (TweenJuggler.instance != null)
      return TweenJuggler.instance;
    this.tweens = new ArrayList();
    this.timer = new GameClock();
    this.dt = 0;
    TweenJuggler.instance = this;
    return this;
  }

  static getInstance() {
    if (TweenJuggler.instance)
      return TweenJuggler.instance;
    return new TweenJuggler();
  }

  static add(tween) {
    (new TweenJuggler()).tweens.add(tween)
    tween.dispatchEvent(new TweenEvent(TweenEvent.TWEEN_START_EVENT, this))
  }

  /**
   * invoked every frame by Game, calls update() on every Tween and cleans up old/complete Tweens
   */
  static nextFrame() {
    var t = new TweenJuggler();
    t.dt = t.timer.getElapsedTime();
    t.timer.resetGameClock();

    for (let i = 0; i < t.tweens.size(); i++) {
      var tween = t.tweens.get(i);
      tween.update();
      if (tween.isComplete()) {
        t.tweens.removeAt(i);
        i--;
      }
    }
  }

  handleEvent(e) {

  }
}

TweenJuggler.instance = null;
