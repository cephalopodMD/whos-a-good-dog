'using strict'

class Tween extends EventDispatcher {
  /**
   * Tween(DisplayObject object);
   * Tween(DisplayObject object, TweenTransitions transition);
   */
  constructor(object, transition=null) {
    super();
    this.object = object;
    if (transition == null)
      this.transition = TweenTransitions.linear;
    else
      this.transition = transition;
    this.params = {};
    this.elapsedTime = 0
    this.juggler = TweenJuggler.getInstance();
    this.addEventListener(this.juggler);
    this.paramCount = 0;
  }

  /**
   * animate(TweenableParams fieldToAnimate, double startVal, double endVal, double time);
   */
  animate(fieldToAnimate, startVal, endVal, time) {
    if (!this.params[fieldToAnimate])
      this.paramCount++;
    this.params[fieldToAnimate] = new TweenParam(fieldToAnimate, startVal, endVal, time);
  }

  /**
   * invoked once per frame by the TweenJuggler. Updates this tween / DisplayObject
   */
  update() {
    // get dt from juggler singleton
    for (let param_id in this.params) {
      var param = this.params[param_id];
      param.elapsedTime += this.juggler.dt
      var percent = Math.min(1.0, param.elapsedTime / param.time),
          progress = this.transition(percent),
          newVal = param.startVal + progress * (param.endVal - param.startVal);
      this.setValue(param_id, newVal);
      this.dispatchEvent(new TweenEvent(TweenEvent.TWEEN_UPDATE_EVENT, this));
      if (percent == 1.0) {
        delete this.params[param_id];
        this.paramCount--;
        if (this.paramCount <= 0)
          this.dispatchEvent(new TweenEvent(TweenEvent.TWEEN_COMPLETE_EVENT, this));
      }
    }
  }

  isComplete() {
    return this.params == {}
  }

  /**
   * setValue(TweenableParams param, double value)
   */
  setValue(param, newVal) {
    switch (param) {
      case TweenableParams.X:
        this.object.setPosition(newVal, this.object.position.y);
        break;
      case TweenableParams.Y:
        this.object.setPosition(this.object.position.x, newVal);
        break;
      case TweenableParams.SCALEX:
        this.object.setScale(newVal, this.object.scale.y);
        break;
      case TweenableParams.SCALEY:
        this.object.setScale(this.object.scale.x, newVal);
        break;
      case TweenableParams.THETA:
        this.object.setRotation(newVal);
        break;
      case TweenableParams.ALPHA:
        this.object.setAlpha(newVal);
        break;
    }
  }
}
