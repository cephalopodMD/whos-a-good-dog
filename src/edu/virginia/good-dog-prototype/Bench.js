'use strict';

class Bench extends InteractSprite
{
	constructor(isRight)
	{
	    var id = 'Bench',
	        foldername = (isRight ? 'sprites/RightBench' : 'sprites/LeftBench');
	    super(id, foldername, 2, ['start', 'broken'], [1, 1], [false, false], [1.0, 1.0], [false, false], ["Benign", "Destroy"]); // Id, foldername, nPics, names, machine, poopables, suppressions, events
	    this.addAnimation('start', 0, 0);
	    this.addAnimation('broken', 1, 1);
	    this.animate('start');
	    this.play();

	    this.addEventListener(GoodDogPrototype.getInstance(), "Destroy");
	}
}