'using strict'

class Emitter extends DisplayObjectContainer {
  constructor(id, particleClass, ...args) {
    super(id, '');
    this.particleClass = particleClass;
    this.args = args
    this.timer = new GameClock()
    this.radius = 100
  }

  emit() {
    var newParticle = new this.particleClass(...this.args);

    var particleEmit = new Tween(newParticle);
    particleEmit.animate(TweenableParams.ALPHA, this.alpha, 0, 3000);
    particleEmit.animate(TweenableParams.X, 0, Math.random()*2*this.radius - this.radius, 3000);
    particleEmit.animate(TweenableParams.Y, 0, Math.random()*2*this.radius - this.radius, 3000);
    particleEmit.addEventListener(this, TweenEvent.TWEEN_COMPLETE_EVENT);
    TweenJuggler.add(particleEmit);

    this.children.contents.unshift(newParticle);
  }

  update(pressedKeys, gamepads) {
    super.update(pressedKeys, gamepads)
    if (this.timer.getElapsedTime() > 100) {
      this.emit()
      this.timer.resetGameClock();
    }
  }

  handleEvent(e) {
    this.removeChild(e.getTween().getObject());
    delete e.getTween().getObject();
  }
}
