'use strict';

/**
 * Helper class to store level initialization info
 */
class LevelFactory {

	/**
	 * Return the objects for level 1 of the game
	 *
	 * Level Dimensions:
	 * 1440 x 960
	 * 30 blocks x 20 blocks
	 */
	static CreateLevelOne() {
		var blockSize = 48;
		var width = 30 * blockSize;
		var height = 25 * blockSize;
		var walls = [
			// House boundaries
			new Wall("wall0", -1, -1, 1, 22, blockSize),
			new Wall("wall1", 30, -1, 1, 22, blockSize),
			new Wall("wall2", 0, -1, 30, 1, blockSize),
			new Wall("wall3", 0, 20, 30, 1, blockSize),

			// Interior walls
			new Wall("wall4", 13, 0, 3, 1, blockSize),
			new Wall("wall5", 25, 0, 5, 4, blockSize),
			new Wall("wall6", 13, 4, 17, 3, blockSize),
			new Wall("wall7", 0, 10, 3, 3, blockSize),
			new Wall("wall8", 6, 10, 10, 3, blockSize),
			new Wall("wall9", 13, 13, 3, 3, blockSize),
			new Wall("wall10", 13, 19, 3, 1, blockSize),

			// Debug
			new Wall("wall11", 20, 15, 1, 1, blockSize),
		];
		
		// Interactable objects
		var interactableObjects = [];

		// TODO add rooms
		var rooms = [];

		// Title overlay
		var screenWidth = GoodDogPrototype.getInstance().width;
		var screenHeight = GoodDogPrototype.getInstance().height;
		var titleOverlay = new TitleOverlay("TitleOverlay", "Episode I", "The Phantom Menace", screenWidth, screenHeight);

		// Set the min damage value for the level
		var minDamageValue = 20;

		// Create the dog
		var dog = new Dog(90, 200);

		// Create the owner
		var owner = new Owner(80, 80);

		// Return the objects for the level
		return {
			width: width,
			height: height,
			collidables: walls,
			rooms: rooms,
			titleOverlay: titleOverlay,
			minDamageValue: minDamageValue,
			dog: dog,
			owner: owner,
			interactableObjects: interactableObjects
		};
	}

	/**
	 * Return the objects for level 2 of the game
	 *
	 * Level Dimensions:
	 * 1440 x 960
	 * 30 blocks x 20 blocks
	 */
	static CreateLevelTwo() {
		var blockSize = 48;
		var width = 30 * blockSize;
		var height = 25 * blockSize;
		var walls = [
			// House boundaries
			new Wall("wall0", -1, -1, 1, 22, blockSize),
			new Wall("wall1", 30, -1, 1, 22, blockSize),
			new Wall("wall2", 0, -1, 30, 1, blockSize),
			new Wall("wall3", 0, 20, 30, 1, blockSize),

			// Interior walls
			new Wall("wall4", 13, 0, 3, 1, blockSize),
			new Wall("wall5", 25, 0, 5, 4, blockSize),
			new Wall("wall6", 13, 4, 17, 3, blockSize),
			new Wall("wall7", 0, 10, 3, 3, blockSize),
			new Wall("wall8", 6, 10, 10, 3, blockSize),
			new Wall("wall9", 13, 13, 3, 3, blockSize),
			new Wall("wall10", 13, 19, 3, 1, blockSize),

			// Debug
			new Wall("wall11", 20, 15, 1, 1, blockSize),
		];

		// Interactable objects
		var interactableObjects = [];

		// TODO add rooms
		var rooms = [];

		// Title overlay
		var screenWidth = GoodDogPrototype.getInstance().width;
		var screenHeight = GoodDogPrototype.getInstance().height;
		var titleOverlay = new TitleOverlay("TitleOverlay", "Episode II", "Count DooDoo", screenWidth, screenHeight);

		// Set the min damage value for the level
		var minDamageValue = 20;

		// Create the dog
		var dog = new Dog(90, 200);

		// Create the owner
		var owner = new Owner(80, 80);

		// Return the objects for the level
		return {
			width: width,
			height: height,
			collidables: walls,
			rooms: rooms,
			titleOverlay: titleOverlay,
			minDamageValue: minDamageValue,
			dog: dog,
			owner: owner,
			interactableObjects: interactableObjects,
		};
	}
}
