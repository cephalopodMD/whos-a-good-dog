'using strict'

class Room {
  constructor(x, y, w, h) {
    this.hitbox = new Box(x, y, w, h);
    this.game = Game.getInstance();
    this.contents = new ArrayList();
  }

  add(...contents) {
    for (let c in contents)
      this.contents.add(c)
  }
}
