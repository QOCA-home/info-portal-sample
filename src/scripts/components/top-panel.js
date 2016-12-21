import React from 'react';
import {
  Col
} from 'react-bootstrap';

import '../../styles/top-panel.scss';

import Clock from './clock';
import LunarCalendar from './lunar-calendar';
import LunarCalendarCn from './lunar-calendar';

import Weather from './weather';
import Hr from './hr';
import $ from 'jquery';
import SmartIntervalMixin from '../mixins/smart-interval';

const NEXT_SIDE_INFO_INTERVAL = 10 * 1000;
const SIDE_INFOS_DEFAULT = [
  Weather,
  LunarCalendar
];

const SIDE_INFOS_CN = [
  Weather,
  LunarCalendarCn
];

const SIDE_INFOS_ENG = [
  Weather
];

var SIDE_INFOS = SIDE_INFOS_DEFAULT;

function _setSideInfoByLauguage() {
  const language = navigator.language;
  if(language) {
    switch(language) {
      case 'zh-CN':
      case 'zh-cn':
        SIDE_INFOS = SIDE_INFOS_CN;
        break;

      case 'en-US':
      case 'en-us':
      SIDE_INFOS = SIDE_INFOS_ENG;
        break;

      default:
        SIDE_INFOS = SIDE_INFOS_DEFAULT;
        break;
    }
  }
};



const TopPanel = React.createClass({

  mixins: [
    SmartIntervalMixin
  ],

  propTypes: {
    degreeUnit: React.PropTypes.oneOf(['c', 'f', 'k']),
    timezoneOffset: React.PropTypes.number
  },

  getInitialState() {
    return {
      sideInfoIndex: 0
    };
  },

  componentDidMount() {
    _setSideInfoByLauguage();
    this.$component = $(React.findDOMNode(this.refs.component));
    if(SIDE_INFOS.length > 1) {
      this.setSmartInterval(this._nextSideInfo, NEXT_SIDE_INFO_INTERVAL);
    }
  },


  _nextSideInfo() {
    this.$component.animate({opacity: 0}, ()=>{
      this.setState({
        sideInfoIndex: (this.state.sideInfoIndex + 1) % SIDE_INFOS.length
      });
      this.$component.animate({opacity: 1});
    });
  },

  render() {
    return (
      <Col
        {...this.props}
        onClick={this._nextSideInfo}
        className='top-panel'>
        <div className='component' style={{width: '40%'}} ref='component'>
          {
            SIDE_INFOS.map((element, index) => {
              return React.createElement(element, {
                key: index,
                degreeUnit: this.props.degreeUnit,
                style: {
                  display: this.state.sideInfoIndex === index ? 'block' : 'none'
                }
              });
            })
          }
        </div>
      </Col>
    );
  }

});

export default TopPanel;