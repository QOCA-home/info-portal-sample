import React from 'react';
import $ from 'jquery';
import {
  Input,
  Modal,
  Button
} from 'react-bootstrap';
import _ from 'lodash';

import actions from '../actions/actions';

import WidgetMixin from '../mixins/widget';
import SmartIntervalMixin from '../mixins/smart-interval';
import ImageGallery from '../utils/ImageGallery.react';
import '../../styles/image-gallery.scss';
import '../../styles/notification.css';

const images = [
  {
    original: 'http://lorempixel.com/1000/600/nature/1/',
    //thumbnail: 'http://lorempixel.com/250/150/nature/1/',
    originalClass: 'featured-slide',
    thumbnailClass: 'featured-thumb',
    description: 'Custom class for slides & thumbnails'
  },
  {
    original: 'http://lorempixel.com/1000/600/nature/2/',
    //thumbnail: 'http://lorempixel.com/250/150/nature/2/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing...'
  },
  {
    original: 'http://lorempixel.com/1000/600/nature/3/',
    //thumbnail: 'http://lorempixel.com/250/150/nature/3/'
  },
  {
    original: 'http://lorempixel.com/1000/600/nature/4/',
    //thumbnail: 'http://lorempixel.com/250/150/nature/4/'
  }
];

// let feedList = notificationList;//navigator.language.toUpperCase() === 'ZH-TW' ? notificationList : feedListCN;
var isClick = false;
var currentIndex = 0;

const WidgetNotification = React.createClass({

  mixins: [
    WidgetMixin,
    SmartIntervalMixin
  ],

  propTypes: {
    description: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      bodyStyle: {padding: 0}
    };
  },

  getInitialState() {
    return {
      // selectedFeedIndex,
      notification: [],
      isPlaying: true,
      slideInterval: 10000,
      showThumbnails: false,
      showIndex: false,
      showNav: true,
      showBullets: false,
      news:[]
    };
  },

  componentWillMount() {
    this.setSmartInterval(this._fetchNotification, 5 * 60 * 1000, null, true);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this._fetchNotification(nextProps.src);
      console.log('componentWillReceiveProps');
    }
  },

  _fetchNotification(_src) {
    const src = _src || this.props.src;
    var _headers = {
      'X-Parse-Developer-Key': '7045347d5d37662c217e675e587b362d2e3f2a2a4d71425b3a2d426324'
    };
    $.ajax({
       url: "https://api-jaybo-sx.parseapp.com/developers/channels/lgncGLOtgK/posts",
       type: "GET",
       // dataType: 'json',
       headers: _headers,
       context: this.parent,
       //another way to set header
       //beforeSend: function(xhr){xhr.setRequestHeader('X-Parse-Developer-Key', '7045347d5d37662c217e675e587b362d2e3f2a2a4d71425b3a2d426324');},

       success: function(result) {
        //TODO package result into a store, force portal update
        console.log('success'+result.result.length);
        //TODO
        // action.saveContentWidget(result)
        //
        debugger
        const items = result.result;
        const length = result.result.length;
        let news = [];
        for (let i = 0; i < length; i++) {
          const el = items[i];
          if(el.on_top) {
            if(el.imgUrl && el.imgUrl!== 'null') {
              news.push({
                original: el.imgUrl!=null? el.imgUrl: '',
                description: el.title!== null? el.title: '',
              });
            }
            else if(el.youtube && el.youtube!== 'null') {
              news.push({
                original: el.imgUrl!=null? el.imgUrl: 'http://img.youtube.com/vi/'+el.youtube+'/0.jpg',
                description: el.title!== null? el.title: '',
                youtube: el.youtube!== null? el.youtube: null,
              });
            }
          }
        }

        console.log(JSON.stringify(news));
        //TODO
        //actions.saveWidgetContent(news);
        this.setState({news});
      }.bind(this),
       error: function (e) {
        console.error(e);
        // deferred.resolve();
       }.bind(this)
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

  handleNotificationClick(event) {
    if(event.type === 'click') {
      this.state.news[currentIndex];
      let news_item = this.state.news[currentIndex];
      //handle content type and assemble correct url
      let url = '';
      if(news_item) {
        if(news_item.youtube && news_item.youtube !== null) {
          url = 'video?videoPath=https://www.youtube.com/watch?v='+news_item.youtube;
        } else if(news_item.original){
          //handle
          debugger
          console.log('non youtube');
        }
      }


      //Parse content type of news_item and send to router
      let options = {
        id: this.props.appId, //optional
        name: url, //start with "video", "news", etc
        protocol: 'cms viewer' //fixed string
      };

      //start extenstion App
      window.JSInterface.startApp(JSON.stringify(options));
    }
  },

  handleCloseBtnClick() {
    // actions.showWidgetContent(false);
  },

  handleNotificationSlide(index) {
    // debugger
    console.log('slide to: '+index);
    currentIndex = index;
  },

  renderHeader() {
    return this.props.description;
  },

  rendernotificationItem(item, index) {
    return (
      <li key={index} className='widget-notification-title'>
        <a href={item.link} target='_blank'>
          <span className='bullet'>&#9642;</span>
          &nbsp;{item.title}
        </a>
      </li>
    );
  },

  renderContentBody() {
    let currentImgStyle = {
      height: '15%',
      width: 'auto'
    };
    return (
      <Modal {...this.props}>
        <Modal.Body>
          {this.props.children || 'No settings now'}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={this.handleCloseBtnClick}>
            Close
          </Button>
          <Button
            bsStyle='primary'
            onClick={this.handleSaveBtnClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  },

  renderWidget() {
    const style = {
      // overflowX: 'scroll',
      overflow: 'auto',
      overflowY: 'hidden',
      height: '11.8em',
      fontSize: '1.5em',
      width: '100%',
      // display: 'inline-block',
      // margin: '0 auto'
    };
    return (
      <section {...this.props} className='app'>
        <ImageGallery
          ref={(i) => this._imageGallery = i}
          // items={images}
          items={this.state.news}
          lazyLoad={false}
          showBullets={this.state.showBullets}
          showThumbnails={this.state.showThumbnails}
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          slideInterval={parseInt(this.state.slideInterval)}
          autoPlay={this.state.isPlaying}
          onClick={this.handleNotificationClick}
          onSlide={this.handleNotificationSlide}
        />
      </section>);
  }

});

export default WidgetNotification;
