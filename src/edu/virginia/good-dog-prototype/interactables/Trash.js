'use strict';

class Trash extends InteractSprite
{
	constructor(direction)
	{
	    var id = 'Trash',
	        foldername = 'sprites/Trash';
      // Id, foldername, nPics, names, machine, poopables, suppressions, events
	    super(id, foldername, 1,
        ['start'],
        [0], [0], [0],
        [true],
        [0.3],
        [false],
        ["Benign"],
        [false], [1000], [["next"]]);
	    this.addAnimation('start', 0, 0);
	    this.animate('start');
	    this.play();
	    	this.movePoopLocation(10, 10);

	    this.addEventListener(GoodDogPrototype.getInstance(), "Poop in trash");
	}

	poopIn(p)
	{
		this.hasPoop = true;
		this.poop = p;
		this.stateMachine = this.poopStateMachine;
    	this.dispatchEvent(new Event('Poop in trash', this));
	}
}