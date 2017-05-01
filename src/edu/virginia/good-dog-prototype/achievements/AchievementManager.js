'use strict';

/**
 * Class to handle achievements
 */
class AchievementManager extends EventDispatcher {

	constructor() {
		if (AchievementManager.instance != null) {
			return AchievementManager.instance;
		}

		// Call EventDispatcher constructor
		super();

		this.achievements = this._initAchievements();
		AchievementManager.instance = this;
		return this;
	}

	static getInstance() {
		return AchievementManager.instance || new AchievementManager();
	}

	handleEvent(e) {
		if (this.achievements.hasOwnProperty(e.eventType)) {
			// Udpate the event status
			var achievement = this.achievements[e.eventType];
			achievement.updateStatus();

			// If the event is complete, trigger an event to update the UI
			if (achievement.getIsComplete()) {
				this.dispatchEvent(new AchievementCompleteEvent(achievement));
			}
		}
	}

	_initAchievements() {
		var achievements = {};
		achievements["Burn"] = new BurnAchievement();
		achievements["Poop in plant"] = new PlantPoopAchievement();
		achievements["Poop in couch"] = new CouchAchievement();
		return achievements;
	}
}