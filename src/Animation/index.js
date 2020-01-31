import React from 'react';

import LAYER__1_FRAME from './Layer__1_Frame';
import LAYER__2_CHARACTER from './Layer__2_Character';
import LAYER__3_WAVES from './Layer__3_Waves';
import LAYER__4_SKY from './Layer__4_Sky';

/** 
  * The Animation components aims only
  * to keep track of the time and pro-
  * per scaling for the user's screen.
  *
  * size= arr[2]
  */
class Animation extends React.Component {

  constructor(props) {
    super(props);

    // TODO: set timer for delta
    this.state = { delta: undefined };
  }

  render() {

    const style = {
      position: 'relative',
      margin: '0 auto',
      zIndex: 1,
      width: `${this.props.size[0]}px`,
      height: `${this.props.size[1]}px`,
    };

    return (
      <div
        id='animation'
        style={style}
      >
        <LAYER__1_FRAME delta={this.state.delta} />
        <LAYER__2_CHARACTER delta={this.state.delta} />
        <LAYER__3_WAVES delta={this.state.delta} />
        <LAYER__4_SKY delta={this.state.delta} />
      </div>
    );
  }
}

export default Animation;
