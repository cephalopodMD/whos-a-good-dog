'using strict'

class DollarSign extends Sprite {
  constructor(x, y) {
    super('dollar', 'sprites/dollar.png')
    Game.getInstance().addChild(this);
    this.setPosition(x, y);
    this.setScale(.2, .2)
    var dollarTween = new Tween(this, TweenTransitions.quadinout),
        final = new Vec2(16, 16);
    final.transform(Game.getInstance().matrix.inverse())
    dollarTween.animate(TweenableParams.X, x, final.x, 800);
    dollarTween.animate(TweenableParams.Y, y, final.y, 800);
    dollarTween.animate(TweenableParams.ALPHA, 1, 0.2, 800);
    TweenJuggler.add(dollarTween);
    dollarTween.addEventListener(this, TweenEvent.TWEEN_COMPLETE_EVENT);
  }
  handleEvent(e) {
    if (this.parent) {
      this.parent.removeChild(this);
    }
    delete this;
  }
}
