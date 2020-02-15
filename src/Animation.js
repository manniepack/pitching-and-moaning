import React from 'react';
import * as PIXI from 'pixi.js';
import { POLICY, Size, getScaledRect } from 'adaptive-scale/lib-esm';

class Animation extends React.Component {

  /**
   * @param {*} props 
   * @param {Size} props.parentSize
   */
  constructor(props) {
    super(props);

    this.getRendererSize = this.getRendererSize.bind(this);
    this.updateAnimationSize = this.updateAnimationSize.bind(this);
    this.loadAnimationAssets = this.loadAnimationAssets.bind(this);
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
     * Quick method to generate assets (images,
     * spritesheets, fonts, et cetera) URLS.
     * 
     * For use mostly in PIXI.Loader, e.g.:
     * 
     *   const { ASSET } = this;
     *   PIXI.Loader.shared
     *     .add(ASSET('spritesheet.json'))
     *     .add(ASSET('image.png'))
     *     .load(onLoad);
     */
    this.ASSET = p => process.env.NODE_ENV === 'development' ? `/animation_assets/${p}` : `/pitching-and-moaning/animation_assets/${p}`;

    /**
     * ANIMATION_ROOT is a DOM reference to the base
     * canvas element within which Pixi.js operates.
     */
    this.ANIMATION_ROOT = React.createRef();

    const rendererSize = this.getRendererSize(props.parentSize, this.CANVAS_SIZE);
    this.PIXI_APP = {
      renderer: new PIXI.autoDetectRenderer({
        antialias: true,
        autoDensity: true,
        resolution: window.devicePixelRatio,
        /**
         * Here I'm programmatically switching anim-
         * ation colors based on runtime environment.
         * 
         * A dark background makes visualizing where
         * the stages ends easier.
         */
        backgroundColor: (process.env.NODE_ENV === 'development' ?
          (0x7b7b7b) :
          (0xffffff)
        ),
        width: rendererSize.width,
        height: rendererSize.height,
      }),
      stage: new PIXI.Container({
        interactive: true,
      }),
      ticker: new PIXI.Ticker(),
      sprites: {},
    };
  }

  componentDidMount() {
    const { renderer, stage, ticker } = this.PIXI_APP;

    /**
     * TODO: Redo asset loading state
     *
     * Considering intitializing
     */
    this.loadAnimationAssets();

    ticker.add(
      () => { renderer.render(stage); },
      PIXI.UPDATE_PRIORITY.HIGH
    );

    ticker.start();
    this.ANIMATION_ROOT.appendChild(renderer.view);
  }

  componentDidUpdate(prevProps) {
    const prevParentSize = prevProps.parentSize;
    const { parentSize } = this.props;

    if (
      prevParentSize.width === parentSize.width &&
      prevParentSize.height === parentSize.height
    ) return;

    this.updateAnimationSize();
  }

  componentWillUnmount() {
    this.PIXI_APP.ticker.stop();
    this.PIXI_APP.renderer.destroy(true);
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

  getRendererSize(container=this.props.parentSize, target=this.CANVAS_SIZE) {
    return getScaledRect({
      container,
      target,
      policy: POLICY.ShowAll,
    });
  }

  updateAnimationSize() {
    const { renderer, stage } = this.PIXI_APP;
    const { width, height } = this.getRendererSize();

    stage.width = width;
    stage.height = height;
    renderer.resize(width, height);
  }

  loadAnimationAssets() {
    const { ASSET } = this;

    PIXI.Loader.shared
      .add(ASSET('frame.png'))
      .add(ASSET('sky.png'))
      .add(ASSET('ss_char.json'))
      .add(ASSET('ss_sea.json'))
      .load(this.generateSprites);
  }

  generateSprites() {
    const { ASSET } = this;
    const { stage, ticker } = this.PIXI_APP;
    const loader = PIXI.Loader.shared;

    const frame = new PIXI.Sprite(loader.resources[ASSET('frame.png')].texture);
    const sky = new PIXI.Sprite(loader.resources[ASSET('sky.png')].texture);

    const ss_sea = loader.resources[ASSET('ss_sea.json')].spritesheet.textures;
    const wave_1 = new PIXI.Sprite(ss_sea['wave_1.png']);
    const wave_2 = new PIXI.Sprite(ss_sea['wave_2.png']);
    const wave_3 = new PIXI.Sprite(ss_sea['wave_3.png']);
    const wave_4 = new PIXI.Sprite(ss_sea['wave_4.png']);

    const ss_char = loader.resources[ASSET('ss_char.json')].spritesheet.textures;
    const char_eye_sclera = new PIXI.Sprite(PIXI.Texture.WHITE);
    const char_eye_left = new PIXI.Sprite(ss_char['eye_left.png']);
    const char_eye_right = new PIXI.Sprite(ss_char['eye_right.png']);
    const char = new PIXI.Sprite(ss_char['char.png']);

    stage.addChild(sky);
    stage.addChild(wave_1);
    stage.addChild(wave_2);
    stage.addChild(wave_3);
    stage.addChild(wave_4);
    stage.addChild(char_eye_sclera);
    stage.addChild(char_eye_left);
    stage.addChild(char_eye_right);
    stage.addChild(char);
    stage.addChild(frame);

    wave_1.anchor.set(0.5);
    wave_1.position.set(2444.50, 1386.50);

    wave_2.anchor.set(0.5);
    wave_2.position.set(823.50, 1253.50);

    wave_3.anchor.set(0.5);
    wave_3.position.set(1686.50, 1545.50);

    wave_4.anchor.set(0.5);
    wave_4.position.set(954, 1604);

    char_eye_sclera.width = 221;
    char_eye_sclera.height = 79;
    char_eye_sclera.anchor.set(0.5); 
    char_eye_sclera.position.set(1610.50, 1023.50);

    char_eye_left.CENTER = { x: 1545, y: 1024.50 };
    char_eye_left.anchor.set(0.5);
    char_eye_left.position.set(char_eye_left.CENTER.x, char_eye_left.CENTER.y);

    char_eye_right.CENTER = { x: 1679.50, y: 1023.50 };
    char_eye_right.anchor.set(0.5);
    char_eye_right.position.set(char_eye_right.CENTER.x, char_eye_right.CENTER.y);

    /**
     * char
     */
    char.anchor.set(0.5);
    char.position.set(1611, 1385.50);
    char.cursor = 'pointer';
    char.interactive = true;

    const char_hover = e => {
      char.texture = ss_char['char_hover.png'];
      char.anchor.set(0.5);
      char.position.set(1611, 1381.90);
    };
    char.on('mouseover', char_hover);

    const char_default = e => {
      char.texture = ss_char['char.png'];
      char.anchor.set(0.5);
      char.position.set(1611, 1385.50);
    }
    char.on('mouseout', char_default);

    /**
     * wave_*
     */
    wave_1.CHANGE = 0;
    wave_2.CHANGE = 0;
    wave_3.CHANGE = 0;
    wave_4.CHANGE = 0;
    ticker.add(
      () => {
        if (wave_1.CHANGE > PIXI.PI_2) wave_1.CHANGE = 0;
        if (wave_2.CHANGE > PIXI.PI_2) wave_2.CHANGE = 0;
        if (wave_3.CHANGE > PIXI.PI_2) wave_3.CHANGE = 0;
        if (wave_4.CHANGE > PIXI.PI_2) wave_4.CHANGE = 0;

        wave_1.position.y += 0.1 * Math.sin(wave_1.CHANGE);
        wave_1.rotation = 0.0125 * Math.sin(wave_1.CHANGE);
        wave_2.position.y += 0.1 * Math.cos(wave_2.CHANGE);
        wave_2.rotation = 0.0125 * Math.sin(wave_2.CHANGE);
        wave_3.position.y += 0.3 * Math.sin(wave_3.CHANGE);
        wave_3.rotation = 0.0225 * Math.cos(wave_3.CHANGE);
        wave_4.position.y += 0.2 * Math.sin(wave_4.CHANGE);
        wave_4.rotation = 0.0300 * Math.sin(wave_4.CHANGE);

        wave_1.CHANGE += 0.0035;
        wave_2.CHANGE += 0.0037;
        wave_3.CHANGE += 0.0125;
        wave_4.CHANGE += 0.0175;
      },
      PIXI.UPDATE_PRIORITY.INTERACTION
    );

    this.PIXI_APP._sprites = {
      frame,
      char: {
        char,
        char_default,
        charHover: char_hover,
        eye: {
          sclera: char_eye_sclera,
          left: char_eye_left,
          right: char_eye_right,
        },
      },
      waves: {
        1: wave_1,
        2: wave_2,
        3: wave_3,
        4: wave_4,
      },
      sky,
    };

    this.updateAnimationSize();
  }
}

export default Animation;
