import React from 'react';
import Layer from '../Layer';
import Image__Frame from './frame.png';

// delta= float
class Layer__1_Frame extends React.Component {

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
      id='animation__frame'
      position={this.state.position}
      rotation={this.state.rotation}
      image={Image__Frame}
      depth={9}
    />
  }
}

export default Layer__1_Frame;
