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

    // TODO add rooms

		// Return the objects for the level
		return {
			walls: walls
		};
	}
}
