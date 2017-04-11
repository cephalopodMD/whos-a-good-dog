# Who's a Good Dog

## Alpha

### Gameplay

**Overview**

The goal of *Who's a Good Dog* is to destroy as much of your owner's house as possible without getting caught. To cause financial damage, the player can poop and interact with various objects in each level (drawn in dark gray for now). Some objects can be destroyed, giving the player points immediately, while others may be used in various ways to hide the poop from the owner.

**Controls**

- Arrow keys - move
- Q/Z - poop
- W/X - interact

**Interactions**

Two basic types of interactions:
- Open/Close - object will turn yellow when open and grey when closed
- Destroy - object will turn red when destroyed
	- Note: Destroyed objects cannot be interacted with again


### Level Designs

Preliminary designs for alls levels are included in the `docs/` directory. All levels show the room structure and wall layout to control general flow/difficulty. Designs for the first two levels also detail the locations of interactable objects and the start/end positions of the dog and owner. This information was excluded from the final two levels since more information is needed to test our initial ideas about the spacing/frequency of InteractObjects (having people play test the alpha will hopefully get us this info). As the player advances through the game, the levels become smaller and smaller, making it more difficult to hide actions from the owner.