'use strict';

/**
 * Plant fertilizer achievement
 */
class PlantPoopAchievement extends Achievement {
	constructor() {
		var requiredPlants = 3;
		var id = "PlantPoopAchievement";
		var filename = "achievements/plant.png";
		var title = "Miracle Grow";
		var description = "Poop in " + requiredPlants + " plants";
		super(id, filename, title, description);

		this.plantCount = 0;
		this.requiredPlants = requiredPlants;
	}

	updateStatus() {
		this.plantCount += 1;
		this.isComplete = (this.plantCount == this.requiredPlants);
	}
}