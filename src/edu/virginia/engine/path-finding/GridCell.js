'use strict';

/**
 * Simple class to hold information about a grid cell
 *
 * Treated more like a struct than a class
 */
class GridCell {

  constructor(x, y, traversable = true) {
    this.x = x;
    this.y = y;
    this.gCost = 0;
    this.fCost = 0;
    this.traversable = traversable;
    this.parent = undefined;
  }
}