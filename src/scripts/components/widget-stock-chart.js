import React from 'react';

import WidgetMixin from '../mixins/widget';
import SmartIntervalMixin from '../mixins/smart-interval';

const UPDATE_STOCK_INTERVAL = 5 * 60 * 1000;

const WidgetStockChart = React.createClass({

  mixins: [
    WidgetMixin,
    SmartIntervalMixin
  ],

  propTypes: {
    symbol: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      symbol: '^TWII',
      width: 432,
      height: 235,
      bodyStyle: {paddingTop: 0, paddingLeft: 25, opacity: .8}
    };
  },

  getInitialState() {
    return {
      chartSrc: null
    };
  },

  componentWillMount() {
    this.setSmartInterval(this._updateSrc, UPDATE_STOCK_INTERVAL, null, true);
  },

  _updateSrc() {
    this.setState({
      chartSrc: `http://chart.finance.yahoo.com/v?s=${window.escape(this.props.symbol)}&lang=zh-TW&region=TW&width=${this.props.width}&height=${this.props.height}&_=${(new Date()).getTime()}`
    });
  },

  renderHeader() {
    return 'Stocks 股市大盤';
  },

  renderWidget() {
    return (
      <a
        href='https://tw.stock.yahoo.com/' target='_blank'>
        <img style={{opacity: '0.5'}} src={this.state.chartSrc} />
      </a>
    );
  }

});

export default WidgetStockChart;
