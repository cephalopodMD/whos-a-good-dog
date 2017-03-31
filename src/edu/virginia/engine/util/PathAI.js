"use strict";

/**
 * Class to handle path finding AI
 */
class PathAI {

	constructor(grid) {
		this.grid = grid;
	}

	/**
	 * Perform an A* search between startNode and endNode in the grid
	 * Note: startNode and endNode must already be added to grid
	 */
	aStar(startNode, endNode) {
		// Check if startNode and endNode are the same
		if (startNode.x == endNode.x && startNode.y == endNode.y) {
			return [startNode];
		}

		// Keep track of neighboring nodes
		var open = new Heap(function(lhs, rhs) { return lhs.fCost < rhs.fCost;});
		open.add(startNode);

		// Keep track of visited nodes
		var openSet = new Set();
		openSet.add(startNode);
		var closedSet = new Set();

		while (open.peek().x != endNode.x || open.peek().y != endNode.y) {
			var curNode = open.remove();
			closedSet.add(curNode);

			var neighbors = this.getNeighbors(curNode);
			for (var neighbor of neighbors) {
				// If neighbor is not traversable, skip it
				if (!neighbor.traversable) {
					continue;
				}

				// Compute cost of current node
				var gCost = curNode.gCost + this.moveCost(neighbor, curNode);
				var fCost = gCost + this.heuristic(neighbor, endNode);
				if (openSet.has(neighbor) && gCost < neighbor.gCost) {
					// Update the parent and gCost
					neighbor.gCost = gCost;
					neighbor.parent = curNode;

					// Decrease the key in the heap
					open.decreaseKey(neighbor, fCost, function(item, val) {
						item.fCost = val;
					});
				} else if (!openSet.has(neighbor) && !closedSet.has(neighbor)) {
					// Set the cost for the node and add it to the heap
					neighbor.gCost = gCost;
					neighbor.parent = curNode;
					neighbor.fCost = fCost;
					open.add(neighbor);
					openSet.add(neighbor);
				}
			}
		}

		// Follow the parent pointers to get the path
		var path = []
		var curNode = endNode;
		while (curNode && curNode != startNode) {
			path.push(curNode);
			curNode = curNode.parent;
		}
		path.push(startNode);

		// Revese the path to go from start to end
		path.reverse();

		// Reset cells
		// this.resetCells();

		return path;
	}

	/**
	 * Compute h(n) for the octile diagonal heuristic
	 */
	heuristic(node, goal) {
		var dx = Math.abs(node.x - goal.x);
		var dy = Math.abs(node.y - goal.y);
		// Use c_straight = 10 and c_diag = 14 to approximate 1 and sqrt(2)
		var costStraight = 10;
		var costDiag = 14;
		return costDiag * Math.min(dx, dy) + costStraight * Math.abs(dx-dy);
	}

	/**
	 * Compute cost of moving between cells
	 */
	moveCost(node, parent) {
		// If x or y are the same, then straight move
		if (node.x == parent.x || node.y == parent.y) {
			return 10;
		}
		// Diagonal move, so use 14 as approx for 10*sqrt(2)
		return 14;
	}

	/**
	 * Get the neighbors for the given cell
	 *
	 * Neighbors are broken into two categories:
	 * 1. straight (s)
	 * 2. diagonal (d)
	 *
	 * Neighbor indices:
	 * + -- + -- + -- +
	 * | d1 | s1 | d2 |
	 * + -- + -- + -- +
	 * | s2 |    | s3 |
	 * + -- + -- + -- +
	 * | d3 | s4 | d4 |
	 * + -- + -- + -- +
	 *
	 * A diagonal cell is only a neighbor if it can get there without cutting any corner
	 */
	getNeighbors(node) {
		var neighbors = new Set();

		var s1 = this.getCell(node.x, node.y-1);
		var s2 = this.getCell(node.x-1, node.y);
		var s3 = this.getCell(node.x+1, node.y);
		var s4 = this.getCell(node.x, node.y+1);
		neighbors.add(s1);
		neighbors.add(s2);
		neighbors.add(s3);
		neighbors.add(s4);

		// Only consider diagonal neighbors that are not blocked on the straight sides
		if (s1 && s1.traversable && s2 && s2.traversable) {
			var d1 = this.getCell(node.x-1, node.y-1);
			neighbors.add(d1);
		}
		if (s1 && s1.traversable && s3 && s3.traversable) {
			var d2 = this.getCell(node.x+1, node.y-1);
			neighbors.add(d2);
		}
		if (s2 && s2.traversable && s4 && s4.traversable) {
			var d3 = this.getCell(node.x-1, node.y+1);
			neighbors.add(d3);
		}
		if (s3 && s3.traversable && s4 && s4.traversable) {
			var d4 = this.getCell(node.x+1, node.y+1);
			neighbors.add(d4);
		}

		// Removed any instances of undefined
		neighbors.delete(undefined);

		return neighbors;
	}

	/**
	 * Helper method to get a cell from the grid
	 */
	getCell(x, y) {
		// Check that cell is within grid
		if (y < 0 || y >= this.grid.length || x < 0 || x >= this.grid[0].length) {
			return undefined;
		}

		// Create neighboring nodes as needed
		var cell = this.grid[y][x];
		if (!cell) {
			cell = new Node(x, y);
			this.grid[y][x] = cell;
		}
		return cell;
	}

	/**
	 * Reset the costs for all cells in the grid
	 */
	resetCells() {
		for (var r = 0; r < this.grid.length; r++) {
			for (var c = 0; c < this.grid[0].length; c++) {
				var cell = this.grid[r][c];
				if (cell) {
					cell.gCost = 0;
					cell.fCost = 0;
				}
			}
		}
	}
}

/**
 * Simple node class to store information about a grid cell
 */
class Node {
	constructor(x, y, traversable = true) {
		this.x = x;
		this.y = y;
		this.gCost = 0;
		this.fCost = 0;
		this.traversable = traversable;
		this.parent = undefined;
	}
}

/*
var grid = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0]
];
var pathAI = new PathAI(grid);
pathAI.grid[0][0] = new Node(0, 0);
pathAI.grid[2][4] = new Node(4, 2);

// Obstacles
pathAI.grid[0][1] = new Node(1, 0, false);
pathAI.grid[1][1] = new Node(1, 1, false);
pathAI.grid[2][3] = new Node(3, 2, false);
pathAI.grid[1][3] = new Node(3, 1, false);
var path = pathAI.aStar(pathAI.grid[0][0], pathAI.grid[2][4]);
*/