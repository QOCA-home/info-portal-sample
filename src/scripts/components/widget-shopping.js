import React from 'react';
import {
  Input,
  DropdownButton
} from 'react-bootstrap';
import classnames from 'classnames';

// import imgShopping1 from '../../images/shopping-1.jpg';
// import imgShopping2 from '../../images/shopping-2.jpg';
import imgShopping3 from '../../images/order_meal.png'; // order_meal
import imgShopping4 from '../../images/qoca_video.png'; // qoca_video
import imgShopping5 from '../../images/art.png';

import AppiconSelect from '../components/appIconSelect';
import AppIcon from '../components/appIcon';

import WidgetMixin from '../mixins/widget';

let imgList = [
    // {
    //   label: 'pic1',
    //   img: imgShopping1
    // },
    // {
    //   label: 'pic2',
    //   img: imgShopping2
    // },
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

const WidgetStockChart = React.createClass({

  mixins: [WidgetMixin],

  propTypes: {
    appId: React.PropTypes.string,
    adId: React.PropTypes.string,
    header: React.PropTypes.string,
    img: React.PropTypes.object,
    protocol: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      appId: 'asdjirofcd12345',
      bodyStyle: {paddingTop: 0, paddingLeft: 25, opacity: .8},
      adId: 0,
      header: lang.toUpperCase() === 'ZH-CN'? '点餐服务':'點餐服務',
      img: imgShopping3,
      protocol: ''
    };
  },

  getInitialState() {
    return {
      appId: this.props.appId,
      adId: this.props.adId,
      header: this.props.header,
      img: this.props.img,
      protocol: this.props.protocol
    };
  },

  handleWidgetClick() {
    const options = {
      id: this.props.appId,
      name: imgList[this.state.adId].path,
      // protocol: imgList[this.state.adId].protocol
      protocol: this.props.protocol
    };
    // console.log(`window.JSInterface.startApp(${JSON.stringify(options)});`);
    window.JSInterface.startApp(JSON.stringify(options));
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

  handleProtocolChange(event){
    this.setState({
      protocol: event.currentTarget.value
    });
  },

  renderPreferenceBody() {
    let headText1 = lang.toUpperCase() === 'ZH-CN'? '点餐服务':'點餐服務';
    let headText2 = lang.toUpperCase() === 'ZH-CN'? 'QOCA home介绍':'QOCA home介紹';
    let headText3 = 'Programme Schedule';
    let headText4 = 'Meal Delivery Service';

    let currentImgStyle = {
      height: '15%',
      width: 'auto'
    };

    return (
      <div>
        AppId:
        <Input type='text' //text
          placeholder='Input App ID:'
          value={this.state.appId}
          onChange={this.handleAppIdChange}/>
        Set Header by options:
        <Input type='select'
          onChange={this.handleHeaderChange}
          value={this.state.header}>
          <option value={headText1}>Header: 點餐服務</option>
          <option value={headText2}>Header: QOCA home介紹</option>
          <option value={headText3}>Header: Programme Schedule</option>
          <option value={headText4}>Header: Meal Delivery Service</option>
        </Input>
        Set Header manually:
        <Input type='text'
          placeholder='Input Header Here:'
          onChange={this.handleHeaderChange}
          value={this.state.header}/>
        Set App Protocol:
        <Input type='text'
          placeholder='Input protocol Here:'
          onChange={this.handleProtocolChange}
          value={this.state.protocol}/>
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
      appId: this.state.appId,
      adId: this.state.adId,
      header: this.state.header,
      img: this.state.img,
      protocol: this.state.protocol
    });
  },

  renderHeader() {
    return this.state.header;
  },

  renderWidget() {
    const imgStyle = {
      height: 250,
      width: 'auto'
    };

    return (
      <div
        {...this.props}
        onClick={this.handleWidgetClick}
        className={classnames(this.props.className, 'text-left')}>
        <img
          style={imgStyle}
          src={this.state.img}/>
      </div>
    );
  }
});

export default WidgetStockChart;