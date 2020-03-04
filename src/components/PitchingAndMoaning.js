import 'sanitize.css';

import React from 'react';
import debounce from 'lodash.debounce';
import * as PIXI from 'pixi.js';
import { Size, getScaledRect, POLICY } from 'adaptive-scale/lib-esm';

import Loader from './Loader';

class PitchingAndMoaning extends React.Component {

  state = {
    isAnimationLoaded: false,
  };

  //
  // as_DesignSize and as_GetStageSize work together
  // to generate a new size for our animation stage
  // that fits within our viewport without losing the
  // original design proportions/aspect ratio.
  //
  static as_DesignSize = new Size(3200, 2320);
  as_GetStageSize = () => getScaledRect({
    container: new Size(window.innerWidth, window.innerHeight),
    target: this.as_DesignSize,
    policy: POLICY.ShowAll,
  });

  pixi_Renderer = PIXI.autoDetectRenderer({
    antialias: true,
    autoDensity: true,
    sharedTicker: true,
  });
  pixi_Target = new PIXI.Container();
  pixi_Stage = new PIXI.Container();

  pixi_LoadSpritesheets = async () => {
    return new Promise(resolve => {
      resolve();
    });
  };

  onWindowResize = (e) => debounce((e) => {
    const { width, height } = this.state.windowSize;
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    // This check may be unnecessary and omitted
    if (width === newWidth && height === newHeight) return;

    //
    // I use an adaptive scale library to scale the
    // original design dimensions to ones that fit
    // in our current viewport, without losing the
    // aspect ratio. Just basic math that has been
    // abstracted away
    //
    const stageSize = this.as_GetStageSize(new Size(newWidth, newHeight));

    this.pixi_Stage.position.set(stageSize.x, stageSize.y);
    this.pixi_Stage.width = stageSize.width;
    this.pixi_Stage.height = stageSize.height;

    //
    // Pixi.js renderer and target (main component)
    // will take the full size of the viewport.
    //
    this.pixi_Renderer.resize(newWidth, newHeight);
    this.pixi_Target.width = newWidth;
    this.pixi_Target.height = newHeight;
  }, 333);

  async componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
    await this.pixi_LoadSpritesheets();
  }

  render() {
    if (!this.state.isAnimationLoaded) return <Loader />;

    return null;
  }

  componentWillUnmount() {

    window.removeEventListener('resize', this.onWindowResize);

    const { RENDERER, TICKER } = this.pixiApp;
    TICKER.stop();
    RENDERER.destroy(true);
  }
}

export default PitchingAndMoaning;
