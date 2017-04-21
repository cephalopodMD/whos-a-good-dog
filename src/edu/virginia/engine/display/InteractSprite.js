"use strict";

class InteractSprite extends AnimatedSprite
{
	constructor(id, folder, nPics, names, machine, poopables, suppressions, hide, events)
	{
		super(id, folder, nPics);
		this.interactBox = new DisplayObject("interact", "sprites/blue_box.gif");
		this.interactBox.setAlpha(0.35);
    this.interactBox.interactableObject = this;

		// this.addChild(this.interactBox);
    GoodDogPrototype.getInstance().addChild(this.interactBox);

    this.stateNames = names;
    this.stateMachine = machine;
    this.isPoopables = poopables;
    this.smellSuppressions = suppressions;
    this.hidePoop = hide;
    this.eventNames = events;
    this.hasPoop = false;
    this.currentState = 0;

    this.boxOffsetX = 0;
    this.boxOffsetY = 0;

    // Add event listener for interact events
    this.addEventListener(GoodDogPrototype.getInstance(), InteractEvent.INTERACT_EVENT);
	}

	update(keys, gamepads){
  	super.update(keys, gamepads)
	}

	isPoopable() { return (this.isPoopables[this.currentState] && !this.hasPoop); }

	hasPoop() { return this.hasPoop; }

	poopHidden() { return this.hidePoop[this.currentState]; }

	poopIn(p)
	{
		this.hasPoop = true;
		this.poop = p;
    this.dispatchEvent(new Event('Poop in box', this));
	}

	getInteractBox() { return this.interactBox; }

	moveInteractBox(x, y)
	{
		var old_x = this.interactBox.getPosition().getx();
		var old_y = this.interactBox.getPosition().gety();
		this.interactBox.setPosition((old_x + x), (old_y + y));

    this.boxOffsetX = x;
    this.boxOffsetY = y;
	}

	setInteractBoxScale(sx, sy)
	{
		var old_sx = this.interactBox.getScale().getx();
		var old_sy = this.interactBox.getScale().gety();
		this.interactBox.setScale((old_sx*sx), (old_sy*y));
	}

	interact()
	{
		if(this.stateMachine[this.currentState] != this.currentState)
		{
			this.currentState = this.stateMachine[this.currentState];
			this.animate(this.stateNames[this.currentState]);
			this.dispatchEvent(new Event(this.eventNames[this.currentState], this));
  		if(this.stateMachine[this.currentState] == this.currentState)
  		{
  				this.interactBox.setAlpha(0.0);
  		}
  		if(this.hasPoop)
  		{
  			if(this.hidePoop[this.currentState])
  				this.poop.hide();
  			else
  				this.poop.reveal();
  		}
		}
	}

  setPosition(x, y) {
    super.setPosition(x, y);
    if (this.interactBox)
      this.interactBox.setPosition(x + this.boxOffsetX, y + this.boxOffsetY);
  }

  setScale(x, y) {
    super.setScale(x, y);
    if (this.interactBox)
      this.interactBox.setScale(x, y);
  }

	/**
 	* Draws this image to the screen
 	*/
	draw(g){
 	 super.draw(g);
	}
}
