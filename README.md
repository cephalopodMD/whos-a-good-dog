# Who's a Good Dog

## Beta

### Gameplay

**Overview**

The goal of *Who's a Good Dog* is to destroy as much of your owner's house as possible without getting caught. To cause financial damage, the player can poop and interact with various objects in each level. Some objects can be destroyed, giving the player points immediately, while others may be used in various ways to hide the poop from the owner or to amplify the damage caused by the poop.

**Controls**

- Arrow keys - move
- Q/Z - poop
- W/X - interact

**Interactions**

The user can interact with any object which has a gray square in front of it. The effect of the interaction varies based on the object, varying from ripping up a bed to burning poop in a stove. The player should explore how different interactions help them succeed in destroying the house.

### Other Misc. Progress

- Levels
	- Player must destroy a certain amount of value in items in the house to advance to the next level
	- Game will load all info for the next game automatically
	- Levels now include full sprites and design, with implementation.
- Poop Smell Radius
	- Poop now has an expanding radius around it that grows with time.
	- Poop smells are now masked or increased by the objects holding them.
	- Poop can be hidden by different objects.
- Object Interactions
	- Various types of object interactions
	- Object interactions now operate as finite state automata in order to increase the possible functionality.
	- The owner routes around the room and interacts with different objects.
- Extras
	- Start, pause, loss, and win screens
