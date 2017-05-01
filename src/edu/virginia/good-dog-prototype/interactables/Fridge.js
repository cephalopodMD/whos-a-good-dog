'use strict';

class Fridge extends InteractSprite
{
	constructor(isRight)
	{
	    var id = 'Fridge',
	        foldername = 'sprites/Fridge';
	    super(id, foldername, 2, ['start', 'open'], // Id, folder name, nPics, names
	    [1, 0], [1, 0], [1, 0], // 3 different state machines
	    [false, true], [0.1, 1.0], [true, true], ["Benign", "Benign"], 
	    [false, false], [1000, 500], [["again", "next"], ["next"]]); // Id, foldername, nPics, names, machine, poopables, suppressions, events
	    this.addAnimation('start', 0, 0);
	    this.addAnimation('open', 1, 1);
	    this.animate('start');
	    this.play();
	    this.height = 0;

	    this.addEventListener(GoodDogPrototype.getInstance(), "Poop in fridge");
	}

	interact()
	{
		this.height = this.getUnscaledHeight();
		super.interact();
	}

	interactOwner()
	{
		this.height = this.getUnscaledHeight();
		super.interactOwner();
	}

	poopIn(p)
	{
		this.hasPoop = true;
		this.poop = p;
		this.poop.hide();
		this.stateMachine = this.poopStateMachine;
    	this.dispatchEvent(new Event('Poop in fridge', this));
	}

	getUnscaledHeight()
	{
		if(this.height == 0)
			return super.getUnscaledHeight();
		else
			return this.height;
	}

	playSoundEffect() {
		GoodDogPrototype.soundManager.playSoundEffect('fridge');
	}
}
