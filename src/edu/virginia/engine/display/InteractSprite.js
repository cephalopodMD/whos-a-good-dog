"use strict";

class InteractSprite extends Sprite
{
	constructor(id, filename, interacted_filename)
	{
		super(id, filename);
		this.interactBox = new DisplayObject("interact", "sprites/blue_box.gif");
		this.interactBox.setAlpha(0.35);
		this.interactBox.setScale(this.getUnscaledWidth()/this.interactBox.getUnscaledWidth(), this.getUnscaledHeight()/this.interactBox.getUnscaledWidth());
		this.addChild(this.interactBox);
		this.new_img = interacted_filename;
	}

  	update(keys, gamepads){
    	super.update(keys, gamepads)
  	}

  	getInteractBox() { return interactBox; }

  	moveInteractBox(x, y)
  	{
  		var old_x = this.interactBox.getPosition().getx();
  		var old_y = this.interactBox.getPosition().gety();
  		this.interactBox.setPosition((old_x + x), (old_y + y));
  	}

  	setInteractBoxScale(sx, sy)
  	{
  		var old_sx = this.interactBox.getScale().getx();
  		var old_sy = this.interactBox.getScale().gety();
  		this.interactBox.setScale((old_sx*sx), (old_sy*y));
  	}

  	interact(intType)
  	{
  		this.loadImage(this.new_img);
  	}

  	/**
   	* Draws this image to the screen
   	*/
  	draw(g){
   	 super.draw(g);
  	}
}