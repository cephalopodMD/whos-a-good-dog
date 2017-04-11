'use strict';

class LevelUpdateEvent extends Event {
	constructor(levelManager) {
		super(LevelUpdateEvent.LEVEL_UPDATE, levelManager);
	}
}

LevelUpdateEvent.LEVEL_UPDATE = 'level update';