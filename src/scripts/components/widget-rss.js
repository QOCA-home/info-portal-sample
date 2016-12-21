import React from 'react';
import $ from 'jquery';
import {
  Input
} from 'react-bootstrap';
import _ from 'lodash';

import WidgetMixin from '../mixins/widget';
import SmartIntervalMixin from '../mixins/smart-interval';

const feedListTW = [
  {
    src: 'https://news.google.com/news?pz=1&cf=all&ned=tw&hl=zh-TW&output=rss&q=國際時事',
    optionName: '關鍵字 國際時事',
    header: 'News 國際時事'
  },
  {
    src: 'https://news.google.com/news?pz=1&cf=all&ned=tw&hl=zh-TW&output=rss&q=產經新聞',
    optionName: '關鍵字 產經新聞',
    header: 'News 產經新聞'
  },
  {
    src: 'https://news.google.com/news?pz=1&cf=all&ned=tw&hl=zh-TW&output=rss&q=養生美容',
    optionName: '關鍵字 養生美容',
    header: 'News 養生美容'
  },
  {
    src: 'https://news.google.com/news?pz=1&cf=all&ned=tw&hl=zh-TW&topic=m&output=rss',
    optionName: '新聞 健康',
    header: 'News 健康'
  },
  {
    src: 'https://news.google.com/news?pz=1&cf=all&ned=tw&hl=zh-TW&topic=b&output=rss',
    optionName: '新聞 財經',
    header: 'News 財經'
  },
  {
    src: 'https://hk.news.yahoo.com/rss/hong-kong',
    optionName: 'Yahoo香港新聞',
    header: 'Yahoo香港新聞'
  },
  {
    src: 'http://rss.appleactionews.com/rss.xml',
    optionName: '蘋果香港即時新聞',
    header: '蘋果香港即時新聞'
  },
  {
    src: 'http://news.baidu.com/n?cmd=1&class=civilnews&tn=rss',
    optionName: '百度国内焦点',
    header: '百度国内焦点'
  },
  {
    src: 'http://news.baidu.com/n?cmd=1&class=internet&tn=rss',
    optionName: '百度互联网焦点',
    header: '百度互联网焦点'
  },
  {
    src: 'http://news.baidu.com/n?cmd=1&class=technnews&tn=rss',
    optionName: '百度科技焦点',
    header: '百度科技焦点'
  },
  {
    src: 'http://news.baidu.com/n?cmd=7&loc=0&name=%B1%B1%BE%A9&tn=rss',
    optionName: '百度北京地区新闻',
    header: '百度北京地区新闻'
  },
  {
    src: 'http://news.baidu.com/n?cmd=7&loc=2354&name=%C9%CF%BA%A3&tn=rss',
    optionName: '百度上海地区新闻',
    header: '百度上海地区新闻'
  },
  {
    src: 'http://news.baidu.com/n?cmd=7&loc=9337&name=%CF%E3%B8%DB&tn=rss',
    optionName: '百度香港地区新闻',
    header: '百度香港地区新闻'
  }
];

const feedListCN = [
  {
    src: 'https://hk.news.yahoo.com/rss/hong-kong',
    optionName: 'Yahoo香港新聞',
    header: 'Yahoo香港新聞'
  },
  {
    src: 'http://rss.appleactionews.com/rss.xml',
    optionName: '蘋果香港即時新聞',
    header: '蘋果香港即時新聞'
  },
  {
    src: 'http://news.baidu.com/n?cmd=1&class=civilnews&tn=rss',
    optionName: '百度国内焦点',
    header: '百度国内焦点'
  },
  {
    src: 'http://news.baidu.com/n?cmd=1&class=internet&tn=rss',
    optionName: '百度互联网焦点',
    header: '百度互联网焦点'
  },
  {
    src: 'http://news.baidu.com/n?cmd=1&class=technnews&tn=rss',
    optionName: '百度科技焦点',
    header: '百度科技焦点'
  },
  {
    src: 'http://news.baidu.com/n?cmd=7&loc=0&name=%B1%B1%BE%A9&tn=rss',
    optionName: '百度北京地区新闻',
    header: '百度北京地区新闻'
  },
  {
    src: 'http://news.baidu.com/n?cmd=7&loc=2354&name=%C9%CF%BA%A3&tn=rss',
    optionName: '百度上海地区新闻',
    header: '百度上海地区新闻'
  },
  {
    src: 'http://news.baidu.com/n?cmd=7&loc=9436&name=%B0%C4%C3%C5&tn=rss',
    optionName: '百度澳门地区新闻',
    header: '百度澳门地区新闻'
  },
  {
    src: 'http://news.baidu.com/n?cmd=7&loc=9337&name=%CF%E3%B8%DB&tn=rss',
    optionName: '百度香港地区新闻',
    header: '百度香港地区新闻'
  }
  // {
  //   src: 'http://news.google.com.hk/news?pz=1&cf=all&ned=hk&hl=zh-TW&output=rss',
  //   optionName:1,
  //   header: ''
  // },
  //   {
  //   src: 'http://news.baidu.com/n?cmd=7&loc=9436&name=%B0%C4%C3%C5&tn=rss',
  //   optionName: '百度澳门地区新闻',
  //   header: '百度澳门地区新闻'
  // },
];

let feedList = feedListTW;//navigator.language.toUpperCase() === 'ZH-TW' ? feedListTW : feedListCN;

const WidgetRss = React.createClass({

  mixins: [
    WidgetMixin,
    SmartIntervalMixin
  ],

  propTypes: {
    src: React.PropTypes.string,
    header: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      src: feedList[0].src,
      header: feedList[0].header,
      bodyStyle: {padding: 0}
    };
  },

  getInitialState() {
    const selectedFeedIndex = _.chain(feedList)
      .pluck('src')
      .indexOf(this.props.src)
      .value();

    return {
      selectedFeedIndex,
      news: []
    };
  },

  componentWillMount() {
    this.setSmartInterval(this._fetchFeed, 5 * 60 * 1000, null, true);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this._fetchFeed(nextProps.src);
    }
  },

  _fetchFeed(_src) {
      // const feedIndex = typeof _feedIndex === 'undefined' ?
      //   this.props.feedIndex : _feedIndex;
      const src = _src || this.props.src;
      $.get(src, (data) => {
          const itemsXml = data.getElementsByTagName ? data : $.parseXML(data);
          const items = itemsXml.getElementsByTagName('item');
          const length = items.length;
          let news = [];
          for (let i = 0; i < length; i++) {
            const el = items[i];
            news.push({
              title: el.querySelector('title').textContent,
              description: el.querySelector('description').textContent,
              link: el.querySelector('link').textContent
            });
          }
          this.setState({news});
      });
    },

  handlePreferenceChange(event) {
    this.setState({
      selectedFeedIndex: event.currentTarget.value
    });
  },

  renderPreferenceBody() {
    return (
      <Input
        type='select'
        onChange={this.handlePreferenceChange}
        value={this.state.selectedFeedIndex}>
        {
          feedList.map((item, index) => {
            return (
              <option key={index} value={index}>{item.optionName}</option>
            );
          })
        }
      </Input>
    );
  },

  handlePreferenceSave() {
    this.saveWidget(feedList[this.state.selectedFeedIndex]);
  },

  renderHeader() {
    return this.props.header;
  },

  renderNewsItem(item, index) {
    return (
      <li key={index} className='widget-rss-title'>
        <a href={item.link} target='_blank'>
          <span className='bullet'>&#9642;</span>
          &nbsp;{item.title}
        </a>
      </li>
    );
  },

  renderWidget() {
    const style = {
      overflowX: 'hidden',
      overflowY: 'scroll',
      height: '11.8em',
      fontSize: '1.5em',
      width: '100%'
    };

    return (
      <ul {...this.props} style={style}>
        {this.state.news.map(this.renderNewsItem)}
      </ul>
    );
  }

});

export default WidgetRss;
