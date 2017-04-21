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
		var height = 20 * blockSize;
		var objColor = "#cccccc";
		var walls = [
			// House boundaries
			new Wall("wall0", -2, -2, 2, 24, blockSize),
			new Wall("wall1", 30, -2, 2, 24, blockSize),
			new Wall("wall2", 0, -2, 30, 2, blockSize),
			new Wall("wall3", 0, 20, 30, 2, blockSize),

			// Interior walls
			new Wall("wall4", 13, 0, 3, 2, blockSize),
			new Wall("wall5", 25, 0, 5, 4, blockSize),
			new Wall("wall6", 13, 4, 17, 3, blockSize),
			new Wall("wall7", 0, 10, 3, 3, blockSize),
			new Wall("wall8", 6, 10, 10, 3, blockSize),
			new Wall("wall9", 13, 13, 3, 3, blockSize),
			new Wall("wall10", 13, 19, 3, 1, blockSize),

			// Placeholder objects
			// Bedroom
			new Wall("wall11", 0, 0, 2, 1, blockSize, objColor),
			new Wall("wall12", 5, 0, 1, 1, blockSize, objColor),
			new Wall("wall13", 9, 0, 1, 1, blockSize, objColor),

			// Bathroom
			new Wall("wall14", 17, 0, 1, 1, blockSize, objColor),

			// Kitchen
			new Wall("wall11", 0, 13, 2, 1, blockSize, objColor),
			new Wall("wall11", 9, 13, 1, 1, blockSize, objColor),
			new Wall("wall11", 12, 13, 1, 2, blockSize, objColor),
			new Wall("wall11", 2, 16, 1, 2, blockSize, objColor),
			new Wall("wall11", 5, 16, 1, 2, blockSize, objColor),

			// Living room
			new Wall("wall11", 16, 12, 1, 3, blockSize, objColor),
			new Wall("wall11", 22, 12, 2, 3, blockSize, objColor),
			new Wall("wall11", 21, 7, 1, 2, blockSize, objColor),
			new Wall("wall11", 24, 7, 1, 2, blockSize, objColor),
		];
		
		// Interactable objects
		var interactableObjects = [
			// Bedroom
			LevelFactory._makeDestroyObject(6, 0, 3, 3, 2, blockSize),
			LevelFactory._makeOpenableObject(0, 5, 1, 3, 1, blockSize),
			LevelFactory._makeDestroyObject(3, 4.5, 1, 1, 1, blockSize),
			LevelFactory._makeDestroyObject(3, 7.5, 1, 1, 1, blockSize),

			// Bathroom
			LevelFactory._makeOpenableObject(16, 0, 1, 1, 2, blockSize),
			LevelFactory._makeOpenableObject(18, 0, 1, 1, 2, blockSize),
			LevelFactory._makeOpenableObject(20, 0, 1, 1, 2, blockSize),
			LevelFactory._makeOpenableObject(23, 0.5, 2, 3, 3, blockSize),

			// Kitchen
			LevelFactory._makeDestroyObject(3, 16, 2, 2, 0, blockSize),
			LevelFactory._makeOpenableObject(6.5, 13, 2, 1, 2, blockSize),
			LevelFactory._makeOpenableObject(10, 13, 2, 1, 2, blockSize),
			LevelFactory._makeOpenableObject(12, 15, 1, 1, 2, blockSize),

			// Living Room
			LevelFactory._makeOpenableObject(22, 7, 2, 2, 2, blockSize),
			LevelFactory._makeDestroyObject(19, 12, 1, 3, 1, blockSize),
			LevelFactory._makeDestroyObject(26, 12, 1, 3, 3, blockSize),
		];

	   	// Combine the walls and interactable objects
	   	var collidables = [];
	   	collidables.push(...walls);
	   	collidables.push(...interactableObjects);

		// TODO add rooms
		var rooms = [];

		// Title overlay
		var screenWidth = GoodDogPrototype.getInstance().width;
		var screenHeight = GoodDogPrototype.getInstance().height;
		var titleOverlay = new TitleOverlay("TitleOverlay", "Episode I", "The Phantom Menace", screenWidth, screenHeight);

		// Set the min damage value for the level
		var minDamageValue = 100;

		// Create the dog
		var dog = new Dog(6*blockSize, 6*blockSize);

		// Create the owner
		var owner = new Owner(10*blockSize, 6*blockSize);

	    // Set the background for the level
	    var bgSprite = new Sprite("background", "sprites/levels/level1_bg.png");

		// Return the objects for the level
		return {
			width: width,
			height: height,
			collidables: collidables,
			rooms: rooms,
			titleOverlay: titleOverlay,
			minDamageValue: minDamageValue,
			dog: dog,
			owner: owner,
			interactableObjects: interactableObjects,
			backgroundSprite: bgSprite,
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
		var width = 25 * blockSize;
		var height = 20 * blockSize;
		var objColor = "#cccccc";
		var walls = [
			// House boundaries
			new Wall("wall0", -2, -2, 2, 24, blockSize),
			new Wall("wall1", 25, -2, 2, 24, blockSize),
			new Wall("wall2", 0, -2, 25, 2, blockSize),
			new Wall("wall3", 0, 20, 25, 2, blockSize),

			// Interior walls
			new Wall("wall4", 13, 0, 12, 2, blockSize),
			new Wall("wall5", 0, 7, 10, 3, blockSize),
			new Wall("wall6", 13, 4, 2, 8, blockSize),
			new Wall("wall7", 17, 6, 8, 3, blockSize),
			new Wall("wall8", 13, 15, 2, 5, blockSize),

			// Kitchen
			new Wall("wall8", 0, 0, 1, 3, blockSize, objColor),
			new Wall("wall8", 0, 4, 1, 1, blockSize, objColor),
			new Wall("wall8", 7, 0, 1, 2, blockSize, objColor),
			new Wall("wall8", 10, 0, 1, 2, blockSize, objColor),

			// Bathroom
			new Wall("wall8", 18, 2, 1, 1, blockSize, objColor),

			// Living Room
			new Wall("wall8", 7, 10, 2, 1, blockSize, objColor),
			new Wall("wall8", 8, 13, 1, 3, blockSize, objColor),
			new Wall("wall8", 12, 16, 1, 2, blockSize, objColor),

			// Bedroom
			new Wall("wall8", 24, 11, 1, 2, blockSize, objColor),
			new Wall("wall8", 17, 19, 2, 1, blockSize, objColor),
		];

		// Interactable objects
		var interactableObjects = [
			// Kitchen
			LevelFactory._makeOpenableObject(2, 0, 2, 1, 2, blockSize),
			LevelFactory._makeDestroyObject(8, 0, 2, 2, 2, blockSize),
			LevelFactory._makeOpenableObject(0, 3, 1, 1, 1, blockSize),
			LevelFactory._makeOpenableObject(0, 5, 1, 1, 1, blockSize),

			// Bathroom
			LevelFactory._makeOpenableObject(17, 2, 1, 1, 2, blockSize),
			LevelFactory._makeOpenableObject(20, 2, 1, 1, 2, blockSize),
			LevelFactory._makeOpenableObject(23, 2.5, 2, 3, 3, blockSize),

			// Living Room
			LevelFactory._makeOpenableObject(0, 13, 1, 3, 1, blockSize),
			LevelFactory._makeDestroyObject(3, 10, 3, 1, 2, blockSize),
			LevelFactory._makeDestroyObject(7, 13, 1, 3, 3, blockSize),

			// Bedroom
			LevelFactory._makeDestroyObject(19, 9, 3, 3, 2, blockSize),
			LevelFactory._makeOpenableObject(15, 16, 1, 2, 1, blockSize),
			LevelFactory._makeDestroyObject(20, 19, 1, 1, 0, blockSize),
			LevelFactory._makeOpenableObject(24, 14, 1, 3, 3, blockSize),
		];

		// Combine the walls and interactable objects
	   	var collidables = [];
	   	collidables.push(...walls);
	   	collidables.push(...interactableObjects);

		// TODO add rooms
		var rooms = [];

		// Title overlay
		var screenWidth = GoodDogPrototype.getInstance().width;
		var screenHeight = GoodDogPrototype.getInstance().height;
		var titleOverlay = new TitleOverlay("TitleOverlay", "Episode II", "Count DooDoo", screenWidth, screenHeight);

		// Set the min damage value for the level
		var minDamageValue = 100;

		// Create the dog
		var dog = new Dog(3*blockSize, 17*blockSize);

		// Create the owner
		var owner = new Owner(9*blockSize, 18*blockSize);

	    // Set the background for the level
	    var bgSprite = new Sprite("background", "sprites/levels/level2_bg.png");

		// Return the objects for the level
		return {
			width: width,
			height: height,
			collidables: collidables,
			rooms: rooms,
			titleOverlay: titleOverlay,
			minDamageValue: minDamageValue,
			dog: dog,
			owner: owner,
			interactableObjects: interactableObjects,
			backgroundSprite: bgSprite,
		};
	}

	static _makeOpenableObject(x, y, w, h, iDir, blockSize) {
		var box = new OpenableObject();
		// Use 0.24 to make the object 48px
	    box.setScale(0.24*w, 0.24*h);
	    box.setPosition(x*blockSize, y*blockSize);
	    // 0 = top
	    // 1 = right
	    // 2 = bottom
	    // 3 = left
	    switch (iDir) {
	    	case 0: 
	    		box.moveInteractBox(0, -blockSize);
	    		break;
    		case 1:
    			box.moveInteractBox(blockSize, 0);
    			break;
    		case 2:
    			box.moveInteractBox(0, blockSize);
    			break;
			case 3:
				box.moveInteractBox(-blockSize, 0);
				break;
	    }

	    return box;
	}

	static _makeDestroyObject(x, y, w, h, iDir, blockSize) {
		var box = new DestroyObject();
		// Use 0.24 to make the object 48px
	    box.setScale(0.24*w, 0.24*h);
	    box.setPosition(x*blockSize, y*blockSize);
	    // 0 = top
	    // 1 = right
	    // 2 = bottom
	    // 3 = left
	    switch (iDir) {
	    	case 0: 
	    		box.moveInteractBox(0, -blockSize);
	    		break;
    		case 1:
    			box.moveInteractBox(blockSize, 0);
    			break;
    		case 2:
    			box.moveInteractBox(0, blockSize);
    			break;
			case 3:
				box.moveInteractBox(-blockSize, 0);
				break;
	    }

	    return box;
	}
}
