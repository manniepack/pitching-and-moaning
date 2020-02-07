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
     * Now that I've already built the basic
     * animation a number of times as test,
     * I can begin to design and implement a
     * more complete, final version with all
     * the bells, whistles, and expectations
     * of a finished product.
     * 
     * Some tasks:
     *  1. Finalize animated interactions
     *     and designs.
     *  2. Split design into final pieces.
     *  3. Map out animation containers.
     *  4. Map out interactions.
     *  5. Design any other UI elements:
     *    a. Navigation?
     *    b. Reference and other links?
     *  6. Don't forget about parallax!
     */

     return <Animation parentSize={this.state.windowSize} />;
  }
}

export default App;
