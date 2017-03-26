"use strict";

/**
 * A very basic Sprite. For now, does not do anything.
 *
 * */
class AnimatedSprite extends Sprite{

	constructor(id, foldername, frames){
    if (foldername.slice(-1) != '/')
      foldername = foldername + '/';
		super(id, foldername + 0 + '.png');
    if (debug)
      console.log(foldername + 0 + '.png')
		this.frames = new ArrayList();
		this.frames.add(this.displayImage);
    for (let i=1; i<=frames; i++)
      this.frames.add(new Image());
		var i = 0,
				loading = true,
				t = this;
		for (i=1; i <= frames; i++) {
      /*
			t.frames.get(i).onload = function() {
        t.frames.contents[this.title] = this;
      }
      */
      t.frames.get(i).title = i;
			t.frames.get(i).src = 'resources/' + foldername + i + '.png';
      if (debug)
        console.log('resources/' + foldername + i + '.png')
		}
    loading = false;

		this.currFrame = 0;
		this.startIndex = 0;
		this.endIndex = this.frames.size() - 1;
		this.animations = {'full':{'startIndex':0, 'endIndex':this.endIndex}};
    this.currAnimation = 'full'
		this.playing = true;
		this.fps = 4.0;
		this.clock = new GameClock();
	}

	addAnimation(name, start, end){
		this.animations[name] = {'startIndex':start, 'endIndex':end};
	}
	animate(name){
    if (name == this.currAnimation)
      return;
    this.currAnimation = name;
		this.startIndex = this.animations[name].startIndex;
		this.endIndex = this.animations[name].endIndex;
		this.currFrame = this.startIndex;
		this.setDisplayImage(this.frames.itemAt(this.currFrame));

	}

	pause() {
		this.playing = false;
	}
	play() {
		this.playing = true;
	}

	setSpeed(speed){this.fps = speed;}
  getSpeed(speed){return this.fps;}

	/**
	 * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
	 */
	update(pressedKeys, gamepads){
    super.update(pressedKeys, gamepads);
		if(this.playing && this.clock.getElapsedTime() > (1000.0 / this.getSpeed())) {
			this.clock.resetGameClock();
			this.currFrame += 1;
			if(this.currFrame > this.endIndex) this.currFrame = this.startIndex;
			this.setDisplayImage(this.frames.itemAt(this.currFrame));
		}
	}

	/**
	 * Draws this image to the screen
	 */
	draw(g){
		super.draw(g);
	}
}
