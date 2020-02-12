import React from 'react';
import * as PIXI from 'pixi.js';
import { POLICY, Size, getScaledRect } from 'adaptive-scale/lib-esm';

class Animation extends React.Component {

  /**
   * 
   * @param {*} props 
   * @param {Size} props.parentSize
   */
  constructor(props) {
    super(props);

    this.generateSprites = this.generateSprites.bind(this);

    /**
     * CANVAS_SIZE are the dimensions the original
     * poster (and) animation were designed for.
     * 
     * This is the size the animation is rendered
     * to before being scaled using
     * this.props.parentSize.
     */
    this.CANVAS_SIZE = new Size(3200, 2320);

    /**
     * animRootElem is a DOM reference to the base
     * canvas element within which Pixi.js operates.
     */
    this.ANIMATION_ROOT = React.createRef();
    this.PIXI_APP = {
      renderer: new PIXI.autoDetectRenderer({
        antialias: true,
        transparent: true,
        autoDensity: true,
      }),
      stage: new PIXI.Container(),
      ticker: new PIXI.Ticker(),
      sprites: null,
    };
  }

  generateSprites() {
    const { PIXI_APP } = this;

    // TODO: Again, dynamic spritesheet based on res please
    // const sheet = PIXI.Loader.shared.resources[null].spritesheet;
  }

  componentDidMount() {
    const { renderer, stage, ticker } = this.PIXI_APP;

    // (Async)
    // Fire sprite generation off
    // TODO: Determine which spritesheet to load (based on res)
    // PIXI.Loader.shared.add(null).load(this.generateSprites);

    // Begin firing engine updates
    ticker.add(() => {
      renderer.render(stage);
    }, PIXI.UPDATE_PRIORITY.LOW);
    ticker.start();

    // Add scene/animation to DOM
    this.ANIMATION_ROOT.appendChild(renderer.view);
  }

  componentWillUnmount() {
    this.PIXI_APP.ticker.stop();
    this.PIXI_APP.renderer.stop();
  }

  render() {
    const { width, height } = this.props.parentSize;
    const parentStyle = {
      width,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    return <div style={parentStyle} ref={elem => this.ANIMATION_ROOT = elem} />;
  }
}

export default Animation;
