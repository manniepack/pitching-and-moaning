import React from 'react';

// id= string
// image= string:url
// depth= int
// style= object:css
function Layer(props) {

  const { id, depth, image } = props;
  const style = {
    position: 'absolute',
    zIndex: depth,
    width: '100%',
    height: '100%',
    background: `url(${image}) no-repeat center / cover`,
  };

  return <div
    id={id}
    style={props.style ? {...props.style, ...style} : style}
  ></div>
}

export default Layer;
