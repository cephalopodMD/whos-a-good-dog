"use strict";

class InteractSprite extends Sprite
{
	constructor(id, filename, interacted_filename)
	{
		super(id, filename);
		this.interactBox = new DisplayObject("interact", "sprites/blue_box.gif");
		this.interactBox.setAlpha(0.35);

		// this.addChild(this.interactBox);
    GoodDogPrototype.getInstance().addChild(this.interactBox);
		this.new_img = interacted_filename;

    this.boxOffsetX = 0;
    this.boxOffsetY = 0;

    // Add event listener for interact events
    this.addEventListener(GoodDogPrototype.getInstance(), InteractEvent.INTERACT_EVENT);
	}

  	update(keys, gamepads){
    	super.update(keys, gamepads)
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
  		this.loadImage(this.new_img);
      this.dispatchEvent(new InteractEvent(this));
  	}

    setPosition(x, y) {
      super.setPosition(x, y);
      this.interactBox.setPosition(x + this.boxOffsetX, y + this.boxOffsetY);
    }

    setScale(x, y) {
      super.setScale(x, y);
      this.interactBox.setScale(x, y);
    }

  	/**
   	* Draws this image to the screen
   	*/
  	draw(g){
   	 super.draw(g);
  	}
}