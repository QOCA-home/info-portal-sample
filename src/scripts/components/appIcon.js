import React from 'react';

const AppIcon = React.createClass({

  propTypes: {
    img: React.PropTypes.string,
    label: React.PropTypes.string,
    onCompleted: React.PropTypes.object.isRequired,
    clicked: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      bodyStyle: {paddingTop: 0, paddingLeft: 25, opacity: .8},
      img: null,
      lable: null
    };
  },

  getInitialState() {
    return {
      img: this.props.img,
      label: this.props.label,
      onCompleted: this.props.onCompleted
    };
  },

  handlePhotoClick: function(e) {
    this.props.onCompleted(this.state.img);
  },

  render() {
    const iconStyle = {
      height: 50,
      width: 'auto',
      paddingLeft: 2,
      paddingRight: 2,
      paddingTop:2,
      paddingbottom: 2

    };
    return (
      <div
        {...this.props}
        onClick={this.handlePhotoClick}>
        <img style={iconStyle} src={this.state.img} >{this.state.label}</img>
      </div>
    );
  }
});

export default AppIcon;
