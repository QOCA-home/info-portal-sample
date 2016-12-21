import React from 'react';

import classnames from 'classnames';

const Hr = React.createClass({

  propTypes: {
    vertical: React.PropTypes.bool,
    height: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },

  getDefaultProps() {
    return {
      vertical: false
    };
  },

  render() {
    if (!this.props.vertical) {
      return (<hr />);
    }

    return (
      <span
        {...this.props}
        className={classnames(this.props.className, 'vertical-hr')}>
        <span />
      </span>
    );
  }

});

export default Hr;
