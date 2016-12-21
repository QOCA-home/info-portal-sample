import React from 'react';
import WidgetMixin from '../mixins/widget';
import {
  DropdownButton
} from 'react-bootstrap';

import AppIcon from '../components/appIcon';

const AppiconSelect = React.createClass({

  propTypes: {
    adId: React.PropTypes.string,
    onCompleted: React.PropTypes.object.isRequired,
    imgList: React.PropTypes.object.isRequired,
    currentImg: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      bodyStyle: {paddingTop: 0, paddingLeft: 25, opacity: .8},
      adId: 0,
      onCompleted: null,
      imgList: null,
      currentImg: null
    };
  },

  getInitialState() {
    return {
      adId: this.props.adId,
      onCompleted: this.props.onCompleted,
      visible: true,
      imgList: this.props.imgList,
      currentImg: null
    };
  },

  toggleVisible() {
    this.setState({visible: !this.state.visible});
  },

  handlePhotoChange(value) {
    console.log(value);
    //toggle Visibility
    this.props.onCompleted(value);
    this.setState({
      visible: !this.state.visible,
      currentImg: value
      });
  },

  handleChangeAgain() {
    this.setState({
      visible: !this.state.visible,
      currentImg: null
      });
  },

  render() {
    let currentImgStyle = {
      height: '30%',
      width: 'auto'
    };

    // if (!this.state.visible) {
    //   return (
    //     <div
    //       {...this.props}
    //       onClick={this.toggleVisible}
    //       style={{width: 200, height: '6%'}}>
    //       <img
    //         src={this.state.currentImg}
    //         style={currentImgStyle}/>
    //     </div>
    //   );
    // }

    if(this.state.currentImg) {
      return(
        <DropdownButton onClick={this.handleChangeAgain}>
        {
          // <div
          //   // {...this.props}
          //   style={{width: 200, height: '100%'}}>
          //   <img
          //     src={this.state.currentImg}
          //     style={currentImgStyle}/>
          // </div>
        }
        </DropdownButton>
      );
    }

    return(
      <DropdownButton>
      {
        this.state.imgList.map((result) => {
          return(
            <AppIcon
              img={result.img}
              label={result.label}
              onCompleted= {this.handlePhotoChange}/>
          );
        })
      }
      </DropdownButton>);
    }
});

export default AppiconSelect;
