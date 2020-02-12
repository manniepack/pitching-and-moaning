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
    this.getRendererSize = this.getRendererSize.bind(this);
    this.updateAnimationSize = this.updateAnimationSize.bind(this);

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
        /**
         * Here I'm programmatically switching anim-
         * ation colors based on runtime environment.
         */
        backgroundColor: (process.env.NODE_ENV === 'development' ?
          (0x7b7b7b) :
          (0xffffff)
        ),
      }),
      stage: new PIXI.Container(),
      ticker: new PIXI.Ticker(),
      sprites: null,
    };
  }

  componentDidMount() {
    const { renderer, stage, ticker } = this.PIXI_APP;

    /**
     * (async)
     * Load spritesheet and fire asset generator.
     * 
     * TODO: consider using a downscaled sprite-
     * sheet based on parentSize.
     */
    const spriteURI = 'spritesheetHQ.json';
    PIXI.Loader.shared
      .add(spriteURI)
      .load(() => this.generateSprites(spriteURI));

    ticker.add(
      () => { renderer.render(stage); },
      PIXI.UPDATE_PRIORITY.LOW
    );

    ticker.start();
    this.ANIMATION_ROOT.appendChild(renderer.view);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.parentSize.width === this.props.parentSize.width &&
      prevProps.parentSize.height === this.props.parentSize.height
    ) return;

    this.updateAnimationSize();
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

  getRendererSize() {
    return getScaledRect({
      container: this.props.parentSize,
      target: this.CANVAS_SIZE,
      policy: POLICY.ShowAll,
    });
  }

  updateAnimationSize() {
    const { renderer, stage } = this.PIXI_APP;
    const { width, height } = this.getRendererSize();

    renderer.resize(width, height);
    stage.width = width;
    stage.height = height;
  }

  generateSprites(spriteURI) {
    const { PIXI_APP } = this;
    const sheet = PIXI.Loader.shared.resources[spriteURI].spritesheet;

    const frame = new PIXI.Sprite(sheet.textures['frame.png']);
    const char = new PIXI.Sprite(sheet.textures['char.png']);
    const char_sclera = new PIXI.Sprite(PIXI.Texture.WHITE);
    const sky = new PIXI.Sprite(sheet.textures['sky.png']);

    PIXI_APP.stage.addChild(sky);
    PIXI_APP.stage.addChild(char_sclera);
    PIXI_APP.stage.addChild(char);
    PIXI_APP.stage.addChild(frame);

    char_sclera.width = 221;
    char_sclera.height = 79;
    char_sclera.anchor.set(0.5); 
    char_sclera.position.set(1610.50, 1023.50);

    char.anchor.set(0.5);
    char.position.set(1611, 1385.50);

    this.updateAnimationSize();
  }
}

export default Animation;
