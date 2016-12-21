import React from 'react';
import moment from 'moment';
import classnames from 'classnames';

import SmartIntervalMixin from '../mixins/smart-interval';
import WidgetMixin from '../mixins/widget';

const WidgetClock = React.createClass({

  mixins: [
    WidgetMixin,
    SmartIntervalMixin
  ],

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

  _tick() {
    let now = moment();
    this.setState({
      now: `${now.format('HH:mm:ss')}`,
      today: `${now.format('dddd, MMMM Do')}`
    });
  },

  renderHeader() {
    return 'Clock 時間';
  },

  renderWidget() {
    return (
      <div
        {...this.props}
        className={classnames(this.props.className, 'clock')}>
        <span className='time'>
          {this.state.now}
        </span>
        <br />
        <span className='day'>
          {this.state.today}
        </span>
      </div>
    );
  }

});

export default WidgetClock;
