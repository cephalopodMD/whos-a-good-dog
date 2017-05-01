"use strict";

/**
 * Class to display achievements
 */
class Achievement extends DisplayObject {

	constructor(id, filename, title, description) {
		super(id, filename);
		this.title = title;
		this.description = description;
		this.bgColor = "#ffffff";
		this.fontColor = "#222222";
		this.soundEffect = "yay";

		this.height = 72;
		this.width = 75*6;
		this.isComplete = false;

		// Position achievement at bottom of screen
		var game = GoodDogPrototype.getInstance();
		this.targetY = game.height - this.height - 8;
		this.startY = game.height;
		var startX = (game.width - this.width) / 2;
		this.setPosition(startX, this.startY);

		// Duration for achievement reveal
		this.revealDuration = 400;
		this.showDuration = 1000;
		this.hideDuration = 500;
	}

	/**
	 * Draws render image and tile/description
	 */
	draw(g) {
		this.applyTransformations(g);
		if (this.displayImage && this.visible) {
			// Draw the background box
			g.fillStyle = this.bgColor;
			g.fillRect(0, 0, this.width, this.height);
			g.fillStyle = 'rgba(0, 0, 0, 0.1)';
			g.fillRect(0, 0, this.height, this.height);

			// Draw the image for the achievement
			if (this.loaded) g.drawImage(this.displayImage, 0, 0, this.height, this.height);

			// Render the title
			var textOffset = this.height + 8;
			g.fillStyle = this.fontColor;
			g.font = '16px "Press Start 2P"';
			g.fillText(this.title, textOffset, 32);

			// Render the description
			g.font = '10px "Press Start 2P"';
			g.fillText(this.description, textOffset, this.height-16);
		}
		this.reverseTransformations(g);
	}

	/**
	 * Reveals the achievement for a set duration before hiding it
	 * Duration controlled by:
	 * - revealDuration
	 * - showDuration
	 * - hideDuration
	 */
	show() {
		this.visible = true;
		this.alpha = 1.0;

		// Play sound effect
		GoodDogPrototype.soundManager.playSoundEffect(this.soundEffect);

		// Start reveal animation
		var revealTween = new Tween(this, TweenTransitions.quadout);
		revealTween.animate(TweenableParams.Y, this.startY, this.targetY, this.revealDuration);
		TweenJuggler.add(revealTween);

		// Queue up hide animation
		var hideTween = new Tween(this, TweenTransitions.quadin);
		hideTween.animate(TweenableParams.ALPHA, 1, 0, this.hideDuration);
		hideTween.animate(TweenableParams.Y, this.targetY, this.startY, this.hideDuration)
		var hideCallback = function(tween) {
			TweenJuggler.add(tween);
		};
		// Hide achievement after showing it for the full duration
		setTimeout(hideCallback, this.revealDuration + this.showDuration, hideTween);
	}

	getUnscaledHeight() {
		return this.height;
	}
	getUnscaledWidth() {
		return this.width;
	}

	getIsComplete() {
		return this.isComplete;
	}

	// Methods to override
	updateStatus() {
		// Extend this in subclasses to update achievement status
	}
}