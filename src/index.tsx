
import 'sanitize.css';

import idx from 'idx';
import * as MobX from 'mobx';
import * as PIXI from 'pixi.js';
import * as AS from 'adaptive-scale';
import Player from '@vimeo/player';

// const IS_DEV = process.env.NODE_ENV === 'development';
const CANVAS_SIZE = [3200, 2320];
const SPRITE_ORIGIN = {
  eye: {
    left: {
      x: 1545.00,
      y: 1024.50,
    },
    right: {
      x: 1679.50,
      y: 1023.50,
    },
  },
  char: {
    default: {
      x: 1611.00,
      y: 1380.50,
    },
    hover: {
      x: 1611.00,
      y: 1339.50,
    },
  },
};



// Setup types //
//   -> pixi.js renderer, ticker, and stage
interface IGraphics {
  renderer: PIXI.Renderer,
  ticker: PIXI.Ticker,
  stage: PIXI.Container,
}

//   -> window width, height, and resolution
interface IViewport {
  width: number,
  height: number,
  resolution: number,
}

//   -> pointer x, y, and time last moved
type TTimedPointerPos = [number, number, number];
//   -> pointer x, y, last time clicked, and type
type TTimedPointerClick = [number, number, number, string];

// type TEyeData = {
//   x: number,
//   y: number,
//   width: number,
//   height: number,
//   center: {
//     x: number,
//     y: number,
//   }
// };



// Setup event state //
//   -> utility function to create pure-object viewport
function createViewport(): IViewport {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: window.devicePixelRatio,
  }
}

//   -> utility function to create pure-object pointerPos
function createPointerPos(event?: PointerEvent): TTimedPointerPos {
  if (!event)
    return [NaN, NaN, 0];
  return [event.x, event.y, Date.now()];
}

//   -> utility function to create pure-object pointerClick
function createPointerClick(event?: PointerEvent): TTimedPointerClick {
  if (!event)
    return [NaN, NaN, 0, ''];
  return [event.x, event.y, Date.now(), event.pointerType];
}

const viewport = MobX.observable(createViewport());
const pointerPos = MobX.observable<TTimedPointerPos>(createPointerPos());
const pointerClick = MobX.observable<TTimedPointerClick>(createPointerClick());

//   -> utility function to update viewport instance
//      this is useful to preserve MobX from being overwritten
//      by changing the whole instance to a plain-object
const updateViewport = MobX.action(() => {
  viewport.width = window.innerWidth;
  viewport.height = window.innerHeight;
  viewport.resolution = window.devicePixelRatio;
});

//   -> utility function to update mousePos instance
const updatePointerPos = MobX.action((event: PointerEvent) => {
  const pos = createPointerPos(event);
  pointerPos[0] = pos[0];
  pointerPos[1] = pos[1];
  pointerPos[2] = pos[2];
});

//   -> utility function to update pointerClick instance
const updatePointerClick = MobX.action((event: PointerEvent) => {
  const click = createPointerClick(event);
  pointerClick[0] = click[0];
  pointerClick[1] = click[1];
  pointerClick[2] = click[2];
  pointerClick[3] = click[3];
});

//   => (event) window resize -> (state) viewport
window.addEventListener('resize', updateViewport);
//   => (event) pointer move -> (state) pointerPos
window.addEventListener('pointermove', updatePointerPos);
//   => (event) pointer click -> (state) pointerClick
window.addEventListener('pointerdown', updatePointerClick);



// Setup Pixi.js //
const pixiApp: IGraphics = {
  renderer: PIXI.autoDetectRenderer({
    antialias: true,
    transparent: true,
    autoDensity: true,
  }),

  ticker: PIXI.Ticker.shared,
  stage: new PIXI.Container(),
};

//   -> utility function to update pixiApp dimensions
const updatePixiSize = (app: IGraphics) => {
  //   -> use adaptive-scale to scale viewport to fit design
  const canvasSize = AS.getScaledRect({
    container: new AS.Size(viewport.width, viewport.height),
    target: new AS.Size(CANVAS_SIZE[0], CANVAS_SIZE[1]),
    policy: AS.POLICY.ShowAll,
  });

  app.renderer.resize(viewport.width, viewport.height);
  app.renderer.resolution = viewport.resolution;
  app.stage.position.set(canvasSize.x,canvasSize.y);
  app.stage.width = canvasSize.width;
  app.stage.height = canvasSize.height;
};

//   -> stage stage every tick
PIXI.Ticker.system.add(() => {
  pixiApp.renderer.render(pixiApp.stage);
}, PIXI.UPDATE_PRIORITY.NORMAL);

//   => (event) viewport state change -> (resize) pixiApp
MobX.autorun(() => updatePixiSize(pixiApp));



// Setup DOM nodes //
const isLoading = MobX.observable.box(true);
const isWatching = MobX.observable.box(false);

//   -> get and clear root DOM node
const root = document.getElementById('root');
if (!root)
  throw new ReferenceError(`no root element found, script must be run in environment
see: https://github.com/manniepack/pitching-and-moaning`);
root.textContent = '';

//   -> create loader node (unparented)
const loader = document.createElement('section');
loader.textContent = `...pitching, and moaning...`;

//   -> create page node (unparented)
const page = document.createElement('section');

//   -> create video player (unparented)
const videoNode = document.createElement('section');
videoNode.style.cssText = `
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;
const videoPlayer = new Player(videoNode, {
  id: 394008834,
});

//   -> utility function to dismiss video player
const handleVideoClick = MobX.action((event: PointerEvent) => {
  videoPlayer.pause();
  isWatching.set(false);
});

//   => (event) isLoading, isWatching -> update page's children nodes
MobX.autorun(() => {
  page.textContent = '';

  //   -> parent loader element to page and skip the rest
  if (isLoading.get()) {
    page.appendChild(loader);
    return;
  }

  //   -> parent renderer/canvas element to page
  page.appendChild(pixiApp.renderer.view);

  //   -> parent video element to page
  if (isWatching.get())
    page.appendChild(videoNode);
});

//   => (event) isLoading change -> compute new page styles
MobX.autorun(() => {
  const loading = isLoading.get();
  const watching = isWatching.get();

  page.style.cssText = `
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: ${loading || watching ? 'black' : 'white'};
    color: ${loading || watching ? 'white' : 'black'};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.23s ease-in,
                background-color 0.23s ease-in;
  `;
});

//   -> (event) click -> hide video if clicked outside
videoNode.addEventListener('pointerdown', handleVideoClick);

//   -> parent page element to root node
root.appendChild(page);



// Build sprites //
const cosmicBackgroundRadiation = new PIXI.Sprite();
const sky = new PIXI.Sprite();
const lightning = [new PIXI.Sprite(), new PIXI.Sprite(), new PIXI.Sprite()];
const waves = [new PIXI.Sprite(), new PIXI.Sprite(), new PIXI.Sprite(), new PIXI.Sprite()];
const char_EyeSclera = new PIXI.Sprite();
const char_EyeRight_Origin = new PIXI.Sprite();
const char_EyeRight = new PIXI.Sprite();
const char_EyeLeft_Origin = new PIXI.Sprite();
const char_EyeLeft = new PIXI.Sprite();
const char = new PIXI.Sprite();
const frame = new PIXI.Sprite();

//   -> use shared asset manager from Pixi.js
//      to asynchronously add sprites to scene
//
//   -> the add function's first arguments are
//      keys which refer to texture on resources
PIXI.Loader.shared
  .add('frame', 'assets/hq/frame.png')
  .add('sky', 'assets/hq/sky.png')
  .add('lightning', 'assets/hq/spritesheet_lightning.json')
  .add('waves', 'assets/hq/spritesheet_waves.json')
  .add('char', 'assets/hq/spritesheet_char.json')
  .load(MobX.action((loader, resources) => {

    // TODO, sprite building callback //
    // I'd like to split this up in the future
    // for further clairty and separation of
    // concerns
  
    cosmicBackgroundRadiation.texture = PIXI.Texture.EMPTY;
    cosmicBackgroundRadiation.width = CANVAS_SIZE[0];
    cosmicBackgroundRadiation.height = CANVAS_SIZE[1];


    sky.texture = idx(resources, _ => _.sky.texture) || PIXI.Texture.WHITE;
    sky.anchor.set(0.5);
    sky.position.set(1599.50, 1148.50);

    lightning[0].texture = idx(resources, _ => _.lightning.textures['lightning1.png']) || PIXI.Texture.WHITE;
    lightning[0].anchor.set(0.5)
    lightning[0].position.set(sky.position.x - 1124.50, sky.position.y - 1276.50);

    lightning[1].texture = idx(resources, _ => _.lightning.textures['lightning2.png']) || PIXI.Texture.WHITE;
    lightning[1].anchor.set(0.5)
    lightning[1].position.set(sky.position.x - 1670.00, sky.position.y - 1249.00);

    lightning[2].texture = idx(resources, _ => _.lightning.textures['lightning3.png']) || PIXI.Texture.WHITE;
    lightning[2].anchor.set(0.5)
    lightning[2].position.set(sky.position.x - 2195.00, sky.position.y - 1229.50);

    sky.addChild(...lightning);


    waves[0].texture = idx(resources, _ => _.waves.textures['wave1.png']) || PIXI.Texture.WHITE;
    waves[0].anchor.set(0.5);
    waves[0].position.set(954.00, 1604.00);

    waves[1].texture = idx(resources, _ => _.waves.textures['wave2.png']) || PIXI.Texture.WHITE;
    waves[1].anchor.set(0.5);
    waves[1].position.set(1686.50, 1545.50);

    waves[2].texture = idx(resources, _ => _.waves.textures['wave3.png']) || PIXI.Texture.WHITE;
    waves[2].anchor.set(0.5);
    waves[2].position.set(823.50, 1253.50);

    waves[3].texture = idx(resources, _ => _.waves.textures['wave4.png']) || PIXI.Texture.WHITE;
    waves[3].anchor.set(0.5);
    waves[3].position.set(2444.50, 1386.50);


    char_EyeSclera.texture = PIXI.Texture.WHITE;
    char_EyeSclera.width = 221;
    char_EyeSclera.height = 79;
    char_EyeSclera.anchor.set(0.5);
    char_EyeSclera.position.set(1610.50, 1023.50);

    char_EyeLeft_Origin.texture = PIXI.Texture.EMPTY;
    char_EyeLeft_Origin.anchor.set(0.5);
    char_EyeLeft_Origin.position.set(SPRITE_ORIGIN.eye.left.x, SPRITE_ORIGIN.eye.left.y);

    char_EyeLeft.texture = idx(resources, _ => _.char.textures['eye_left.png']) || PIXI.Texture.WHITE;
    char_EyeLeft.anchor.set(0.5);
    char_EyeLeft.position.set(SPRITE_ORIGIN.eye.left.x, SPRITE_ORIGIN.eye.left.y);

    char_EyeRight_Origin.texture = PIXI.Texture.EMPTY;
    char_EyeRight_Origin.anchor.set(0.5);
    char_EyeRight_Origin.position.set(SPRITE_ORIGIN.eye.right.x, SPRITE_ORIGIN.eye.right.y);

    char_EyeRight.texture = idx(resources, _ => _.char.textures['eye_right.png']) || PIXI.Texture.WHITE;
    char_EyeRight.anchor.set(0.5);
    char_EyeRight.position.set(SPRITE_ORIGIN.eye.right.x, SPRITE_ORIGIN.eye.right.y);

    char.texture = idx(resources, _ => _.char.textures['char.png']) || PIXI.Texture.WHITE;
    char.anchor.set(0.5);
    char.position.set(SPRITE_ORIGIN.char.default.x, SPRITE_ORIGIN.char.default.y);


    frame.texture = idx(resources, _ => _.frame.texture) || PIXI.Texture.WHITE;
    frame.anchor.set(0.5);
    frame.position.set(1599.50, 1130.50);

    // -> any texture that wasn't found was set to
    //    white for now- let's handle that in the
    //    future!

    pixiApp.stage.addChild(
      cosmicBackgroundRadiation,
      sky,
      ...waves.reverse(),
      char_EyeSclera,
      char_EyeLeft_Origin,
      char_EyeLeft,
      char_EyeRight_Origin,
      char_EyeRight,
      char,
      frame,
    );

    //   -> trigger pixi resize to ensure fit
    updatePixiSize(pixiApp);
    //   -> disable isLoading state, which triggers animation load
    isLoading.set(false);
  }));



// Build sprite interactions //
//   -> observer function to track target with eyes
function trackTargetWithEyes(targetX: number, targetY: number) {

  const eyeLeftBounds = char_EyeLeft_Origin.getBounds();
  const eyeRightBounds = char_EyeRight_Origin.getBounds();
  const eyesAverageCenter = {
    x: (eyeLeftBounds.x + eyeRightBounds.x) / 2,
    y: (eyeLeftBounds.y + eyeRightBounds.y) / 2,
  };

  const targetVector = {
    x: targetX - eyesAverageCenter.x,
    y: targetY - eyesAverageCenter.y,
  }

  const targetDistance = Math.sqrt(Math.pow(targetVector.x, 2) + Math.pow(targetVector.y, 2));
  if (targetDistance < 18) return;

  const normalizedVector = {
    x: targetVector.x / targetDistance,
    y: targetVector.y / targetDistance,
  };

  const translation = {
    x: 16 * normalizedVector.x,
    y: 7 * normalizedVector.y,
  }

  char_EyeLeft.position.set(
    char_EyeLeft_Origin.x + translation.x,
    char_EyeLeft_Origin.y + translation.y
  );

  char_EyeRight.position.set(
    char_EyeRight_Origin.x + translation.x,
    char_EyeRight_Origin.y + translation.y
  );
}

//   => (event) pointerPos -> char hover sprite replacement
MobX.autorun(() => {
  if (Number.isNaN(pointerPos[0])) return;

  const charRect = char.getBounds();
  if (charRect.contains(pointerPos[0], pointerPos[1])) {
    char.texture = idx(PIXI.Loader.shared.resources, _ => _.char.textures['char_hover.png']) || PIXI.Texture.WHITE;
    char.anchor.set(0.5);
    char.position.set(SPRITE_ORIGIN.char.hover.x, SPRITE_ORIGIN.char.hover.y);
  } else {
    char.texture = idx(PIXI.Loader.shared.resources, _ => _.char.textures['char.png']) || PIXI.Texture.WHITE;
    char.anchor.set(0.5);
    char.position.set(SPRITE_ORIGIN.char.default.x, SPRITE_ORIGIN.char.default.y);
  }
});

//   => (event) pointerClick -> (state) isWatching: show video player
MobX.autorun(() => {
  if (Number.isNaN(pointerClick[0])) return;
  if (!char.getBounds().contains(pointerClick[0], pointerClick[1])) return;

  //   -> delays video appearance on mobile (a moment to show-off click sprite)
  if (pointerClick[3] !== 'mouse') {
    char.texture = idx(PIXI.Loader.shared.resources, _ => _.char.textures['char_hover.png']) || PIXI.Texture.WHITE;
    char.anchor.set(0.5);
    char.position.set(SPRITE_ORIGIN.char.hover.x, SPRITE_ORIGIN.char.hover.y);
    window.setTimeout(() => isWatching.set(true), 1232);
    return;
  }

  isWatching.set(true);
});

//   => (event) pointerPos, pointerClick -> track eye to pointer
MobX.autorun(() => {
  if (Number.isNaN(pointerPos[0]) && Number.isNaN(pointerClick[0])) return;

  if (pointerPos[2] > pointerClick[2]) {
    trackTargetWithEyes(pointerPos[0], pointerPos[1]);
  } else {
    trackTargetWithEyes(pointerClick[0], pointerClick[1]);
  }
});
