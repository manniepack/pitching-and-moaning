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
     * ANIMATION_ROOT is a DOM reference to the base
     * canvas element within which Pixi.js operates.
     */
    this.ANIMATION_ROOT = React.createRef();
    this.PIXI_APP = {
      renderer: new PIXI.autoDetectRenderer({
        antialias: true,
        resolution: 2,
        /**
         * Here I'm programmatically switching anim-
         * ation colors based on runtime environment.
         */
        backgroundColor: (process.env.NODE_ENV === 'development' ?
          (0x7b7b7b) :
          (0xffffff)
        ),
      }),
      stage: new PIXI.Container({
        interactive: true,
      }),
      ticker: new PIXI.Ticker(),
      animationFrame: 0,
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
    const { stage, ticker } = this.PIXI_APP;
    const sheet = PIXI.Loader.shared.resources[spriteURI].spritesheet;

    const sky = new PIXI.Sprite(sheet.textures['sky.png']);
    const sea_1 = new PIXI.Sprite(sheet.textures['sea_1.png']);
    const sea_2 = new PIXI.Sprite(sheet.textures['sea_2.png']);
    const sea_3 = new PIXI.Sprite(sheet.textures['sea_3.png']);
    const sea_4 = new PIXI.Sprite(sheet.textures['sea_4.png']);
    const char_sclera = new PIXI.Sprite(PIXI.Texture.WHITE);
    const eye_left = new PIXI.Sprite(sheet.textures['eye_left.png']);
    const eye_right = new PIXI.Sprite(sheet.textures['eye_right.png'])
    const char = new PIXI.Sprite(sheet.textures['char.png']);
    const frame = new PIXI.Sprite(sheet.textures['frame.png']);

    stage.addChild(sky);
    stage.addChild(sea_4);
    stage.addChild(sea_3);
    stage.addChild(sea_2);
    stage.addChild(sea_1);
    stage.addChild(char_sclera);
    stage.addChild(eye_left);
    stage.addChild(eye_right);
    stage.addChild(char);
    stage.addChild(frame);

    sea_4.anchor.set(0.5);
    sea_4.position.set(2444.50, 1386.50);

    sea_3.anchor.set(0.5);
    sea_3.position.set(823.50, 1253.50);

    sea_2.anchor.set(0.5);
    sea_2.position.set(1686.50, 1545.50);

    sea_1.anchor.set(0.5);
    sea_1.position.set(954, 1604);

    char_sclera.width = 221;
    char_sclera.height = 79;
    char_sclera.anchor.set(0.5); 
    char_sclera.position.set(1610.50, 1023.50);

    eye_left.CENTER = { x: 1545, y: 1024.50 };
    eye_left.anchor.set(0.5);
    eye_left.position.set(eye_left.CENTER.x, eye_left.CENTER.y);

    eye_right.CENTER = { x: 1679.50, y: 1023.50 };
    eye_right.anchor.set(0.5);
    eye_right.position.set(eye_right.CENTER.x, eye_right.CENTER.y);

    char.anchor.set(0.5);
    char.position.set(1611, 1385.50);
    char.cursor = 'pointer';
    char.interactive = true;
    char.on('mouseover', e => {
      char.texture = sheet.textures['char_hover.png'];
      char.anchor.set(0.5);
      char.position.set(1611, 1381.90);
    });
    char.on('mouseout', e => {
      char.texture = sheet.textures['char.png'];
      char.anchor.set(0.5);
      char.position.set(1611, 1385.50);
    });

    sea_1.CHANGE = 0;
    sea_2.CHANGE = 0;
    sea_3.CHANGE = 0;
    sea_4.CHANGE = 0;
    ticker.add(
      () => {
        if (sea_1.CHANGE > PIXI.PI_2) sea_1.CHANGE = 0;
        if (sea_2.CHANGE > PIXI.PI_2) sea_2.CHANGE = 0;
        if (sea_3.CHANGE > PIXI.PI_2) sea_3.CHANGE = 0;
        if (sea_4.CHANGE > PIXI.PI_2) sea_4.CHANGE = 0;

        sea_1.position.y += 0.2 * Math.sin(sea_1.CHANGE);
        sea_1.rotation = 0.0300 * Math.sin(sea_1.CHANGE);
        sea_2.position.y += 0.3 * Math.sin(sea_2.CHANGE);
        sea_2.rotation = 0.0225 * Math.cos(sea_1.CHANGE);
        sea_3.position.y += 0.1 * Math.cos(sea_3.CHANGE);
        sea_3.rotation = 0.0125 * Math.sin(sea_1.CHANGE);
        sea_4.position.y += 0.1 * Math.sin(sea_4.CHANGE);
        sea_4.rotation = 0.0125 * Math.sin(sea_1.CHANGE);

        sea_1.CHANGE += 0.0175;
        sea_2.CHANGE += 0.0125;
        sea_3.CHANGE += 0.0037;
        sea_4.CHANGE += 0.0035;
      },
      PIXI.UPDATE_PRIORITY.LOW
    )

    this.updateAnimationSize();
  }
}

export default Animation;
