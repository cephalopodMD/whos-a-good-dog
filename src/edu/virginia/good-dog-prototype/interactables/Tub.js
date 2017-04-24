'use strict';

class Tub extends InteractSprite
{
	constructor(x=0, y=0)
	{
	    var id = 'Tub',
	        foldername = 'sprites/Tub';
      // Id, foldername, nPics, names, machine, poopables, suppressions, events
	    super(id, foldername, 2,
        ['start', 'full'],
        [1, 0],
        [1, 0],
        [1, 0],
        [true, false],
        [1.0, 0.3],
        [false, true],
        ["Benign", "Benign"],
        [false, false], [1000, 4000], [["again", "next"], ["next"]]);
	    this.addAnimation('start', 0, 0);
	    this.addAnimation('full', 1, 1);
	    this.animate('start');
	    this.play();
	    this.movePoopLocation(20, 48);

	    this.addEventListener(GoodDogPrototype.getInstance(), "Poop in tub");
	}

	poopIn(p)
	{
		this.hasPoop = true;
		this.poop = p;
		this.stateMachine = this.poopStateMachine;
    	this.dispatchEvent(new Event('Poop in tub', this));
	}
}
