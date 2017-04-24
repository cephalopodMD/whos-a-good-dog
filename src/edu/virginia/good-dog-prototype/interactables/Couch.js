'use strict';

class Couch extends InteractSprite
{
	constructor(x=0, y=0)
	{
	    var id = 'Couch',
	        foldername = 'sprites/Couch';
      // Id, foldername, nPics, names, machine, poopables, suppressions, events
	    super(id, foldername, 2,
        ['start', 'open'],
        [1, 0],
        [1, 0],
        [false, true],
        [0.5, 1.0],
        [true, false],
        ["Benign", "Benign"]);
	    this.addAnimation('start', 0, 0);
	    this.addAnimation('open', 1, 1);
	    this.animate('start');
	    this.play();
	    this.movePoopLocation(35, 50);

	    this.addEventListener(GoodDogPrototype.getInstance(), "Poop in box");
	}
}
