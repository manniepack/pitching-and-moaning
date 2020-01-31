import React from 'react';
import Layer from '../Layer';

// delta= float
class LAYER__3_WAVES extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      waves: [
        {
          id: '0-1',
          position: null,
          rotation: null,
        },
        {
          id: '0-2',
          position: null,
          rotation: null,
        },
        {
          id: '1-1',
          position: null,
          rotation: null,
        },
        {
          id: '2-1',
          position: null,
          rotation: null,
        },
      ],
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

    let startingDepth = 4;
    const waves = [];
    this.state.waves.forEach(wave => waves.push(
      <Layer
        key={wave.id}
        id={`animation__waves_${wave.id}`}
        position={wave.position}
        rotation={wave.rotation}
        image={require(`./waves_${wave.id}.png`)}
        depth={startingDepth++}
      />
    ));

    return <React.Fragment>
      {waves}
    </React.Fragment>;
  }
}

export default LAYER__3_WAVES;
