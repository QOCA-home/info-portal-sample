import React from 'react';
import classnames from 'classnames';
import LunarCalendarZh from 'lunar-calendar-zh';
import 'lunar-calendar-zh/hl/hl2015';
import 'lunar-calendar-zh/hl/hl2016';
import 'lunar-calendar-zh/hl/hl2017';
import 'lunar-calendar-zh/hl/hl2018';
import 'lunar-calendar-zh/hl/hl2019';
import 'lunar-calendar-zh/hl/hl2020';

import '../../styles/lunar-calendar.scss';
import SmartIntervalMixin from '../mixins/smart-interval';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const LunarCalendar = React.createClass({

  propTypes: {
    style: React.PropTypes.node
  },

  mixins: [
    SmartIntervalMixin
  ],

  getInitialState() {
    return {
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
    console.log('_updateTime');
    const now = new Date();
    const lunarCalendar = LunarCalendarZh.calendar(now.getFullYear(), now.getMonth() + 1 );
    const lunarToday = lunarCalendar.monthData[now.getDate() - 1];

    this.setState({
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

  render() {
    const yiList = this.state.yi.split('.');
    const jiList = this.state.ji.split('.');
    let yiString  = '';
    if(yiList[0]) {
      yiString = yiList[0];
      if(yiList[1])
        yiString = yiString+'.'+yiList[1];
    }

    let jiString = '';
    if(jiList[0]) {
      jiString = jiList[0];
      if(jiList[1])
        jiString = jiString+'.'+jiList[1];
    }

    return (
      <div
        {...this.props}
        className={classnames(this.props.className, 'lunar-calendar')}>
        <div> {`農曆 ${this.state.lunarMonthName}${this.state.lunarDayName}`}</div>
        <div>{`宜 ${yiString}`}</div>
        <div>{`忌 ${jiString}`}</div>
      </div>
    );
  }
});

export default LunarCalendar;
