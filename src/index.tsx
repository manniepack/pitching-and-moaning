
import 'sanitize.css';

import idx from 'idx';
import * as MobX from 'mobx';
import * as PIXI from 'pixi.js';
import * as AS from 'adaptive-scale';

const IS_DEV = process.env.NODE_ENV === 'development';
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



// Setup state //
const isLoading = MobX.observable.box(true);
const isWatching = MobX.observable.box(false);

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
    return [NaN, NaN, NaN];
  return [event.x, event.y, Date.now()];
}

//   -> utility function to create pure-object pointerClick
function createPointerClick(event?: PointerEvent): TTimedPointerClick {
  if (!event)
    return [NaN, NaN, NaN, ''];
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



// Setup page and loader //
//   -> get and clear root DOM node
const root = document.getElementById('root');
if (!root)
  throw new ReferenceError(`no root element found, script must be run in environment
see: https://github.com/manniepack/pitching-and-moaning`);
root.textContent = '';

//   -> create loader and page nodes (unparented)
const loader = document.createElement('div');
loader.textContent = `...pitching, and moaning...`;
const page = document.createElement('section');

//   => (event) isLoading change -> compute new page styles
MobX.autorun(() => {
  const loading = isLoading.get();
  page.style.cssText = `
    width: 100vw;
    height: 100vh;
    background-color: ${loading ? 'black' : 'white'};
    color: ${loading ? 'white' : 'black'};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.23s ease-in,
                background-color 0.23s ease-in;
  `;
});

//   => (event) isLoading change -> update children nodes
MobX.autorun(() => {
  page.textContent = '';

  if (isLoading.get()) {
    // parent loader element to page
    page.appendChild(loader);
    return;
  }

  // parent loader element to page
  page.appendChild(pixiApp.renderer.view);

  if (isWatching.get()) {
    // parent video to page
    console.log('now watching!');
  }
});

//   -> parent page element to root node
root.appendChild(page);



// Build sprites //
let cosmicBackgroundRadiation = new PIXI.Sprite();
let sky = new PIXI.Sprite();
let lightning = [new PIXI.Sprite(), new PIXI.Sprite(), new PIXI.Sprite()];
let waves = [new PIXI.Sprite(), new PIXI.Sprite(), new PIXI.Sprite(), new PIXI.Sprite()];
let char_EyeSclera = new PIXI.Sprite();
let char_EyeRight = new PIXI.Sprite();
let char_EyeLeft = new PIXI.Sprite();
let char = new PIXI.Sprite();
let frame = new PIXI.Sprite();

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

    char_EyeLeft.texture = idx(resources, _ => _.char.textures['eye_left.png']) || PIXI.Texture.WHITE;
    char_EyeLeft.anchor.set(0.5);
    char_EyeLeft.position.set(SPRITE_ORIGIN.eye.left.x, SPRITE_ORIGIN.eye.left.y);

    char_EyeRight.texture = idx(resources, _ => _.char.textures['eye_right.png']) || PIXI.Texture.WHITE;
    char_EyeRight.anchor.set(0.5);
    char_EyeRight.position.set(SPRITE_ORIGIN.eye.right.x, SPRITE_ORIGIN.eye.right.y);

    char.texture = idx(resources, _ => _.char.textures['char.png']) || PIXI.Texture.WHITE;
    char.anchor.set(0.5);
    char.position.set(SPRITE_ORIGIN.char.default.x, SPRITE_ORIGIN.char.default.y);


    frame.texture = idx(resources, _ => _.frame.texture) || PIXI.Texture.WHITE;
    frame.anchor.set(0.5);
    frame.position.set(1599.50, 1130.50);

    // any texture that wasn't found was set to
    // white for now- let's handle that in the
    // future!

    pixiApp.stage.addChild(
      cosmicBackgroundRadiation,
      sky,
      ...waves.reverse(),
      char_EyeSclera,
      char_EyeLeft,
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
//   -> character hover interaction (pointerPos)
MobX.autorun(() => {
  const [x, y] = pointerPos;
  if (Number.isNaN(x)) return;

  const charRect = char.getBounds();
  if (charRect.contains(x, y)) {
    char.texture = idx(PIXI.Loader.shared.resources, _ => _.char.textures['char_hover.png']) || PIXI.Texture.WHITE;
    char.anchor.set(0.5);
    char.position.set(SPRITE_ORIGIN.char.hover.x, SPRITE_ORIGIN.char.hover.y);
  } else {
    char.texture = idx(PIXI.Loader.shared.resources, _ => _.char.textures['char.png']) || PIXI.Texture.WHITE;
    char.anchor.set(0.5);
    char.position.set(SPRITE_ORIGIN.char.default.x, SPRITE_ORIGIN.char.default.y);
  }
});

//   -> character click interaction (pointerPos, isWatching)
MobX.autorun(() => {
  const [x, y, time, type] = pointerClick;
  if (Number.isNaN(x)) return;

  if (!char.getBounds().contains(x, y))
    return;

  if (type === 'mouse') {
    isWatching.set(true);
    return;
  }

  char.texture = idx(PIXI.Loader.shared.resources, _ => _.char.textures['char_hover.png']) || PIXI.Texture.WHITE;
  char.anchor.set(0.5);
  char.position.set(SPRITE_ORIGIN.char.hover.x, SPRITE_ORIGIN.char.hover.y);

  window.setTimeout(() => isWatching.set(true), 2323);
});

// MobX.autorun(() => {
//   const [x, y, time] = pointerPos;
//   if (Number.isNaN(x)) return;

//   function getEyeDataFromSprite(eye: PIXI.Sprite): TEyeData {
//     const bounds = eye.getBounds();
//     return {
//       x: bounds.x,
//       y: bounds.y,
//       width: bounds.width,
//       height: bounds.height,
//       center: {
//         x: bounds.x + bounds.width / 2,
//         y: bounds.y + bounds.height / 2,
//       }
//     };
//   };

//   function tryTrackingEyes(targetX: number, targetY: number): boolean {
//     const eyeLeft = getEyeDataFromSprite(char_EyeLeft);
//     const eyeRight = getEyeDataFromSprite(char_EyeRight);

//     const eyeAveragePos = {
//       x: (eyeLeft.center.x + eyeRight.center.x) / 2,
//       y: (eyeLeft.center.y + eyeRight.center.y) / 2,
//     };

//     const eyesToTarget_Vector = {
//       x: targetX - eyeAveragePos.x,
//       y: targetY - eyeAveragePos.y,
//     };
//     const eyesToTarget_Distance = Math.sqrt(Math.pow(eyesToTarget_Vector.x, 2) + Math.pow(eyesToTarget_Vector.y, 2));

//     if (eyesToTarget_Distance < 64) {
//       return false;
//     } else {
//       const eyesToTarget_NormalizedVector = {
//         x: eyesToTarget_Vector.x / eyesToTarget_Distance,
//         y: eyesToTarget_Vector.y / eyesToTarget_Distance * -1,
//       };

//       console.dir({
//         eyesToTarget_Distance,
//         eyesToTarget_NormalizedVector,
//       });

//       const eyesPos_New = {
//         left: [
//           SPRITE_ORIGIN.eye.left.x + eyesToTarget_NormalizedVector.x,
//           SPRITE_ORIGIN.eye.left.y + eyesToTarget_NormalizedVector.y,
//         ],
//         right: [
//           SPRITE_ORIGIN.eye.right.x + eyesToTarget_NormalizedVector.x,
//           SPRITE_ORIGIN.eye.right.y + eyesToTarget_NormalizedVector.y,
//         ],
//       };

//       char_EyeLeft.position.set(...eyesPos_New.left);
//       char_EyeRight.position.set(...eyesPos_New.right);
      
//       return true;
//     }
//   }

//   if (time < Date.now() + 3333) {
//     // interrupt auto-look!
//     if (tryTrackingEyes(x, y))
//       return;
//   }

//   // TODO: RANDOM LOOKAROUND!!!
// });
