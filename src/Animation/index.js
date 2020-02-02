import React from 'react';

class Animation extends React.Component {

  constructor(props) {
    super(props);

    this.__RENDER_SIZE = {
      width: 3200,
      height: 2320,
    };
  }


  render() {

    const style = {
      position: 'relative',
      margin: '0 auto',
    };

    return (
      <div
        id='animation'
        style={style}
      >
      </div>
    );
  }
}

export default Animation;
