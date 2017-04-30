'use strict';

class AchievementCompleteEvent extends Event {
	constructor(achievement) {
		super(AchievementCompleteEvent.ACHIEVEMENT_COMPLETE, achievement);
	}
}

AchievementCompleteEvent.ACHIEVEMENT_COMPLETE = 'ACHIEVEMENT_COMPLETE';