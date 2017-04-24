'use strict';

class OpenableObject extends InteractSprite
{
	constructor(x=0, y=0)
	{
	    var id = 'OpenObject',
	        foldername = 'sprites/OpenObject';
      // Id, foldername, nPics, names, machine, poopables, suppressions, events
	    super(id, foldername, 2,
        ['start', 'open'],
        [1, 0],
        [1, 0],
        [1, 0],
        [false, true],
        [0.5, 1.0],
        [true, false],
        ["Benign", "Benign"],
        [false, false], [1000, 1000], [["next"], ["next"]]);
	    this.addAnimation('start', 0, 0);
	    this.addAnimation('open', 1, 1);
	    this.animate('start');
	    this.play();

	    this.addEventListener(GoodDogPrototype.getInstance(), "Poop in box");
	}

	interact() {
		// Perform normal interaction
		super.interact();

		// Play sound effect based on new animation
		if (this.currAnimation == 'open') {
			GoodDogPrototype.soundManager.playSoundEffect('open_door_1');
		} else if (this.currAnimation == 'start') {
			GoodDogPrototype.soundManager.playSoundEffect('close_door_1');
		}
	}
}
