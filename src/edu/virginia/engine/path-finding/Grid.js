'use strict';

/**
 * Class to provide grid abstraction and helper methods
 */
class Grid {

  constructor(numRows, numCols, cellSize) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.cellSize = cellSize;

    // Initialize the grid with empty grid cells
    this.grid = [];
    for (var r = 0; r < numRows; r++) {
      var curRow = [];
      for (var c = 0; c < numCols; c++) {
        curRow.push(new GridCell(c, r));
      }
      this.grid.push(curRow);
    }
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
  getNeighbors(cell) {
    var neighbors = new Set();

    var s1 = this.getCell(cell.x, cell.y-1);
    var s2 = this.getCell(cell.x-1, cell.y);
    var s3 = this.getCell(cell.x+1, cell.y);
    var s4 = this.getCell(cell.x, cell.y+1);
    neighbors.add(s1);
    neighbors.add(s2);
    neighbors.add(s3);
    neighbors.add(s4);

    // Only consider diagonal neighbors that are not blocked on the straight sides
    if (s1 && s1.traversable && s2 && s2.traversable) {
      var d1 = this.getCell(cell.x-1, cell.y-1);
      neighbors.add(d1);
    }
    if (s1 && s1.traversable && s3 && s3.traversable) {
      var d2 = this.getCell(cell.x+1, cell.y-1);
      neighbors.add(d2);
    }
    if (s2 && s2.traversable && s4 && s4.traversable) {
      var d3 = this.getCell(cell.x-1, cell.y+1);
      neighbors.add(d3);
    }
    if (s3 && s3.traversable && s4 && s4.traversable) {
      var d4 = this.getCell(cell.x+1, cell.y+1);
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
    return this.grid[y][x];
  }

  /**
   * Reset the costs for all cells in the grid
   */
  resetCells() {
    for (var r = 0; r < this.numRows; r++) {
      for (var c = 0; c < this.numCols; c++) {
        var cell = this.grid[r][c];
        cell.gCost = 0;
        cell.fCost = 0;
      }
    }
  }

  /**
   * Draw the underlying grid for the A* path finding
   */
  drawGrid(g) {
    var cellSize = this.cellSize;
    for (var r = 0; r < this.numRows; r++) {
      for (var c = 0; c < this.numCols; c++) {
        var cell = this.getCell(c, r);
        if (cell.fCost != 0) {
          g.fillStyle = "rgba(0, 255, 255, 0.2)";
          g.fillRect(c*cellSize, r*cellSize, cellSize, cellSize);
        }

        if (!cell.traversable) {
          g.fillStyle = "rgba(0, 0, 0, 0.5)";
          g.fillRect(cell.x*cellSize, cell.y*cellSize, cellSize, cellSize);
        }
      }
    }
  }

  /**
   * Draw a given path along the grid
   */
  drawPath(g, path) {
    var cellSize = this.cellSize;
    for (var i = 0; i < path.length; i++) {
      if (i == 0) {
        g.fillStyle = "rgba(0, 255, 0, 0.5)";
      } else if (i == path.length-1) {
        g.fillStyle = "rgba(255, 0, 0, 0.5)";
      } else {
        g.fillStyle = "rgba(0, 255, 255, 0.4)";
      }
      var cell = path[i];
      g.fillRect(cell.x*cellSize, cell.y*cellSize, cellSize, cellSize);
    }
  }

  /**
   * Load the grid from a matrix
   *
   * Given a matrix of 1's and 0's, create a grid of cells
   * 1 = untraversable
   * 0 = traversable
   */
  static FromMatrix(matrix) {
    var numRows = matrix.length;
    var numCols = matrix[0].length;
    var g = [];
    for (var r = 0; r < numRows; r++) {
      var curRow = [];
      for (var c = 0; c < numCols; c++) {
        var traversable = (matrix[r][c] == 1) ? false : true;
        curRow.push(new GridCell(c, r, traversable));
      }
      g.push(curRow);
    }

    var grid = new Grid(numRows, numCols);
    grid.grid = g;
    return grid;
  }

  setCellSize(cellSize) { this.cellSize = cellSize; }
  getCellSize() { return this.cellSize; }
}
