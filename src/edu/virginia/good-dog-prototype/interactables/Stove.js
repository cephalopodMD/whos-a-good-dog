'use strict';

class Stove extends InteractSprite
{
	constructor(isRight)
	{
	    var id = 'Stove',
	        foldername = 'sprites/Stove';
	    super(id, foldername, 3, ['start', 'broken', 'burn'], [1, 0, 0], [2, 0, 2], [false, true, false], [1.0, 1.0, 1.6], [true, false, true], ["Benign", "Open", "Burn"]); // Id, foldername, nPics, names, machine, poopables, suppressions, events
	    this.addAnimation('start', 0, 0);
	    this.addAnimation('broken', 1, 1);
	    this.addAnimation('burn', 2, 2);
	    this.animate('start');
	    this.play();
	    this.movePoopLocation(57, 48);

	    this.addEventListener(GoodDogPrototype.getInstance(), "Burn");
	    this.addEventListener(GoodDogPrototype.getInstance(), "Poop in stove");
	}

	poopIn(p)
	{
		this.hasPoop = true;
		this.poop = p;
		this.stateMachine = this.poopStateMachine;
    	this.dispatchEvent(new Event('Poop in stove', this));
	}
}