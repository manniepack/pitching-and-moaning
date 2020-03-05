import 'sanitize.css';

import React from 'react';
import debounce from 'lodash.debounce';
import * as PIXI from 'pixi.js';
import { Size, getScaledRect, POLICY } from 'adaptive-scale/lib-esm';

import Loader from './Loader';
import Animation from './Animation';

import { GetAssetURI } from '../utils/assets';

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
  as_DesignSize = new Size(3200, 2320);
  as_GetStageSize = () => getScaledRect({
    container: new Size(window.innerWidth, window.innerHeight),
    target: this.as_DesignSize,
    policy: POLICY.ShowAll,
  });

  pixi_Renderer = new PIXI.autoDetectRenderer({
    antialias: true,
    transparent: true,
    autoDensity: true,
    resolution: window.devicePixelRatio,
    sharedTicker: true,
  });
  pixi_RootContainer = new PIXI.Container();
  pixi_Stage = new PIXI.Container();

  pixi_LoadAssets = async () => {
    const loader = PIXI.Loader.shared;

    const assets = [
      GetAssetURI('frame.png'),
      GetAssetURI('sky.png'),
      GetAssetURI('spritesheet_char.json'),
      GetAssetURI('spritesheet_waves.json'),
      GetAssetURI('spritesheet_lightning.json'),
    ];

    return new Promise((resolve, reject) => {
      for (let index in assets) {
        loader.add(assets[index]);
      }

      loader.onError.add(() => reject(assets));

      loader.load((loader, resources) => {
        resolve({ paths: assets, resources });
      });
    });
  };

  dom_OnWindowResize = () => debounce(() => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    //
    // I use an adaptive scale library to scale the original
    // design dimensions to ones that fit in our current
    // viewport, without losing the aspect ratio. Just
    // basic math that has been abstracted away
    //
    const stageSize = this.as_GetStageSize(new Size(newWidth, newHeight));
    const { pixi_Renderer, pixi_RootContainer, pixi_Stage } = this;

    pixi_Stage.position.set(stageSize.x, stageSize.y);
    pixi_Stage.width = stageSize.width;
    pixi_Stage.height = stageSize.height;

    //
    // Pixi.js renderer and target (main component)
    // will take the full size of the viewport.
    //
    pixi_Renderer.resize(newWidth, newHeight);
    pixi_RootContainer.width = newWidth;
    pixi_RootContainer.height = newHeight;

    //
    // Set renderer resolution
    //
    // NOTE: The sprites will NOT change if the device
    // resolution changes.
    //
    // pixi_Renderer.resolution = window.devicePixelRatio;
  }, 333)();

  //
  // React.js Lifecycle Event
  // (componentDidMount)
  //
  async componentDidMount() {

    //
    // Bind window resize
    //
    window.addEventListener('resize', this.dom_OnWindowResize);

    //
    // Chain-load assets
    // (images, spritesheets)
    //
    try {
      await this.pixi_LoadAssets();
    } catch (err) {
      throw err;
    }

    const { pixi_RootContainer, pixi_Stage } = this;
    pixi_RootContainer.addChild(pixi_Stage);

    //
    // Trigger resize logic manually once to calculate
    // proper sizes
    //
    this.dom_OnWindowResize();

    //
    // Mark animation as loaded; this shows the animation
    // for the first time
    //
    this.setState({
      ...this.state,
      isAnimationLoaded: true,
    });
  }

  //
  // React.js Lifecycle Event
  // (render)
  //
  render() {
    const { isAnimationLoaded } = this.state;
    
    const parentStyle = {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isAnimationLoaded ? '#FFFFFF' : '#000000',
      textAlign: 'center',
      transition: 'background-color 0.3s ease-out',
    };

    return (
      <div style={parentStyle}>
        {!isAnimationLoaded ? <Loader /> : (

          //
          // Render animation
          //
          <Animation
            root={this.pixi_Renderer.view}
            stage={this.pixi_Stage}
          />
        )}
      </div>
    );
  }

  //
  // React.js Lifecycle Event
  // (componentWillUnmount)
  //
  componentWillUnmount() {
    window.removeEventListener('resize', this.dom_OnWindowResize);
    this.pixi_Renderer.destroy(true);
  }
}

export default PitchingAndMoaning;
