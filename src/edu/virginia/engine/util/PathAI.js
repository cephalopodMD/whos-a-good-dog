"use strict";

/**
 * Class to handle path finding AI
 */
class PathAI {

	constructor() {
		this.grid = [
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]
		];
	}

	aStar(startNode, endNode) {
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
					open.decreaseKey(neighbor, fCost, function(item, val) {
						item.fCost = fCost;
					});
				} else if (!openSet.has(neighbor) && !closedSet.has(neighbor)) {
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
		while (curNode != startNode) {
			path.push(curNode);
			curNode = curNode.parent;
		}
		path.push(startNode);

		// Revese the path to go from start to end
		path.reverse();

		return path;
	}

	heuristic(node, goal) {
		var dx = Math.abs(node.x - goal.x);
		var dy = Math.abs(node.y - goal.y);
		var costStraight = 10;
		var costDiag = 14;
		return costDiag * Math.min(dx, dy) + costStraight * Math.abs(dx-dy);
	}

	moveCost(node, parent) {
		// If x or y are the same, then straight move
		if (node.x == parent.x || node.y == parent.y) {
			return 10;
		}
		// Diagonal move, so use 14 as approx for 10*sqrt(2)
		return 14;
	}

	getNeighbors(node) {
		var neighbors = [];
		for (var r = -1; r <= 1; r++) {
			for (var c = -1; c <= 1; c++) {
				// Skip middle node
				if (r == 0 && c == 0) {
					continue;
				}

				var neighborX = node.x + c;
				var neighborY = node.y + r;
				if (neighborY >= 0 && neighborY < this.grid.length && neighborX >= 0 && neighborX < this.grid[0].length) {
					// Create neighboring nodes as needed
					var neighborNode = this.grid[neighborY][neighborX];
					if (!neighborNode) {
						neighborNode = new Node(neighborX, neighborY);
						this.grid[neighborY][neighborX] = neighborNode;
					}

					// Add the neighbor to the list of neighbors
					neighbors.push(neighborNode);
				}
			}
		}
		return neighbors;
	}
}

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

var pathAI = new PathAI();
pathAI.grid[0][0] = new Node(0, 0);
pathAI.grid[2][4] = new Node(4, 2);

// Obstacles
pathAI.grid[0][1] = new Node(1, 0, false);
pathAI.grid[1][1] = new Node(1, 1, false);
pathAI.grid[2][3] = new Node(3, 2, false);
pathAI.grid[1][3] = new Node(3, 1, false);
var path = pathAI.aStar(pathAI.grid[0][0], pathAI.grid[2][4]);