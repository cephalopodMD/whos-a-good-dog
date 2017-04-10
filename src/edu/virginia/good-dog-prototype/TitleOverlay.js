'use strict';

/**
 * Simple class to display title overlay over screen
 */
class TitleOverlay extends DisplayObject {

	constructor(id, title, subtitle, width, height, backgroundColor=undefined, textColor=undefined) {
		super(id, undefined);

		this.title = title;
		this.subtitle = subtitle;
		this.width = width;
		this.height = height;
		this.backgroundColor = backgroundColor || 'rgba(0, 0, 0, 0.8)';
		this.textColor = textColor || '#ffffff';
	}

	/**
	 * Override the draw function to draw the title and subtitle
	 */
	draw(g) {
		this.applyTransformations(g);

		// Save current canvas state
		g.save();

		// Fill in the background
		g.fillStyle = this.backgroundColor;
		g.fillRect(0, 0, this.width, this.height);

		// Draw the title
		g.fillStyle = this.textColor;
		g.font = '40px "Press Start 2P"';
		var titleText = g.measureText(this.title);
		g.fillText(this.title, (this.width - titleText.width)/2, (this.height-100)/2);

		// Draw the subtitle
		g.font = '28px "Press Start 2P"';
		var subtitleText = g.measureText(this.subtitle);
		g.fillText(this.subtitle, (this.width - subtitleText.width)/2, (this.height+40)/2);

		// Restore canvas properties
		g.restore();

		this.reverseTransformations(g);
	}

	/**
	 * Add a tween to fade out the title overlay
	 */
	fadeOut(duration) {
		var fadeOutTween = new Tween(this, TweenTransitions.quadin);
		fadeOutTween.animate(TweenableParams.ALPHA, 1, 0, duration);
		TweenJuggler.add(fadeOutTween);
	}
}