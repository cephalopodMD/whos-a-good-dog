"use strict";

class SoundManager {
  constructor() {
    this.soundEffects = {};
    this.music = {};
  }

  LoadSoundEffect(id, filename) {
    var audio = new Audio('resources/' + filename);
    this.soundEffects[id] = audio
  }

  PlaySoundEffect(id) {
    this.soundEffects[id].play();
  }

  LoadMusic(id, filename, loop) {
    var audio = new Audio('resources/' + filename);
    this.music[id] = audio
  }

  PlayMusic(id, loop=true) {
    this.music[id].loop = loop;
    this.music[id].play();
  }

}
