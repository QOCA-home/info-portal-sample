import React from 'react';
import LunarCalendar from 'lunar-calendar-zh';
import 'lunar-calendar-zh/hl/hl2008';
import 'lunar-calendar-zh/hl/hl2009';
import 'lunar-calendar-zh/hl/hl2010';
import 'lunar-calendar-zh/hl/hl2011';
import 'lunar-calendar-zh/hl/hl2012';
import 'lunar-calendar-zh/hl/hl2013';
import 'lunar-calendar-zh/hl/hl2014';
import 'lunar-calendar-zh/hl/hl2015';
import 'lunar-calendar-zh/hl/hl2016';
import 'lunar-calendar-zh/hl/hl2017';
import 'lunar-calendar-zh/hl/hl2018';
import 'lunar-calendar-zh/hl/hl2019';
import 'lunar-calendar-zh/hl/hl2020';
import Icon from 'react-fa';

import SmartIntervalMixin from '../mixins/smart-interval';
import WidgetMixin from '../mixins/widget';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

let weekdays = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六'
];

const WidgetLunarCalendar = React.createClass({

  mixins: [
    WidgetMixin,
    SmartIntervalMixin
  ],

  getInitialState() {
    return {
      year: 2014,
      month: 2,
      date: 1,
      weekday: '星期一',
      ganZhiYear: '癸巳',
      lunarMonthName: '正月',
      lunarDayName: '初二',
      term: '雨水',
      festival: '放假'
    };
  },

  componentWillMount() {
    const diff = ONE_DAY_MS - (new Date()).getTime() % ONE_DAY_MS;
    this.setSmartInterval(this._updateTime, ONE_DAY_MS, diff, true);
  },

  _updateTime() {
    const now = new Date();
    const lunarCalendar = LunarCalendar.calendar(now.getFullYear(), now.getMonth() + 1 );
    const lunarToday = lunarCalendar.monthData[now.getDate() - 1];

    this.setState({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      date: now.getDate(),
      weekday: weekdays[now.getDay()],
      ganZhiYear: lunarToday.GanZhiYear,
      lunarMonthName: lunarToday.lunarMonthName,
      lunarDayName: lunarToday.lunarDayName,
      term: lunarToday.term,
      festival: lunarToday.solarFestival || lunarToday.lunarFestival
    });
    this._getHuangLi(now);
  },

  _formateDayD4(month, day) {
    month = month + 1;
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    return 'd' + month + day;
  },

  _getHuangLi(now) {
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    let hl;
    hl = window.HuangLi['y' + year][this._formateDayD4(month, day)];
    this.setState({
      yi: hl.y,
      ji: hl.j
    });
  },

  renderWidget() {
    let circle = {
      padding: 5,
      borderRadius: '2em',
      width: '2em',
      border: '1px solid white'
    };
    return (
      <div>
        <label>
          {`${this.state.year}年${this.state.month}月`}
          <br />
          {`歲次${this.state.ganZhiYear} ${this.state.lunarMonthName}${this.state.lunarDayName}`}
        </label>
        <h1 className='text-center' style={{fontSize: '5em'}}>
          {this.state.date}
        </h1>
        <h3 className='text-center'>
          {this.state.weekday}
        </h3>
        <h3 className='pull-right text-right' style={{margin: 0}}>
          <div> 大暑{this.state.term}</div>
          <div>{this.state.festival}</div>
        </h3>
        <h5 className='pull-left'>
          <div>
            <label style={circle}>宜</label>&nbsp;{this.state.yi}
          </div>
          <div>
            <label style={circle}>忌</label>&nbsp;{this.state.ji}
          </div>
        </h5>
        <div style={{clear: 'both'}} />
        <br />
        <Icon name='calendar' className='pull-left' size='2x'/>
      </div>
    );
  }
});

export default WidgetLunarCalendar;
