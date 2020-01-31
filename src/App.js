import React from 'react';
import Animation from './Animation';

function getAnimationSize(canvasSize, screenSize, aspectRatio=null) {

  if (!aspectRatio) aspectRatio = canvasSize[0] / canvasSize[1];

  if (screenSize[0] > screenSize[1]) {

    // height is the smaller dimension
    return [screenSize[1] * aspectRatio, screenSize[1]];
  } else {

    // width is the smaller dimension
    return [screenSize[0], screenSize[0] * aspectRatio];
  }
}

/**
  * For now, the App component only acts
  * to load the Animation component. As
  * the app progresses, I'll think about
  * adding other buttons, interactions,
  * and pages. For now, this is fine.
  */
function App() {

  const screenSize = [
    window.innerWidth,
    window.innerHeight
  ];
  const canvasSize = [3200, 2320];

  const size = getAnimationSize(canvasSize, screenSize);
  console.log({ canvasSize, screenSize, size });

  const style = {
    position: 'relative',
    margin: '0 auto',
    zIndex: 1,
    width: size[0],
    height: size[1],
  };
  
  // We'd like to check for window resizes
  // here. The Animation component should
  // attempt to maintain the aspect ratio
  // while staying in the viewport.
  return <Animation
    style={style}
  />;
}

export default App;
