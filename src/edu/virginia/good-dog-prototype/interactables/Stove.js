'use strict';

class Stove extends InteractSprite
{
	constructor(isRight)
	{
	    var id = 'Stove',
	        foldername = 'sprites/Stove';
	    super(id, foldername, 3, ['start', 'broken', 'burn'],
	    [1, 0, 0], [2, 0, 2],[0, 0, 0],
	    [false, true, false], [0.5, 1.0, 1.6], [true, false, true], ["Benign", "Open", "Burn"], 
	    [false, false, false], [1000, 1000, 1000], [["again", "next"], ["again", "again", "next"], ["next"]]); // Id, foldername, nPics, names, machine, poopables, suppressions, events
	    this.addAnimation('start', 0, 0);
	    this.addAnimation('broken', 1, 1);
	    this.addAnimation('burn', 2, 2);
	    this.animate('start');
	    this.play();
	    this.movePoopLocation(57, 48);

	    this.addEventListener(GoodDogPrototype.getInstance(), "Burn");
	    this.addEventListener(AchievementManager.getInstance(), "Burn");
	    this.addEventListener(GoodDogPrototype.getInstance(), "Poop in stove");
	}

	poopIn(p)
	{
		this.hasPoop = true;
		this.poop = p;
		this.stateMachine = this.poopStateMachine;
    	this.dispatchEvent(new Event('Poop in stove', this));
	}

	playSoundEffect() {
		if (this.currAnimation == 'start' || this.currAnimation == 'broken') {
			GoodDogPrototype.soundManager.playSoundEffect('stove_open_close');
		} else if (this.currAnimation == 'burn') {
			GoodDogPrototype.soundManager.playSoundEffect('stove_burner');
		}
	}
}
