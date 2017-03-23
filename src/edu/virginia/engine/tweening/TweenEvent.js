'using strict'

class TweenEvent extends Event {
  constructor(eventType, tween) {
    super(eventType, tween);
    this.tween = tween;
  }

  getTween() {
    return this.tween;
  }
}

TweenEvent.TWEEN_START_EVENT = 'TWEEN_START_EVENT';
TweenEvent.TWEEN_UPDATE_EVENT = 'TWEEN_UPDATE_EVENT';
TweenEvent.TWEEN_COMPLETE_EVENT = 'TWEEN_COMPLETE_EVENT';
