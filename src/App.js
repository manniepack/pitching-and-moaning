import React from 'react';
import Animation from './Animation';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.__CANVAS_SIZE = [3200, 2320];
    this.__ASPECT_RATIO = this.__CANVAS_SIZE[0] / this.__CANVAS_SIZE[1];

    this.fitAnimationToScreen = this.fitAnimationToScreen.bind(this);

    this.state = {
      size: [0, 0],
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.fitAnimationToScreen);
    this.fitAnimationToScreen();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fitAnimationToScreen);
  }

  fitAnimationToScreen() {
    const size = this.state.size;
    const screenSize = [window.innerWidth, window.innerHeight];

    if (screenSize[0] > screenSize[1]) {

      // height is the smaller dimension
      size[0] = screenSize[1] * this.__ASPECT_RATIO
      size[1] = screenSize[1];
    } else {

      // width is the smaller dimension
      size[0] = screenSize[0];
      size[1] = screenSize[0] * this.__ASPECT_RATIO;
    }

    this.setState({ size });
  }

  render = () => <Animation size={this.state.size} />;
}

export default App;
