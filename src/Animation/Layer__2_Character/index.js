import React from 'react';
import Layer from '../Layer';
import Image__Frame from './character.png';

// delta= float
class Layer__2_Character extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      position: [0, 0],
      rotation: 0,
    };

    this.animate = this.animate.bind(this);
  }

  animate() {

    // TODO;
    // modulate position and rotation
    return;
  }

  render() {
    
    this.animate();

    return <Layer
      id='animation__character'
      position={this.state.position}
      rotation={this.state.rotation}
      image={Image__Frame}
      depth={8}
    />
  }
}

export default Layer__2_Character;
