import React from 'react';
import moment from 'moment';
import classnames from 'classnames';

import '../../styles/clock.scss';
import SmartIntervalMixin from '../mixins/smart-interval';

moment.locale(navigator.language);
console.info(navigator.language);
console.info(moment().utcOffset());
console.info(moment().zone());

const Clock = React.createClass({

  mixins: [
    SmartIntervalMixin
  ],

  propTypes: {
    timezoneOffset: React.PropTypes.number
  },

  getDefaultProps() {
    console.info('=====');
    console.info(moment().utcOffset());
    return {
      timezoneOffset: moment().utcOffset()
    };
  },

  getInitialState() {
    return {
      now: null,
      today: null
    };
  },

  componentWillMount() {
    console.log('clock.js componentWillMount');
    let diff = (1000 - (new Date()).getTime() % 1000);
    this.setSmartInterval(this._tick, 1000, diff, true);
  },

  componentWillReceiveProps(nextProps) {
    if(this.props.timezoneOffset !== nextProps.timezoneOffset){
      setTimeout(this._tick, 0);
    }
  },

  _tick() {
    console.info('***');

    let now = this.state.timezoneOffset === null ?
      moment() : moment().utcOffset(moment().utcOffset());
    console.info(now);
    let jnow = new Date();
    this.setState({
      now: `${now.format('HH:mm')}`,
      today: `${now.format('dddd, MMMM Do')}`,
      tzoffset: `${moment().utcOffset()}`,
      jtzoffset: `${jnow.getTimezoneOffset()}`
    });
  },

  render() {

    return (
      <span
        {...this.props}
        className={classnames(this.props.className, 'clock')}>
        <span className='time'>
          {this.state.now}
        </span>
        <br />
        <span className='day'>
          {this.state.today}
        </span>
        <br />
        <span>
          {this.state.tzoffset};{this.state.jtzoffset}
        </span>
      </span>
    );
  }
});

export default Clock;
