import React from 'react';

class Loader extends React.Component {

  render() {
    const parentStyle = {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000',
      color: '#FFFFFF',
      textAlign: 'center',
    };

    return (
      <div style={parentStyle}>
        <div>...pitching, and moaning...</div>
      </div>
    );
  }
}

export default Loader;
