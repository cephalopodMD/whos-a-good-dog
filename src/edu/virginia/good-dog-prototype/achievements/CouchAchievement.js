'use strict';

/**
 * Burn achievement when player uses stove
 */
class CouchAchievement extends Achievement {
	constructor() {
		var requiredCouches = 5;
		var id = "CouchAchievement";
		var filename = "achievements/potato.png";
		var title = "Couch Potato";
		var description = "Poop in " + requiredCouches + " couches";
		super(id, filename, title, description);

		this.couchCount = 0;
		this.requiredCouches = requiredCouches;
	}

	updateStatus() {
		this.couchCount += 1;
		this.isComplete = (this.couchCount == this.requiredCouches);
	}
}