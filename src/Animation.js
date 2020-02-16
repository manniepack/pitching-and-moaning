import React from 'react';
import * as PIXI from 'pixi.js';
import { POLICY, Size, getScaledRect } from 'adaptive-scale/lib-esm';
import ReactPlayer from 'react-player';

class Animation extends React.Component {

  /**
   * @param {*} props 
   * @param {Size} props.parentSize
   */
  constructor(props) {
    super(props);

    this.buildAnimation = this.buildAnimation.bind(this);
    this.loadAnimationAssets = this.loadAnimationAssets.bind(this);
    this.generateSprites = this.generateSprites.bind(this);
    this.buildInteractions = this.buildInteractions.bind(this);
    this.showAnimation = this.showAnimation.bind(this);

    this.stopAnimation = this.stopAnimation.bind(this);
    this.resumeAnimation = this.resumeAnimation.bind(this);

    this.getRendererSize = this.getRendererSize.bind(this);
    this.updateAnimationSize = this.updateAnimationSize.bind(this);

    this.state = {
      isLoaded: false,
      showVideo: false,
    };

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
      sprites: {
        frame: null,
        char: null,
        char_eye: {
          left: null,
          right: null,
          sclera: null,
        },
        waves: {
          0: null,
          1: null,
          2: null,
          3: null,
        },
        sky: null,
      },
    };
  }

  componentDidMount() {
    /**
     * Does this also chain load:
     *   - sprites?
     *   - interactions?
     *   - EVENTS?!?
     * Yes.
     * 
     * Should it?
     * 
     * Probably not.
     * 
     * WARNING: Highly impure function,
     * but that's the beauty of custom-
     * ized software. Everything is
     * ~~arbitrarily tied to each
     * other~~ specifically tailored.
     */
    // await this.buildAnimation(); (can await if needed)
    this.buildAnimation();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevParentSize = prevProps.parentSize;
    const { parentSize } = this.props;
    if (
      prevParentSize.width !== parentSize.width ||
      prevParentSize.height !== parentSize.height
    ) this.updateAnimationSize();

    const prevLoaded = prevState.isLoaded;
    const { isLoaded } = this.state;
    if (isLoaded && !prevLoaded) {
      this.ANIMATION_ROOT.appendChild(this.PIXI_APP.renderer.view);
    }
  
    const prevShown = prevState.showVideo;
    const shown = this.state.showVideo;
    if (prevShown !== shown) {
      if (shown) this.stopAnimation();
      else this.resumeAnimation();
    }
  }

  componentWillUnmount() {
    this.PIXI_APP.ticker.stop();
    this.PIXI_APP.renderer.destroy(true);
  }

  renderLoader(parentStyle) {
    const loaderParentStyle = {
      ...parentStyle,
      backgroundColor: 'black',
      color: 'white',
    }
    const loaderStyle = {
      textAlign: 'center',
    };

    return (
      <div style={loaderParentStyle}>
        <div style={loaderStyle}>
          ...pitching, and moaning...
        </div>
      </div>
    );
  }

  renderVideo() {
    const containerStyle = {
      width: '100vw',
      height: '100vh',
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
    }
    const playerStyle = {
      display: 'inline',
      position: 'absolute',
      zIndex: 3,
    };
    const closeButtonStyle = {
      position: 'absolute',
      top: 0,
      right: '0.33em',
      fontSize: '2em',
      cursor: 'pointer',
      color: 'transparent',
      textShadow: '0 0 0 white',
    }

    return (
      <div style={containerStyle}>
        <ReactPlayer
          style={playerStyle}
          url='https://vimeo.com/384489349'
          controls
        />
        <div
          style={closeButtonStyle}
          onClick={() => this.setState({ ...this.state, showVideo: false })}
        >✖</div>
      </div>
    );
  }

  render() {
    const { isLoaded, showVideo } =  this.state;

    const { width, height } = this.props.parentSize;
    const parentStyle = {
      width,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.5s ease-out',
    };

    if (!isLoaded) return this.renderLoader(parentStyle);
    return (
      <React.Fragment>
        <div style={parentStyle} ref={elem => this.ANIMATION_ROOT = elem} />
        {showVideo ? this.renderVideo() : null}
      </React.Fragment>
    );
  }

  async buildAnimation() {
    await this.loadAnimationAssets();
    this.generateSprites();
    this.buildInteractions();
    this.showAnimation();
  }

  async loadAnimationAssets() {
    return new Promise(resolve => {
      const { ASSET } = this;

      PIXI.Loader.shared
        .add(ASSET('frame.png'))
        .add(ASSET('sky.png'))
        .add(ASSET('ss_char.json'))
        .add(ASSET('ss_sea.json'))
        .load(resolve);
    });
  }

  generateSprites() {
    const { ASSET } = this;
    const loader = PIXI.Loader.shared;

    const frame = new PIXI.Sprite(loader.resources[ASSET('frame.png')].texture);
    const sky = new PIXI.Sprite(loader.resources[ASSET('sky.png')].texture);

    /**
     * (char) David Eves himself, oh man.
     * (char._STATES.*)
     * 
     * I'm storing interactive information in
     * _DEFAULT, and _HOVER sprite respectively.
     * 
     * (so texture & position)
     */
    const ss_char = loader.resources[ASSET('ss_char.json')].spritesheet.textures;
    const char = new PIXI.Sprite(ss_char['char.png']);
    const char_eye_sclera = new PIXI.Sprite(PIXI.Texture.WHITE);
    const char_eye_left = new PIXI.Sprite(ss_char['eye_left.png']);
    const char_eye_right = new PIXI.Sprite(ss_char['eye_right.png']);
    (() => {
      char.anchor.set(0.5);
      char.position.set(1611, 1385.50);
      char._STATES = {
        _DEFAULT: {
          texture: ss_char['char.png'],
          position: new PIXI.Point(1611, 1385.50),
        },
        _HOVER: {
          texture: ss_char['char_click.png'],
          position: new PIXI.Point(1611, 1341),
        },
      };
  
      /**
       * The left and right eye store a _CENTER
       * value that acts as the origin for mouse-
       * tracking.
       */
      char_eye_left._CENTER = { x: 1545, y: 1024.50 };
      char_eye_right._CENTER = { x: 1679.50, y: 1023.50 };
  
      char_eye_left.anchor.set(0.5);
      char_eye_right.anchor.set(0.5);
      
      char_eye_left.position.set(char_eye_left._CENTER.x, char_eye_left._CENTER.y);
      char_eye_right.position.set(char_eye_right._CENTER.x, char_eye_right._CENTER.y);

      /**
       * (char_eye_*) Sprites specific to
       * character eye interaction (eyes
       * mouse follow).
       * 
       * _sclera is a flat white rendered
       * below the irises, allowing the
       * illusion of a moving eyeball that
       * tracks user mouse/touch events.
       */
      char_eye_sclera.width = 221;
      char_eye_sclera.height = 79;
      char_eye_sclera.anchor.set(0.5); 
      char_eye_sclera.position.set(1610.50, 1023.50);
    })();

    /**
     * wave_*
     * 
     * Watch 'em go.
     */
    const ss_sea = loader.resources[ASSET('ss_sea.json')].spritesheet.textures;
    const wave_0 = new PIXI.Sprite(ss_sea['wave_1.png']);
    const wave_1 = new PIXI.Sprite(ss_sea['wave_2.png']);
    const wave_2 = new PIXI.Sprite(ss_sea['wave_3.png']);
    const wave_3 = new PIXI.Sprite(ss_sea['wave_4.png']);
    (() => {
      wave_0.anchor.set(0.5);
      wave_0.position.set(2444.50, 1386.50);
  
      wave_1.anchor.set(0.5);
      wave_1.position.set(823.50, 1253.50);
  
      wave_2.anchor.set(0.5);
      wave_2.position.set(1686.50, 1545.50);
  
      wave_3.anchor.set(0.5);
      wave_3.position.set(954, 1604);
    })();

    this.PIXI_APP.sprites = {
      frame,
      char,
      char_eye: {
        left: char_eye_left,
        right: char_eye_right,
        sclera: char_eye_sclera,
      },
      waves: {
        0: wave_0,
        1: wave_1,
        2: wave_2,
        3: wave_3,
      },
      sky,
    };
  }

  buildInteractions() {
    const { renderer, stage, sprites, ticker } = this.PIXI_APP;

    /**
     * @param {x, y} pos 
     */
    const screenPosToCanvas = pos => {
      const { stage } = this.PIXI_APP;
      const { CANVAS_SIZE } = this;

      const xFactor = CANVAS_SIZE.width / stage.width;
      const yFactor = CANVAS_SIZE.height / stage.height;

      /**
       * What are matrices lmao? 🤔
       */
      return {
        x: pos.x * xFactor,
        y: pos.y * yFactor,
      };
    }

    const trackTargetWithEye = target => {
      for (let eye in this.PIXI_APP.sprites.char_eye) {
        if (eye === 'sclera') continue;

        eye = this.PIXI_APP.sprites.char_eye[eye];

        const targetVector = {
          x: target.x - eye.x,
          y: target.y - eye.y,
        };
        const distance = Math.sqrt(Math.pow(targetVector.x, 2) + Math.pow(targetVector.y, 2));

        if (distance < 48) {
          eye.position.set(eye._CENTER.x, eye._CENTER.y);
        } else {
          targetVector.x = targetVector.x / distance;
          targetVector.y = targetVector.y > 1 ? targetVector.y * 2.32 / distance : targetVector.y / distance;
  
          eye.position.set(eye._CENTER.x + (13 * targetVector.x), eye._CENTER.y + (5 * targetVector.y));
        }
      }
    }
    stage.interactive = true;
    stage.on('pointermove', event => {
      trackTargetWithEye(screenPosToCanvas(event.data.global));
    });
    stage.on('pointerdown', event => {
      trackTargetWithEye(screenPosToCanvas(event.data.global));
    })

    const changeCharState = (char, state) => {
      const { texture, position } = char._STATES[state];
      char.texture = texture;
      char.anchor.set(0.5);
      char.position.set(position.x, position.y);
    }

    const char = sprites.char;
    char.interactive = true;
    char.cursor = 'pointer';
    char.on('pointerover', () => changeCharState(char, '_HOVER'));
    char.on('pointerout', () => changeCharState(char, '_DEFAULT'));
    char.on('pointerdown', () => this.setState({ ...this.state, showVideo: true }));

    /**
     * Wave Interactions
     * 
     * Each wave has an _ANIMATION property
     * that stores and configures its own
     * animated properties.
     * 
     * _ANIMATION.func is automatically added
     * to the main ticker (for each wave).
     */
    const waves = sprites.waves;
    (() => {
      waves[0]._ANIMATION = {
        value: 0,
        changeInValue: 0.0035,
        movement: 0.23,
        rotation: 0.0125,
        func: time => {
          const wave = waves[0];
          let { value } = wave._ANIMATION;
          if (value > PIXI.PI_2) value = 0;
          
          const { changeInValue, movement, rotation } = wave._ANIMATION;
          wave.position.y += movement * Math.sin(value);
          wave.rotation = rotation * Math.sin(value);
  
          wave._ANIMATION.value = value + changeInValue * time
        },
      };

      waves[1]._ANIMATION = {
        value: 0,
        changeInValue: 0.0037,
        movement: 0.1,
        rotation: 0.0125,
        func: time => {
          const wave = waves[1];
          let { value } = wave._ANIMATION;
          if (value > PIXI.PI_2) value = 0;
          
          const { changeInValue, movement, rotation } = wave._ANIMATION;
          wave.position.y += movement * Math.cos(value);
          wave.rotation = rotation * Math.sin(value);
  
          wave._ANIMATION.value = value + changeInValue * time
        },
      };

      waves[2]._ANIMATION = {
        value: 0,
        changeInValue: 0.0125,
        movement: 0.3,
        rotation: 0.0225,
        func: time => {
          const wave = waves[2];
          let { value } = wave._ANIMATION;
          if (value > PIXI.PI_2) value = 0;
          
          const { changeInValue, movement, rotation } = wave._ANIMATION;
          wave.position.y += movement * Math.sin(value);
          wave.rotation = rotation * Math.sin(value);
  
          wave._ANIMATION.value = value + changeInValue * time
        },
      };

      waves[3]._ANIMATION = {
        value: 0,
        changeInValue: 0.0175,
        movement: 0.2,
        rotation: 0.0300,
        func: time => {
          const wave = waves[3];
          let { value } = wave._ANIMATION;
          if (value > PIXI.PI_2) value = 0;
          
          const { changeInValue, movement, rotation } = wave._ANIMATION;
          wave.position.y += movement * Math.sin(value);
          wave.rotation = rotation * Math.sin(value);
  
          wave._ANIMATION.value = value + changeInValue * time
        },
      };

      for (let wave in waves) {
        wave = waves[wave];
        ticker.add(wave._ANIMATION.func, PIXI.UPDATE_PRIORITY.INTERACTION);
      }
    })();

    /**
     * Root update -- this runs everything.
     */
    ticker.add(
      () => { renderer.render(stage); },
      PIXI.UPDATE_PRIORITY.HIGH
    );
  }

  showAnimation() {
    const { stage, ticker, sprites } = this.PIXI_APP;

    stage.addChild(sprites.sky);
    for (let wave in sprites.waves) {
      wave = sprites.waves[wave];
      stage.addChild(wave);
    }
    stage.addChild(sprites.char_eye.sclera);
    stage.addChild(sprites.char_eye.left);
    stage.addChild(sprites.char_eye.right);
    stage.addChild(sprites.char);
    stage.addChild(sprites.frame);

    this.updateAnimationSize();
    ticker.start();

    this.setState({
      ...this.state,
      isLoaded: true,
    });
  }

  stopAnimation() {
    this.PIXI_APP.ticker.stop();
  }

  resumeAnimation() {
    this.PIXI_APP.ticker.start();
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
}

export default Animation;
