"use strict";

class SoundManager {
  constructor() {
    this.soundEffects = {};
    this.music = {};
  }

  loadSoundEffect(id, filename) {
    var audio = new Audio('resources/' + filename);
    this.soundEffects[id] = audio
  }

  playSoundEffect(id) {
    this.soundEffects[id].play();
  }

  loadMusic(id, filename, loop) {
    var audio = new Audio('resources/' + filename);
    this.music[id] = audio
  }

  playMusic(id, loop=true) {
    this.music[id].loop = loop;
    this.music[id].play();
  }

}
