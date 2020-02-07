import React from 'react';
import * as PIXI from 'pixi.js';
import { POLICY, Size, getScaledRect } from 'adaptive-scale/lib-esm';

class Animation extends React.Component {

  constructor(props) {
    super(props);

    this.CANVAS_SIZE = new Size(3200, 2320);

    this.animRootElem = React.createRef();
    this.updateAnimationSize = this.updateAnimationSize.bind(this);
    this.pixiApp = {
      renderer: new PIXI.autoDetectRenderer({
        antialias: true,
        transparent: false,
        background: 0x000,
      }),
      stage: new PIXI.Container(),
      ticker: new PIXI.Ticker(),
    };

    this.state = { animationSize: this.CANVAS_SIZE };
  }

  updateAnimationSize() {
    const { renderer } = this.pixiApp;

    const newSize = getScaledRect({
      container: this.props.parentSize,
      target: this.CANVAS_SIZE,
      policy: POLICY.ShowAll,
    });
    const prevSize = this.state.animationSize;

    if (
      newSize.width === prevSize.width &&
      newSize.height === prevSize.height
    ) return;

    const animationSize = newSize;
    renderer.resize(animationSize.width, animationSize.height);
    this.setState({ animationSize });
  }

  componentDidMount() {
    const { renderer, stage, ticker } = this.pixiApp;

    this.updateAnimationSize();

    ticker.add(() => {
      renderer.render(stage);
    }, PIXI.UPDATE_PRIORITY.LOW);
    ticker.start();

    this.animRootElem.appendChild(renderer.view);
  }

  componentWillUnmount() {
    this.pixiApp.ticker.stop();
    this.pixiApp.renderer.stop();
  }

  componentDidUpdate(prevProps) {
    const prevParentSize = prevProps.parentSize;
    const nextParentSize = this.props.parentSize;

    if (
      prevParentSize.width === nextParentSize.width &&
      prevParentSize.height === nextParentSize.height
    ) return;

    this.updateAnimationSize();
  }

  render() {
    const { width, height } = this.props.parentSize;
    const parentStyle = {
      width,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    return <div style={parentStyle} ref={elem => this.animRootElem = elem} />;
  }
}

export default Animation
