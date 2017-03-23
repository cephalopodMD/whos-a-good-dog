'using strict'

class TweenTransitions {
  static linear(percent) {
    return percent;
  }

  static quadin(percent) {
    return percent * percent;
  }

  static quadout(percent) {
    return Math.sqrt(percent);
  }

  static quadinout(percent) {
    if (percent < .5)
      return 2 * (percent * percent)
    else {
      return 1 - 2 * ((percent - 1) * (percent - 1))
    }
  }

  static quadoutin(percent) {
    if (percent < .5)
      return 0.5 * Math.sqrt(percent)
    else {
      return 1 - 0.5*Math.sqrt(1-percent)
    }
  }
}
