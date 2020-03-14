import {
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import * as PIXI from 'pixi.js';

import { PixiApp } from "~scripts/hooks/usePixi";

export default (pixi: PixiApp, setLoading: Dispatch<SetStateAction<boolean>>, setWatching: Dispatch<SetStateAction<boolean>>) => {
  
  const onAssetLoad = (loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => {
    setLoading(false);
  }

  useEffect(() => {
    const loader = PIXI.Loader.shared;
    loader
      .add('sky', 'assets/sky.png')
      .add('lightning', 'assets/spritesheet_lightning.json')
      .add('waves', 'assets/spritesheet_waves.json')
      .add('char', 'assets/spritesheet_char.json')
      .add('frame', 'assets/frame.png')
      .load(onAssetLoad);
  }, []);
};
