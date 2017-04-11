'use strict';

class LevelCompleteEvent extends Event {
	constructor(game) {
		super(LevelCompleteEvent.LEVEL_COMPLETE, game);
	}
}

LevelCompleteEvent.LEVEL_COMPLETE = 'level complete';