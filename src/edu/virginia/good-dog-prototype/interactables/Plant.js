'use strict';

class Plant extends InteractSprite
{
	constructor(x=0, y=0)
	{
	    var id = 'Plant',
	        foldername = 'sprites/Plant';
	    super(id, foldername, 2, ['start', 'broken'], [1, 1], [1, 1], [0, 1], [false, true], [1.0, 1.0], [false, false], ["Benign", "Destroy"], [false, true], [500, 500], [["next"], ["mad"]]); // Id, foldername, nPics, names, machine, poopables, suppressions, events
	    this.addAnimation('start', 0, 0);
	    this.addAnimation('broken', 1, 1);
	    this.animate('start');
	    this.play();

	    this.addEventListener(GoodDogPrototype.getInstance(), "Destroy");
	}

	interact() {
		super.interact();

		if (this.currAnimation == 'broken') {
			GoodDogPrototype.soundManager.playSoundEffect('paper_rip');
			GoodDogPrototype.soundManager.playSoundEffect('paper_rip');
		}
	}
}