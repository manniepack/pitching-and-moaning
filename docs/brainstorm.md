Alright David.

Time to make your •••••••••••••• website.

we need:

+ a character with
| + eyes that lookaround
|   + randomly
|     | between 1.15s to 2.33s
|     | with random(ish) easing functions
|   + at mouse movement, if any
|     | interupt random eye lookaround
|     | for 6.35s
| + an animation that
|   + is really just a texture switch
|     | with a delay 0.789s
|   + runs a callback at the end
|     | aka, after delay
+ a video player that
  + shows up
    | after character click animation is ran
  + loads video player
    | points to show's pilot episode
    | URL: ??? (the "review" version on Vimeo is un-embeddable)


mobx:
  animationStore :=> {
    sprites: {
      wave1Of4: {
        texture?: PIXI.Texture,
        position: {
          x: number,
          y: number,
        },
        rotation: number,
      },
      wave2Of4: {
        texture?: PIXI.Texture,
        position: {
          x: number,
          y: number,
        },
        rotation: number,
      },
      wave3Of4: {
        texture?: PIXI.Texture,
        position: {
          x: number,
          y: number,
        },
        rotation: number,
      },
      wave4Of4: {
        texture?: PIXI.Texture,
        position: {
          x: number,
          y: number,
        },
        rotation: number,
      },
    }
  }

react-hooks:
  useContext :=> AnimationContext(: animationStore)
  useRefs :=> sprites
