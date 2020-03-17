# Some Basics

I'm making a big ol' state machine.

In order to render anything, I need sprites<PIXI.Sprite>, and
use a renderer<PIXI.Renderer> to render a stage -- with all
sprites added at an earlier point to the stage.

I'm trying to use React as the state-management library.

Sprites that need animation:
- waves(4): onTick
- char(acter): onTick, onHover, onClick
- sky (lightning): onTick, onClick

Sprites need to be a reaction to state-change, and returned
from the called hook? No, sprite hooks will get stage and add
themselves to it synchronously.

## Steps
1. initialize app
2. setup viewport scaling
3. setup mouse events???????????
4. setup Pixi.js [renderer, stage]
5. setup skytning
    1. load sky.png ✅
    2. load spritesheet_lightning.json ✅
    3. create lightning sprites (total of 3)
    4. create lightning state
        - isLightningStriking
        - onClickDelay
    5. bind mouse click to lightning strike
        1. pick random lightning
        2. randomize x position
        3. show flash and lightning
        4. wait until isLightningStriking is false
        5. remove lightning
6. setup waves
    1. load spritesheet_waves.json
    2. create wave data state (total of 4)
    3. create wave sprites (for each wave data state)
        - apply texture based on index
    4. bind ticker event to wave data state
    5. add wave sprites to stage
7. setup character
    1. load spritesheet_char.json
    2. setup character data
        1. load character data states (default, hover)
        2. bind mouse events to char data state
        3. bind mouse click to setWatching (show video)
    3. create character sprite
    4. setup character eyes data
        1. load eye data states (eyeLeftPos, eyeRightPos)
        2. bind mouse events to eye data state
            - remember to add onClick delay
        3. bind ticker event to eye data state
            - remember to account for onClick delay
    5. create character eyes sprite
    6. add eyes sprite to character sprite
    7. add character sprite to stage
8. setup frame
    1. load frame.png
    2. create frame sprite
    3. add frame sprite to stage
