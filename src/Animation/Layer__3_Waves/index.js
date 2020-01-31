import React from 'react';
import Layer from '../Layer';

class LAYER__3_WAVES extends React.Component {

  constructor(props) {
    super(props);

    const animationStyles = {
      animationName: 'RockAndBob',
      animationTimingFunction: 'ease-in',
      animationIterationCount: 'infinite',
    };
    // The wave ID is used to get any
    // background image in the format:
    // `./waves_${id}.png` (relative to
    // this component).
    //
    // Please note that the animation
    // is designed with a __WAVES.length
    // of exactly 4.
    this.__WAVES = {
      0: {
        id: '0-1',
        style: {
          ...animationStyles,
          animationDuration: '15s',
          transformOrigin: '75% 60% 0',
        },
      },
      1: {
        id: '0-2',
        style: {
          ...animationStyles,
          animationDuration: '18s',
          transformOrigin: '22% 57% 0',
        },
      },
      2: {
        id: '1-1',
        style: {
          ...animationStyles,
          animationDuration: '10s',
          transformOrigin: '53% 72% 0',
        },
      },
      3: {
        id: '2-1',
        style: {
          ...animationStyles,
          animationDuration: '9s',
          transformOrigin: '22% 60% 0',
        },
      },
    };
  }

  render() {

    let startingDepth = 4;
    const waves = Object.keys(this.__WAVES).reduce((accum, val) => {
      const { id, style } = this.__WAVES[val];

      return [
        ...accum,
        <Layer
          key={id}
          id={`animation__waves_${id}`}
          image={require(`./waves_${id}.png`)}
          depth={startingDepth++}
          style={style}
        />
      ];
    }, []);

    return <React.Fragment>
      <style>{`
        @keyframes RockAndBob {
          0% {
            transform: translateY(-1%) rotate(-2deg);
          }
          50% {
            transform: translateY(1%) rotate(2deg);
          }
          100% {
            transform: translateY(-1%) rotate(-2deg);
          }
        }
      `}</style>
      {waves}
    </React.Fragment>;
  }
}

export default LAYER__3_WAVES;
