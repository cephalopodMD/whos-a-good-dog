'use strict';

class Bed extends InteractSprite
{
	constructor(isRight)
	{
	    var id = 'Bed',
	        foldername = 'sprites/Bed';
	    super(id, foldername, 2, ['start', 'broken'], [1, 1], [1, 1], [false, false], [1.0, 1.0], [false, false], ["Benign", "Destroy"]); // Id, foldername, nPics, names, machine, poopables, suppressions, events
	    this.addAnimation('start', 0, 0);
	    this.addAnimation('broken', 1, 1);
	    this.animate('start');
	    this.play();

	    this.addEventListener(GoodDogPrototype.getInstance(), "Destroy");
	}
}