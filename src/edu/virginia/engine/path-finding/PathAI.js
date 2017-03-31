"use strict";

/**
 * Class to handle path finding AI
 */
class PathAI {

	constructor(grid) {
		this.grid = grid;
	}

	/**
	 * Perform an A* search between startCell and endCell in the grid
	 * Note: startCell and endCell must already be added to grid
	 */
	aStar(startCell, endCell) {
		// Check if startCell and endCell are the same
		if (startCell.x == endCell.x && startCell.y == endCell.y) {
			return [startCell];
		}

		// Keep track of neighboring cells
		var open = new Heap(function(lhs, rhs) { return lhs.fCost < rhs.fCost;});
		open.add(startCell);

		// Keep track of visited cells
		var openSet = new Set();
		openSet.add(startCell);
		var closedSet = new Set();

		while (open.peek().x != endCell.x || open.peek().y != endCell.y) {
			var curCell = open.remove();
			closedSet.add(curCell);

			var neighbors = this.grid.getNeighbors(curCell);
			for (var neighbor of neighbors) {
				// If neighbor is not traversable, skip it
				if (!neighbor.traversable) {
					continue;
				}

				// Compute cost of current cell
				var gCost = curCell.gCost + this.moveCost(neighbor, curCell);
				var fCost = gCost + this.heuristic(neighbor, endCell);
				if (openSet.has(neighbor) && gCost < neighbor.gCost) {
					// Update the parent and gCost
					neighbor.gCost = gCost;
					neighbor.parent = curCell;

					// Decrease the key in the heap
					open.decreaseKey(neighbor, fCost, function(item, val) {
						item.fCost = val;
					});
				} else if (!openSet.has(neighbor) && !closedSet.has(neighbor)) {
					// Set the cost for the cell and add it to the heap
					neighbor.gCost = gCost;
					neighbor.parent = curCell;
					neighbor.fCost = fCost;
					open.add(neighbor);
					openSet.add(neighbor);
				}
			}
		}

		// Follow the parent pointers to get the path
		var path = []
		var curCell = endCell;
		while (curCell && curCell != startCell) {
			path.push(curCell);
			curCell = curCell.parent;
		}
		path.push(startCell);

		// Revese the path to go from start to end
		path.reverse();

		return path;
	}

	/**
	 * Compute h(n) for the octile diagonal heuristic
	 */
	heuristic(cell, goal) {
		var dx = Math.abs(cell.x - goal.x);
		var dy = Math.abs(cell.y - goal.y);
		// Use c_straight = 10 and c_diag = 14 to approximate 1 and sqrt(2)
		var costStraight = 10;
		var costDiag = 14;
		return costDiag * Math.min(dx, dy) + costStraight * Math.abs(dx-dy);
	}

	/**
	 * Compute cost of moving between cells
	 */
	moveCost(cell, parent) {
		// If x or y are the same, then straight move
		if (cell.x == parent.x || cell.y == parent.y) {
			return 10;
		}
		// Diagonal move, so use 14 as approx for 10*sqrt(2)
		return 14;
	}
}
