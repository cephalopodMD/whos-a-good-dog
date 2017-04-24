'use strict';

class LevelManager extends EventDispatcher {
	
	constructor(curLevel=0) {
		super();
		this.curLevel = curLevel;
		this.numLevels = 3;
	}

	handleEvent(e) {
		if (e.eventType == LevelCompleteEvent.LEVEL_COMPLETE) {
			this.curLevel += 1;
			if (this.curLevel == this.numLevels) {
				this.dispatchEvent(new GameOverEvent(e.source));
			} else {
				this.dispatchEvent(new LevelUpdateEvent(this));
			}
		}
		if (e.eventType == GameOverEvent.GAME_OVER) {
			this.curLevel = 0;
			console.log("game over");
		}
	}

	getCurrentLevel() {return this.curLevel;}
	getNumLevels() {return this.numLevels;}
}