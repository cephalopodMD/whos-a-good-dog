'use strict';

/**
 * Helper class to transform a list of obstacles into a matrix
 */
class GridHelper {

	/**
	 * Create a matrix of 1's and 0's to represent the obstacles
	 *
	 * widthPx - the width in pixels of the level (NOT just the screen)
	 * heightPx - the height in pixels of the level (NOT just the screen)
	 * cellSize - the size of a grid cell
	 * obstacles - the list of obstacles for the matrix
	 *
	 * cellSize should be a factor of the width and height of the matrix objects
	 *  to help with object collisions
	 */
	static CreateObstacleMatrix(widthPx, heightPx, cellSize, obstacles, extraW, extraH) {
		// Get the dimensions of the matrix based on the cell size
		var numRows = heightPx / cellSize | 0;
		var numCols = widthPx / cellSize | 0;

		// Init empty matrix of 0's
		var matrix = [];
		for (var r = 0; r < numRows; r++) {
			var curRow = [];
			for (var c = 0; c < numCols; c++) {
				curRow.push(0);
			}
			matrix.push(curRow);
		}

		// Fill in the matrix with the obstacles
		for (var obstacle of obstacles) {
			var box = obstacle.getHitbox();
			// debugger;
			for (var j = box.y - extraH; j < (box.y + extraH + box.h); j += cellSize) {
				for (var i = box.x - extraW; i < (box.x + extraW + box.w); i += cellSize) {
					var xIdx = i/cellSize | 0;
					var yIdx = j/cellSize | 0;
					if (yIdx >= 0 && yIdx < numRows && xIdx >= 0 && xIdx < numCols) {
						matrix[yIdx][xIdx] = 1;
					}
				}
			}
		}

		return matrix;
	}
}