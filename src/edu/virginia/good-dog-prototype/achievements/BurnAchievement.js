'use strict';

/**
 * Burn achievement when player uses stove
 */
class BurnAchievement extends Achievement {
	constructor() {
		var id = "BurnAchievement";
		var filename = "achievements/fire.png";
		var title = "This Sh*t is Lit";
		var description = "Light some poo on fire";
		super(id, filename, title, description);

		this.burnCount = 0;
		this.requiredBurns = 1;
	}

	updateStatus() {
		this.burnCount += 1;
		if (this.burnCount == this.requiredBurns) {
			this.isComplete = true;
		}
	}
}