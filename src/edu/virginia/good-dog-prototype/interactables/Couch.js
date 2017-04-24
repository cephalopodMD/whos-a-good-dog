'use strict';

class Couch extends InteractSprite
{
	constructor(direction)
	{
	    var id = 'Couch',
	        foldername = ((direction > 1) ? 'sprites/Couch' : 'sprites/TurnedCouch');
      // Id, foldername, nPics, names, machine, poopables, suppressions, events
	    super(id, foldername, 2,
        ['start', 'open'],
        [1, 0], [1, 0], [0, 0],
        [false, true],
        [0.5, 1.0],
        [true, false],
        ["Benign", "Benign"],
        [false, false], [3000, 4000], [["next"], ["next"]]);
	    this.addAnimation('start', 0, 0);
	    this.addAnimation('open', 1, 1);
	    this.animate('start');
	    this.play();
	    if(direction > 1)
	    	this.movePoopLocation(35, 50);
	    else
	    	this.movePoopLocation(34, 85);

	    this.addEventListener(GoodDogPrototype.getInstance(), "Poop in couch");
	}

	poopIn(p)
	{
		this.hasPoop = true;
		this.poop = p;
		this.stateMachine = this.poopStateMachine;
    	this.dispatchEvent(new Event('Poop in couch', this));
	}
}
