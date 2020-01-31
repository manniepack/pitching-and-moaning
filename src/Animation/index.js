import React from 'react';

import LAYER__1_FRAME from './Layer__1_Frame';
// import LAYER__2_CHARACTER from './Layer__2_Character';
// import LAYER__3_WAVES from './Layer__3_Waves';
// import LAYER__4_SKY from './Layer__4_Sky';

// size= arr[int, int]
// style= @css (size, mostly)
class Animation extends React.Component {

  constructor(props) {
    super(props);

    // TODO: get timer for delta
    this.state = { delta: undefined };
  }

  render() {
    return (
      <div
        id='animation'
        style={this.props.style}
      >
        <LAYER__1_FRAME delta={this.state.delta} />
        {/*<LAYER__2_CHARACTER delta={this.state.delta} />
        <LAYER__3_WAVES delta={this.state.delta} />
        <LAYER__4_SKY delta={this.state.delta} />*/}
      </div>
    );
  }
}

export default Animation;
