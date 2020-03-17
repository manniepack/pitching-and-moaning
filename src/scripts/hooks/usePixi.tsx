import {
  useState,
  useEffect,
} from 'react';
import * as PIXI from 'pixi.js';

import { ScaledViewport } from '~scripts/hooks/useScaledViewport';

const setDimensions = (renderer: PIXI.Renderer, stage: PIXI.Container, newDimensions: ScaledViewport) => {
  const { viewportSize, scaledRect, resolution } = newDimensions;

  stage.position.set(scaledRect.x, scaledRect.y);
  stage.width = scaledRect.width;
  stage.height = scaledRect.height;

  renderer.resolution = resolution;
  renderer.resize(viewportSize.width, viewportSize.height);
};

const initialRenderer = PIXI.autoDetectRenderer({
  autoDensity: true,
  antialias: true,
  transparent: true,
});
const initialStage = new PIXI.Sprite();

if (process.env.NODE_ENV === 'development') {
  initialStage.texture = PIXI.Texture.WHITE;
  initialStage.tint = 0x23CDDF;
} else {
  initialRenderer.transparent = true;
}

export default (scaledViewport: ScaledViewport): [PIXI.Renderer, PIXI.Container] => {

  const [renderer] = useState(initialRenderer);
  const [stage] = useState(initialStage);

  /**
   * Update PixiApp dimensions when viewport changes.
   */
  useEffect(() => {
    setDimensions(renderer, stage, scaledViewport);
  }, [scaledViewport]);

  /**
   * Re-render Pixi.js on each update.
   */
  useEffect(() => {
    renderer.render(stage);
  });

  return [renderer, stage];
};
