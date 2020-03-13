import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import * as PIXI from 'pixi.js';

import { ScaledViewport } from '~scripts/hooks/useScaledViewport';

const setDimensions = (app: PixiApp, newDimensions: ScaledViewport) => {
  const { renderer, stage } = app;
  const { viewportSize, scaledSize, resolution } = newDimensions;

  stage.position.set(scaledSize.x, scaledSize.y);
  stage.width = scaledSize.width;
  stage.height = scaledSize.height;

  renderer.resolution = resolution;
  renderer.resize(viewportSize.width, viewportSize.height);
};

export interface PixiApp {
  renderer: PIXI.Renderer;
  stage: PIXI.Container;
}

const pixiApp: PixiApp = {
  renderer: PIXI.autoDetectRenderer({
    autoDensity: true,
    antialias: true,
    transparent: process.env.NODE_ENV === 'development' ? false : true,
    backgroundColor: 0xCCCCCC,
  }),
  stage: new PIXI.Container(),
};

export default (scaledViewport: ScaledViewport, setLoading: Dispatch<SetStateAction<boolean>>): [PixiApp] => {

  const [app] = useState<PixiApp>(pixiApp);

  useEffect(() => {
    setDimensions(app, scaledViewport);
    setLoading(false); // TODO: set this AFTER sprites are loaded
    return () => {
      app.renderer.destroy(true);
    };
  }, []);

  /**
   * Reset PixiApp dimensions when viewport changes.
   */
  useEffect(() => {
    setDimensions(app, scaledViewport);
  }, [scaledViewport]);

  /**
   * Re-render Pixi.js on each update.
   */
  useEffect(() => {
    app.renderer.render(app.stage);
  });

  return [app];
};
