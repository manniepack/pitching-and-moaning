//
// [globalState]:
//
//   -> deviceViewport (Step 1)
//     -> scaledCanvasRectangle
//     -> windowSize
//     -> deviceResolution
//   -> pixi (Steps 2, 3, 4)
//     -> application
//       -> renderer
//       -> stage
//       -> ticker
//       -> assetLoader
//       -> interactionManager
//     -> state
//       -> haveAssetsLoaded
//       -> hasAnimationLoaded
//   -> animation (Steps 3, 4)
//     -> sprites: [initialState]
//     -> isLightningStriking (filter sprites for color change)
//

//
// STEP 1
//
// Setup adaptiveScale
// Setup resolution
//

//
// STEP 2
//
// Setup Pixi.js renderer
// Setup Pixi.js stage
//

//
// STEP 3
//
// Setup Pixi.js sprites
//   -> Use [globalState] for:
//     -> position
//     -> transforms
//     -> filtering on lightning strike
// Add Pixi.js sprites to stage
//

//
// STEP 4
//
// Bind animation [interactions]
// Connect interactions to [globalState]
//
// INTERACTIONS
//
// [hitTest/pointer]:
//   -> renderer/canvas?
//     -> character eye-tracking
//     -> parallax
//   -> char?
//     -> animate head
//     -> show video
//   -> sky?
//     -> strike lightning
//       -> pick lightning randomly
//       -> set globalState.animation.isLightningStriking to true
//       -> show randomly picked lightning
//       -> hide lightning and set isLightningStriking to false after delay
//
// [gyroscope] interactions:
//   -> character eye-tracking
//   -> parallax
//

//
// STEP 5
//
// Bind resize update to
//   -> adaptive-scale
//   -> resolution
// for
//   -> renderer (size)
//   -> stage (position, size)
//
