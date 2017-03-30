"use strict";

/**
 * Basic heap for priority queue implementation
 */
class Heap {

	constructor(compare = undefined) {
		// Init heap as array with first elem to store size
		this.heap = [0];
		this.compare = compare || this.defaultCompare;
	}

	/**
	 * Default comparison method
	 */
	defaultCompare(lhs, rhs) {
		return lhs < rhs;
	}

	/**
	 * Return the size of the heap
	 */
	size() {
		return this.heap[0];
	}

	/**
	 * Add an item to the heap
	 */
	add(item) {
		// Alias for shorter code
		var heap = this.heap;

		// Add item to end of array
		heap[heap[0]+1] = item;

		// Update the size
		heap[0] += 1;

		// Percolate up to maintain heap property
		this._percolateUp(heap[0]);
	}

	decreaseKey(item, val) {
		// Find the corresponding item in the heap
		for (var idx = 1; idx <= this.heap[0]; idx++) {
			if (this.heap[idx] == item) {
				break;
			}
		}

		// Update the item's value and percolate
		this.heap[idx] = val;
		this._percolateUp(idx);
	}

	_percolateUp(idx) {
		// Continue while not at the root and child < parent
		while (idx > 1 && this.compare(this.heap[idx],this.heap[idx >> 1])) {
			// Swap current node with parent
			this.swap(idx, idx >> 1);

			// Percolate up the parent
			idx = idx >> 1;
		}
	}

	/**
	 * Show the first item in the heap
	 */
	peek() {
		if (this.heap[0] == 0) {
			return undefined;
		}
		return this.heap[1];
	}

	/**
	 * Remove the first item in the heap
	 */
	remove() {
		// Alias for shorter code
		var heap = this.heap;

		// Return undefined if heap is empty
		if (!heap[0]) {
			return undefined;
		}

		// Swap first and last item in heap
		this.swap(1, heap[0]);

		// Update the size
		heap[0] -= 1;

		// Percolate down until heap property holds
		var idx = 1;
		var size = heap[0];
		while (idx << 1 <= size) {
			var lhsIdx = idx << 1;
			var rhsIdx = lhsIdx + 1;

			// Set the minIdx to the smallest child
			var minIdx = lhsIdx;
			if (rhsIdx <= size && this.compare(heap[rhsIdx], heap[lhsIdx])) {
				minIdx = rhsIdx;
			}

			// Swap node with smallest child if needed
			if (this.compare(heap[minIdx], heap[idx])) {
				this.swap(minIdx, idx);
				idx = minIdx;
			} else {
				// Not needed, so done percolating
				break;
			}
		}
		return heap[size+1];
	}

	/**
	 * Swap items at indices ai and bi
	 */
	swap(ai, bi) {
		var temp = this.heap[ai];
		this.heap[ai] = this.heap[bi];
		this.heap[bi] = temp;
	}
}

// DEBUG: TEst code for heap
/*
var h = new Heap(function(lhs, rhs) { return lhs > rhs;});
for (var i = 7; i > 0; i--) {
	h.add(i);
}
console.log(h);
var output = [];
for (var i = 0; i < 3; i++) {
	output.push(h.remove());
}
console.log(output);
*/