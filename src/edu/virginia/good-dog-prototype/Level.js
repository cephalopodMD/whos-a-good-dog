'use strict';

class Level {
	constructor(width, height, obstacles, rooms, titleOverlay, minDamageValue) {
		this.width = width;
		this.height = height;
		this.obstacles = obstacles;
		this.rooms = rooms;
		this.titleOverlay = titleOverlay;
		this.minDamageValue = minDamageValue;
	}
}