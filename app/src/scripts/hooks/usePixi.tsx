import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import * as PIXI from 'pixi.js';

import { ViewportState } from '~/scripts/hooks/useScaledViewport';

const setDimensions = (app: PixiApp, newDimensions: ViewportState) => {
  const { renderer, stage } = app;
  const { viewportSize, scaledSize, resolution } = newDimensions;

  stage.position.set(scaledSize.x, scaledSize.y);
  stage.width = scaledSize.width;
  stage.height = scaledSize.height;

  renderer.resolution = resolution;
  renderer.resize(viewportSize.width, viewportSize.height);
};

interface PixiApp {
  renderer: PIXI.Renderer;
  stage: PIXI.Container;
}

const usePixi = (scaledViewport: ViewportState, setLoading: Dispatch<SetStateAction<boolean>>): [PixiApp] => {

  const [app, setApp] = useState<PixiApp>(null!);

  /**
   * Initial PixiApp on component mount.
   */
  useEffect(() => {
    const app = {
      renderer: PIXI.autoDetectRenderer({
        autoDensity: true,
        antialias: true,
        transparent: true,
      }),
      stage: new PIXI.Container(),
    };
    /**
     * Set PixiApp dimensions once, before adding to state.
     */
    setDimensions(app, scaledViewport);
    setApp(app);

    // TODO: unset loading AFTER sprites (once implemented)
    setLoading(false);

    return () => {
      if (!app) return;
      app.renderer.destroy(true);
    };
  }, []);

  /**
   * Reset PixiApp dimensions when viewport changes.
   */
  useEffect(() => {
    if (!app) return;
    setDimensions(app, scaledViewport);
  }, [scaledViewport]);

  /**
   * Re-render Pixi.js on each update.
   */
  useEffect(() => {
    if (!app) return;
    app.renderer.render(app.stage);
  });

  return [app];
}

export default usePixi;
