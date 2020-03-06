import React from 'react';

class Loader extends React.Component {

  render() {
    const loaderStyle = {
      color: '#FFFFFF',
      // textAlign: 'center',
    };

    return (
      <div style={loaderStyle}>
        ...pitching, and moaning...
      </div>
    );
  }
}

export default Loader;
