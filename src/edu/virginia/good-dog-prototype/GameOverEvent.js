'use strict';

class GameOverEvent extends Event {
	constructor(game) {
		super(GameOverEvent.GAME_OVER, game);
	}
}

GameOverEvent.GAME_OVER = 'game over';