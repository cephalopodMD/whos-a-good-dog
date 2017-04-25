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
		// Draw walls as transparent
		var wallColor = "rgba(0, 0, 0, 0.0)";
		var objColor = "#cccccc";
		var walls = [
			// House boundaries
			new Wall("wall0", -2, -2, 2, 24, blockSize, wallColor),
			new Wall("wall1", 30, -2, 2, 24, blockSize, wallColor),
			new Wall("wall2", 0, -2, 30, 2, blockSize, wallColor),
			new Wall("wall3", 0, 20, 30, 2, blockSize, wallColor),

			// Interior walls
			new Wall("wall4", 13, 0, 3, 2, blockSize, wallColor),
			new Wall("wall5", 25, 0, 5, 4, blockSize, wallColor),
			new Wall("wall6", 13, 4, 17, 3, blockSize, wallColor),
			new Wall("wall7", 0, 10, 3, 3, blockSize, wallColor),
			new Wall("wall8", 6, 10, 10, 3, blockSize, wallColor),
			new Wall("wall9", 13, 13, 3, 3, blockSize, wallColor),
			new Wall("wall10", 13, 19, 3, 1, blockSize, wallColor),

			// Placeholder objects
			// Bedroom
			// new Wall("wall11", 0, 0, 2, 1, blockSize, objColor),
			new CoffeeTable("wall12", 5, 0, 1, 1, blockSize, objColor),
			new CoffeeTable("wall13", 9, 0, 1, 1, blockSize, objColor),

			// Bathroom
			new Wall("wall14", 18, 0, 3, 1, blockSize, "#afafaf"),

			// Kitchen
			new Wall("wall11", 0, 13, 3, 1, blockSize, "#afafaf"),
			new Wall("wall11", 12, 13, 1, 2, blockSize, "#afafaf"),
			new Wall("wall11", 8, 13, 4, 1, blockSize, "#bbbbbb"),
			new Counter("wall11", 2, 16, 1, 2, blockSize, objColor),
			new Counter("wall11", 5, 16, 1, 2, blockSize, objColor),

			// Living room
			// new Wall("wall11", 16, 12, 1, 3, blockSize, objColor),
			new Table("wall11", 22, 12, 2, 3, blockSize, objColor),
		];

		// Interactable objects
		var interactableObjects = [
			// Bedroom
			LevelFactory._makeBed(6, 0, 3, 3, 2, blockSize),
			LevelFactory._makeCouch(0, 5, 1.5, 3, 1, blockSize),
			LevelFactory._makePlant(3, 4.5, 1, 1, 1, blockSize),
			LevelFactory._makePlant(3, 7.5, 1, 1, 1, blockSize),

			// Bathroom
			LevelFactory._makePlant(16, 0, 1, 1, 2, blockSize),
			LevelFactory._makeTub(23, 0.2, 2, 3, 3, blockSize),
			LevelFactory._makeBathSink(18, 0, 1, 1, 2, blockSize),
			LevelFactory._makeBathSink(20, 0, 1, 1, 2, blockSize),

			// Kitchen
			LevelFactory._makeStove(3, 16, 2, 2, 2, blockSize),
			LevelFactory._makeFridge(6.5, 13, 1, 1, 2, blockSize),
			LevelFactory._makeSink(9, 13, 3, 1, 2, blockSize),
			LevelFactory._makeTrash(12, 15, 1, 1, 2, blockSize),

			// Living Room
			LevelFactory._makeCouch(21, 7, 4, 1.5, 2, blockSize),
			LevelFactory._makeBench(19, 12, 1, 3, 1, false, blockSize),
			LevelFactory._makeBench(26, 12, 1, 3, 3, true, blockSize),
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
		var minDamageValue = 2;

		// Create the dog
		var dog = new Dog(6*blockSize, 6*blockSize);

		// Create the owner
		var owner = new Owner(10*blockSize, 6*blockSize);

	    // Set the background for the level
	    var bgSprite = new Sprite("background", "sprites/levels/level1_bg.png");
	    bgSprite.setPosition(-3*blockSize, -3*blockSize);

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
		// Draw walls as transparent
		var wallColor = "rgba(0, 0, 0, 0.0)";
		var objColor = "#cccccc";
		var walls = [
			// House boundaries
			new Wall("wall0", -2, -2, 2, 24, blockSize, wallColor),
			new Wall("wall1", 25, -2, 2, 24, blockSize, wallColor),
			new Wall("wall2", 0, -2, 25, 2, blockSize, wallColor),
			new Wall("wall3", 0, 20, 25, 2, blockSize, wallColor),

			// Interior walls
			new Wall("wall4", 13, 0, 12, 2, blockSize, wallColor),
			new Wall("wall5", 0, 7, 10, 3, blockSize, wallColor),
			new Wall("wall6", 13, 4, 2, 8, blockSize, wallColor),
			new Wall("wall7", 17, 6, 8, 3, blockSize, wallColor),
			new Wall("wall8", 13, 15, 2, 5, blockSize, wallColor),

			// Kitchen
			new Counter("wall9", 0, 4.5, 1, 2, blockSize, objColor),
			new Counter("wall10", 0, 0.5, 1, 2, blockSize, objColor),
			new Wall("wall11", 3, 0, 6, 1, blockSize, "#afafaf"),

			// Bathroom
			new Wall("wall14", 17, 2, 5, 1, blockSize, "#afafaf"),

			// Living Room

			// Bedroom
			new CoffeeTable("wall12", 24, 11, 1, 1, blockSize, objColor),
		];

		// Interactable objects
		var interactableObjects = [
			// Kitchen
			LevelFactory._makeStove(0, 2.5, 2, 2, 1, blockSize),
			LevelFactory._makeSink(4, 0, 3, 1, 2, blockSize),
			LevelFactory._makeTrash(2, 0, 1, 1, 2, blockSize),
			LevelFactory._makeFridge(10, 0, 1, 1, 2, blockSize),

			// Bathroom
			LevelFactory._makeTub(23, 3, 2, 3, 3, blockSize),
			LevelFactory._makeBathSink(18, 2, 1, 1, 2, blockSize),
			LevelFactory._makeTrash(16, 2, 1, 1, 2, blockSize),
			LevelFactory._makeBathSink(20, 2, 1, 1, 2, blockSize),

			// Living Room
			LevelFactory._makeCouch(0, 13, 1.5, 3, 1, blockSize),
			LevelFactory._makeCouch(3.5, 10, 3, 1.5, 2, blockSize),
			LevelFactory._makeBench(8.5, 13, 1, 3, 3, true, blockSize),

			// Bedroom
			LevelFactory._makeBed(19, 9, 3, 3, 2, blockSize),
			LevelFactory._makeCouch(15, 16, 1.5, 3, 1, blockSize),
			LevelFactory._makePlant(24, 16, 1, 1, 3, blockSize),
			LevelFactory._makePlant(24, 18, 1, 1, 3, blockSize),
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
		var minDamageValue = 2;

		// Create the dog
		var dog = new Dog(3*blockSize, 17*blockSize);

		// Create the owner
		var owner = new Owner(9*blockSize, 18*blockSize);

	    // Set the background for the level
	    var bgSprite = new Sprite("background", "sprites/levels/level2_bg.png");
	    bgSprite.setPosition(-3*blockSize, -3*blockSize);

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
	 * Return the objects for level 3 of the game
	 *
	 * Level Dimensions:
	 * 960 x 960
	 * 20 blocks x 20 blocks
	 */
	static CreateLevelThree() {
		var blockSize = 48;
		var width = 20 * blockSize;
		var height = 20 * blockSize;
		// Draw walls as transparent
		var wallColor = "rgba(0, 0, 0, 0.0)";
		var objColor = "#cccccc";
		var counter1 = new Counter("counter1", 13, 0, 1, 2, blockSize, objColor);
		counter1.setRotation(Math.PI/2);
		var counter2 = new Counter("counter2", 18, 0, 1, 2, blockSize, objColor);
		counter2.setRotation(Math.PI/2);
		var table = new Table("wall11", 18, 15.5, 2, 3, blockSize, objColor);
		table.setRotation(Math.PI/2);
		var walls = [
			// House boundaries
			new Wall("wall0", -2, -2, 2, 24, blockSize, wallColor),
			new Wall("wall1", 20, -2, 2, 24, blockSize, wallColor),
			new Wall("wall2", 0, -2, 24, 2, blockSize, wallColor),
			new Wall("wall3", 0, 20, 24, 2, blockSize, wallColor),

			// Interior walls
			new Wall("wall4", 9, 0, 2, 10, blockSize, wallColor),
			new Wall("wall5", 0, 10, 6, 5, blockSize, wallColor),
			new Wall("wall6", 17, 7, 3, 3, blockSize, wallColor),
			new Wall("wall7", 8, 13, 3, 7, blockSize, wallColor),

			// Placeholder objects
			// Bedroom
			new CoffeeTable("wall12", 2, 0, 1, 1, blockSize, objColor),
			new CoffeeTable("wall13", 6, 0, 1, 1, blockSize, objColor),

			// Kitchen
			counter1,
			counter2,
			new Counter("counter3", 11, 3, 1, 2, blockSize, objColor),
			new Counter("counter4", 11, 5, 1, 2, blockSize, objColor),

			// Bathroom
			new Wall("wall8", 2, 15, 3, 1, blockSize, "#afafaf"),

			// Living Room
			table,

		];

		// Interactable objects
		var interactableObjects = [
			// Bedroom
			LevelFactory._makeBed(3, 0, 3, 3, 2, blockSize),
			LevelFactory._makeCouch(0, 5, 1.5, 3, 1, blockSize),

			// Kitchen
			LevelFactory._makeSink(13, 0, 3, 1, 2, blockSize),
			LevelFactory._makeTrash(11, 2, 1, 1, 1, blockSize),
			LevelFactory._makeStove(18, 3, 2, 2, 3, blockSize),
			LevelFactory._makePlant(11, 9, 1, 1, 1, blockSize),
			LevelFactory._makePlant(16, 9, 1, 1, 3, blockSize),

			// Living Room
			LevelFactory._makeBench(11, 15, 1, 3, 1, false, blockSize),
			LevelFactory._makeCouch(16, 12, 4, 1.5, 2, blockSize),

			// Bathroom
			LevelFactory._makeTub(0, 17, 2, 3, 1, blockSize),
			LevelFactory._makeTrash(7, 19, 1, 1, 0, blockSize),
			LevelFactory._makeBathSink(4, 15, 1, 1, 2, blockSize),
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
		var titleOverlay = new TitleOverlay("TitleOverlay", "Episode III", "Revenge of the Sh*t", screenWidth, screenHeight);

		// Set the min damage value for the level
		var minDamageValue = 2;

		// Create the dog
		var dog = new Dog(13*blockSize, 15*blockSize);

		// Create the owner
		var owner = new Owner(16*blockSize, 15*blockSize);

	    // Set the background for the level
	    var bgSprite = new Sprite("background", "sprites/levels/level3_bg.png");
	    bgSprite.setPosition(-3*blockSize, -3*blockSize);

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
	 * Return the objects for level 4 of the game
	 *
	 * Level Dimensions:
	 * 960 x 720
	 * 20 blocks x 15 blocks
	 */
	static CreateLevelFour() {
		var blockSize = 48;
		var width = 20 * blockSize;
		var height = 15 * blockSize;
		// Draw walls as transparent
		var wallColor = "rgba(0, 0, 0, 0.0)";
		var objColor = "#cccccc";
		var walls = [
			// House boundaries
			new Wall("wall0", -2, -2, 2, 17, blockSize, wallColor),
			new Wall("wall1", 20, -2, 2, 17, blockSize, wallColor),
			new Wall("wall2", 0, -2, 20, 2, blockSize, wallColor),
			new Wall("wall3", 0, 15, 20, 2, blockSize, wallColor),

			// Interior walls
			new Wall("wall4", 9, 0, 2, 5, blockSize, wallColor),
			new Wall("wall5", 9, 8, 4, 3, blockSize, wallColor),
			new Wall("wall6", 15, 8, 5, 3, blockSize, wallColor),
			new Wall("wall7", 9, 11, 2, 4, blockSize, wallColor),

			// Kitchen table
			new Table("table1", 3.5, 10, 2, 3, blockSize, wallColor),

			// Placeholder objects
			// Bedroom
			new CoffeeTable("wall12", 4, 6, 1, 1, blockSize, objColor),

			//Bathroom
			new Wall("wall8", 15, 11, 4.5, 1, blockSize, "#afafaf"),

			// Kitchen
			new Wall("wall11", 14, 0, 6, 1, blockSize, "#afafaf"),
		];

		// Interactable objects
		var interactableObjects = [
			// Bedroom
			LevelFactory._makeBed(3, 0, 3, 3, 2, blockSize),
			LevelFactory._makePlant(1, 0, 1, 1, 2, blockSize),
			LevelFactory._makePlant(7, 0, 1, 1, 2, blockSize),

			// Living area
			LevelFactory._makeBench(0.5, 10, 1, 3, 1, false, blockSize),
			LevelFactory._makeBench(7.5, 10, 1, 3, 3, true, blockSize),

			// Bathroom
			LevelFactory._makeTub(11, 11.5, 2, 3, 1, blockSize),
			LevelFactory._makeBathSink(16, 11, 1, 1, 2, blockSize),
			LevelFactory._makePlant(19, 14, 1, 1, 3, blockSize),

			// Kitchen
			LevelFactory._makeSink(15, 0, 3, 1, 2, blockSize),
			LevelFactory._makeFridge(12, 0, 1, 1, 2, blockSize),
			LevelFactory._makeTrash(19, 3, 1, 1, 3, blockSize),
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
		var titleOverlay = new TitleOverlay("TitleOverlay", "Episode IV", "A Poo Hope", screenWidth, screenHeight);

		// Set the min damage value for the level
		var minDamageValue = 80;

		// Create the dog
		var dog = new Dog(13*blockSize, 7*blockSize);

		// Create the owner
		var owner = new Owner(16*blockSize, 7*blockSize);

	    // Set the background for the level
	    var bgSprite = new Sprite("background", "sprites/levels/level4_bg.png");
	    bgSprite.setPosition(-3*blockSize, -3*blockSize);

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

	static _makePlant(x, y, w, h, iDir, blockSize) {
		var box = new Plant();
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

	static _makeTrash(x, y, w, h, iDir, blockSize) {
		var box = new Trash();
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

	static _makeFridge(x, y, w, h, iDir, blockSize) {
		var box = new Fridge();
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

	static _makeCouch(x, y, w, h, iDir, blockSize) {
		var box = new Couch(iDir);
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

	static _makeTub(x, y, w, h, iDir, blockSize) {
		var box = new Tub();
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

	static _makeBed(x, y, w, h, iDir, blockSize) {
		var box = new Bed();
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

	static _makeSink(x, y, w, h, iDir, blockSize) {
		var box = new Sink();
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

	static _makeBathSink(x, y, w, h, iDir, blockSize) {
		var box = new BathSink();
		// Use 0.24 to make object 48px
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

	static _makeStove(x, y, w, h, iDir, blockSize) {
		var box = new Stove();
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

	static _makeBench(x, y, w, h, iDir, isRight, blockSize) {
		var box = new Bench(isRight);
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
