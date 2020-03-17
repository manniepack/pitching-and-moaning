import isDev from '~scripts/utils/isDev';
import {
  useState,
  useEffect,
} from 'react';
import { useObserver } from 'mobx-react-lite';
import * as PIXI from 'pixi.js';
import { useAppState } from '~scripts/models/appState';

interface IPixiDimensions {
  viewport: {
    width: number,
    height: number,
  },
  canvas_Scaled: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
  resolution: number,
}

const setDimensions = (renderer: PIXI.Renderer, stage: PIXI.Container, newDimensions: IPixiDimensions) => {
  const { viewport, canvas_Scaled, resolution } = newDimensions;

  stage.position.set(canvas_Scaled.x, canvas_Scaled.y);
  stage.width = canvas_Scaled.width;
  stage.height = canvas_Scaled.height;

  renderer.resolution = resolution;
  renderer.resize(viewport.width, viewport.height);
};

const initialRenderer = PIXI.autoDetectRenderer({
  autoDensity: true,
  antialias: true,
  transparent: true,
});
const initialStage = new PIXI.Sprite();

if (isDev) {
  initialStage.texture = PIXI.Texture.WHITE;
  initialStage.tint = 0x23CDDF;
}

const usePixi = (): [PIXI.Renderer, PIXI.Container] => {

  const [renderer] = useState(initialRenderer);
  const [stage] = useState(initialStage);

  const appStateStore = useAppState();

  /**
   * Update PixiApp dimensions when viewport changes.
   */
  useObserver(() => useEffect(() => {
    console.log('dinged!');
    setDimensions(renderer, stage, {
      viewport: {
        width: appStateStore.viewportWidth,
        height: appStateStore.viewportHeight,
      },
      canvas_Scaled: appStateStore.canvasSize_Scaled,
      resolution: appStateStore.resolution,
    });
  }, [
    appStateStore.viewportWidth,
    appStateStore.viewportHeight,
    appStateStore.resolution
  ]));

  /**
   * Re-render Pixi.js on each update.
   */
  useEffect(() => {
    renderer.render(stage);
  });

  return [renderer, stage];
};

export default usePixi;
