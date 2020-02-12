import React from 'react';
import debounce from 'lodash.debounce';
import { Size } from 'adaptive-scale/lib-esm';
import Animation from './Animation';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.setWindowSize = debounce(this.setWindowSize.bind(this), 225);

    this.state = {
      windowSize: new Size(window.innerWidth, window.innerHeight),
    };
  }

  /**
   * This function is (debounced and) re-run
   * each time the browser window changes size.
   * 
   * Sets `this.state.windowSize` to current
   * browser viewport size as a Size() object.
   */
  setWindowSize() {
    const newWindowSize = new Size(window.innerWidth, window.innerHeight);
    const prevWindowSize = this.state.windowSize;

    if (
      newWindowSize.width === prevWindowSize.width &&
      newWindowSize.height === prevWindowSize.height
    ) return;

    const windowSize = newWindowSize;
    this.setState({ windowSize });
  }

  componentDidMount() {
    window.addEventListener('resize', this.setWindowSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWindowSize);
  }

  render() {

    /**
     * The main animation component expects a
     * parentSize prop of Size() in order to
     * contrain itself within the viewport.
     */
    return <Animation parentSize={this.state.windowSize} />;
  }
}

export default App;
