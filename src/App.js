import React from 'react';
import Animation from './Animation';

class App extends React.Component {

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
    return (
      <div id="app">
        <Animation className="column" />
      </div>
    );
  }
}

export default App;
