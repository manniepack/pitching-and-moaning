import React from 'react';

// id= string
// position= arr[int, int]
// rotation= int:deg
// image= string:url
// depth= int
function Layer(props) {

  const { depth, image, position, rotation } = props;
  const style = {
    position: 'absolute',
    zIndex: depth,
    width: '100%',
    height: '100%',
    background: `url(${image}) no-repeat center / cover`,
    transform: `translate(${position[0]}px, ${position[1]}px) rotate(${rotation}deg)`,
  }

  return <div
    id={props.id}
    style={style}
  ></div>
}

export default Layer;
