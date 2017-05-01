'use strict';

class Sink extends InteractSprite
{
	constructor(x=0, y=0)
	{
	    var id = 'Sink',
	        foldername = 'sprites/Sink';
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
        [false, false], [500, 2000], [["again", "next"], ["next"]],
        ["Green", "Yellow"], ["Green", "Yellow"]);
	    this.addAnimation('start', 0, 0);
	    this.addAnimation('full', 1, 1);
	    this.animate('start');
	    this.play();
	    this.movePoopLocation(79, 9);

	    this.addEventListener(GoodDogPrototype.getInstance(), "Poop in sink");
	}

	poopIn(p)
	{
		this.hasPoop = true;
		this.poop = p;
		this.stateMachine = this.poopStateMachine;
    	this.dispatchEvent(new Event('Poop in sink', this));
	}

	playSoundEffect() {
		GoodDogPrototype.soundManager.playSoundEffect('sink');
	}
}
