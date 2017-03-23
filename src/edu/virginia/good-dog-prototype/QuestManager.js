"use strict";

class QuestManager extends IEventListener {

  constructor() {
    super();
    this.quests = {}
    this.addQuest(PickedUpEvent.COIN_PICKED_UP);
  }

  handleEvent(e) {
    this.quests[e.eventType] = true;
  }

  getQuestStatus(name) {
    return this.quests[name];
  }
  addQuest(name) {
    this.quests[name] = false;
  }

}
