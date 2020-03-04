import React from 'react';
import PropTypes from 'prop-types';

class Animation extends React.Component {

  static propTypes = {
    renderer: PropTypes.object.isRequired,
    stage: PropTypes.object.isRequired,
  };

  domNode = React.createRef();

  componentDidMount() {
    this.domNode.appendChild(this.props.renderer.view);
  }
  
  render() {
    return <div ref={elem => this.domNode = elem} />;
  }
}

export default Animation;
