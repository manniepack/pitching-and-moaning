import React from 'react';

// id= string
// position= arr[int, int]
// rotation= int:deg
// image= string:url
function Layer(props) {

  // TODO:
  // soon use props.position and
  // props.rotation to apply tra-
  // nsformations.
  const style = {
    position: 'absolute',
    zIndex: props.depth,
    width: '100%',
    height: '100%',
    background: `url(${props.image}) no-repeat center / cover`,
  }

  return <div
    id={props.id}
    style={style}
  ></div>
}

export default Layer;
