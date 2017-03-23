'using strict'

class TweenParam {

  /**
   * TweenableParams paramToTween, double startVal, double endVal, double time
   */
  constructor(paramToTween, startVal, endVal, time) {
    this.param = paramToTween;
    this.startVal = startVal;
    this.endVal = endVal;
    this.time = time;
    this.elapsedTime = 0;
  }

  getParam(){
    return this.param;
  }

  getStartVal(){
    return this.startVal
  }

  getEndVal(){
    return this.endVal
  }

  getTweenTime(){
    return this.time
  }
}
