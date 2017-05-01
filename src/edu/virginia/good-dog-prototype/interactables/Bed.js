'use strict';

class Bed extends InteractSprite
{
	constructor(isRight)
	{
	    var id = 'Bed',
	        foldername = 'sprites/Bed';
	    super(id, foldername, 2, ['start', 'broken'], // Id, folder name, nPics, names
	    [1, 1], [1, 1], [0, 0], // 3 different state machines
	    [false, false], [1.0, 1.0], [false, false], ["Benign", "Destroy"], 
	    [false, true], [1000, 500], [["next"], ["mad"]]); // Id, foldername, nPics, names, machine, poopables, suppressions, events
	    this.addAnimation('start', 0, 0);
	    this.addAnimation('broken', 1, 1);
	    this.animate('start');
	    this.play();

	    this.addEventListener(GoodDogPrototype.getInstance(), "Destroy");
	}

	playSoundEffect() {
		if (this.currAnimation == 'broken') {
			GoodDogPrototype.soundManager.playSoundEffect('paper_rip');
		}
	}
}