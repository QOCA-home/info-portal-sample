import React from 'react';
import {
  Input,
  DropdownButton
} from 'react-bootstrap';
import classnames from 'classnames';

import imgShopping3 from '../../images/order_meal.png'; // order_meal
import imgShopping4 from '../../images/qoca_video.png'; // qoca_video
import imgShopping5 from '../../images/art.png';

import AppiconSelect from '../components/appIconSelect';
import AppIcon from '../components/appIcon';

import WidgetMixin from '../mixins/widget';

let imgList = [
    {
      label: 'pic1',
      img: imgShopping3
    },
    {
      label: 'pic2',
      img: imgShopping4
    },
    {
      label: 'pic3',
      img: imgShopping5
    }
  ];

let lang = navigator.language;

const WidgetWebSite = React.createClass({

  mixins: [WidgetMixin],

  propTypes: {
    header: React.PropTypes.string,
    img: React.PropTypes.object,
    url: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      bodyStyle: {paddingTop: 0, paddingLeft: 21, opacity: .8},
      header: lang.toUpperCase() === 'ZH-TW'? '中醫大專區':'中醫大專區',
      img: imgShopping3,
      url: 'http://www.amazon.co.jp'
    };
  },

  getInitialState() {
    return {
      header: this.props.header,
      img: this.props.img,
      url: this.props.url
    };
  },

  handleWidgetClick() {
    //TODO
    //
  },

  handlePreferenceChange(event) {
    this.setState({
      adId: event.currentTarget.value
    });
  },

  handleHeaderChange(event) {
    this.setState({
      header: event.currentTarget.value
    });
  },

  handleAppIdChange(event) {
    this.setState({
      appId: event.currentTarget.value
    });
  },

  handlePhotoChange: function(value) {
    // this.state.img = value;
    console.log(value);
    this.setState({
      img: value
    });
  },

  handleUrlChange(event){
    this.setState({
      url: event.currentTarget.value
    });
  },

  renderPreferenceBody() {
    let headText1 = lang.toUpperCase() === 'ZH-TW'? '中國醫藥大學附設醫院':'中國醫藥大學附設醫院';
    let headText2 = lang.toUpperCase() === 'ZH-TW'? '中亞健康網':'中亞健康網';

    let currentImgStyle = {
      height: '15%',
      width: 'auto'
    };

    return (
      <div>
        Set Header by options:
        <Input type='select'
          onChange={this.handleHeaderChange}
          value={this.state.header}>
          <option value={headText1}>Header: 中醫大專區</option>
          <option value={headText2}>Header: 中亞生活網</option>
        </Input>
        Set Header manually:
        <Input type='text'
          placeholder='Input Header Here:'
          onChange={this.handleHeaderChange}
          value={this.state.header}/>
        Set App link:
        <Input type='text'
          placeholder='Input link Here:'
          onChange={this.handleUrlChange}
          value={this.state.url}/>
        Set picture:
        <AppiconSelect
          onClick={this.handlePhotoList}
          onCompleted={this.handlePhotoChange}
          imgList={imgList}>
        </AppiconSelect>
        <img style={currentImgStyle} src={this.state.img}></img>
      </div>
    );
  },

  handlePreferenceSave() {
    this.saveWidget({
      header: this.state.header,
      img: this.state.img,
      url: this.state.url
    });
  },

  renderHeader() {
    return this.state.header;
  },

  renderWidget() {
    const imgStyle = {
      height: 250,
      width: 500
    };

    return (
      <div
        {...this.props}
        className={classnames(this.props.className, 'text-left')}>

        <a href={this.state.url} target='_blank'>
         <img
           style={imgStyle}
           src={this.state.img}/>
        </a>
      </div>
    );
  }
});

export default WidgetWebSite;
