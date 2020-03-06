import React from 'react';
import PropTypes from 'prop-types';
import * as PIXI from 'pixi.js';

import { GetAssetURI } from '../utils/assets';

class Animation extends React.Component {

  static propTypes = {
    root: PropTypes.object.isRequired,
    stage: PropTypes.object.isRequired,
  };

  domNode = React.createRef();

  componentDidMount() {
    this.domNode.appendChild(this.props.root);

    //
    // Fetch pre-loaded asset resources
    //
    const resources = PIXI.Loader.shared.resources;

    const texture_frame = resources[GetAssetURI('frame.png')];
    const texture_sky = resources[GetAssetURI('sky.png')];
    
    const spritesheet_char = resources[GetAssetURI('spritesheet_char.json')].textures;
    const spritesheet_waves = resources[GetAssetURI('spritesheet_waves.json')].textures;
    const spritesheet_lightning = resources[GetAssetURI('spritesheet_lightning.json')].textures;

    this.resources = {
      frame: texture_frame,
      sky: texture_sky,
      char: {
        default: spritesheet_char['char.png'],
        interact: spritesheet_char['char_hover.png'],
        eyes: {
          sclera: PIXI.Texture.WHITE,
          left: spritesheet_char['eye_left.png'],
          right: spritesheet_char['eye_right.png'],
        },
      },
      waves: {
        1: spritesheet_waves['wave1.png'],
        2: spritesheet_waves['wave2.png'],
        3: spritesheet_waves['wave3.png'],
        4: spritesheet_waves['wave4.png'],
      },
      lightning: {
        1: spritesheet_lightning['lightning1.png'],
        2: spritesheet_lightning['lightning2.png'],
        3: spritesheet_lightning['lightning3.png'],
      },
    };
  }
  
  render() {
    return <div ref={elem => this.domNode = elem} />;
  }
}

export default Animation;
