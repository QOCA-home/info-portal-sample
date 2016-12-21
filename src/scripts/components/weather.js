import React from 'react';
import request from 'superagent';
import classnames from 'classnames';
import tuc from 'temp-units-conv';

import '../../styles/weather.scss';
import SmartIntervalMixin from '../mixins/smart-interval';
import 'weather-icons/css/weather-icons.min.css';

const UPDATE_WEATHER_INTERVAL = 5 * 60 * 1000;
const UPDATE_WEATHER_INTERVAL_12HR = 12* 60 * 60 * 1000;
const UPDATE_LOCATION_INTERVAL = 20 * 1000;

// const WAIT_NAVIGATOR_GEOLOCATION_TIMEOUT_MS = 5000;
const DEFAULT_COORDS = {
  latitude: 25.03,
  longitude: 121.3
};
var fetchErrorCnt = 0;
const OPEN_WEATHER_MAP_APIKEY = 'a03a514aa97f21fcd9151a3b32846712';

function _updateFetchWeatherInterval(newInterval, immediatelyRun) {
  this.clearSmartInterval(this.getSmartIntervalIds());
  this.setSmartInterval(this._getCurrentPositionAndfetchWeather, newInterval, null, immediatelyRun);
  fetchErrorCnt = 0;
};

const Weather = React.createClass({
  propTypes: {
    style: React.PropTypes.node,
    degreeUnit: React.PropTypes.oneOf(['c', 'f', 'k'])
  },

  mixins: [
    SmartIntervalMixin
  ],

  getDefaultProps() {
    return {
      degreeUnit: 'c'
    };
  },

  getInitialState() {
    return {
        icon: 'wi-day-sunny',
        temperature: 300
    };
  },

  /*
      icon: 'wi-thermometer-exterior',
      temperature: null
   */
  //      icon: 'wi-day-sunny',
  //    temperature: 300

  componentDidMount() {
    this.setSmartInterval(this._getCurrentPositionAndfetchWeather, UPDATE_WEATHER_INTERVAL, null, true);
  },

  _getCurrentPositionAndfetchWeather() {
    console.log('_getCurrentPositionAndfetchWeather: '+this.getSmartIntervalIds());
    // if there's no result from navigator.geolocation.getCurrentPosition
    // it will try to use ip to get current position lat lng
    const getPositionTimeoutID = setTimeout(() => {
      this._getCurrentPositionByIp(this._fetchWeather, ()=> {
        this._fetchWeather(DEFAULT_COORDS);
      });
    }, UPDATE_LOCATION_INTERVAL);

    navigator.geolocation.getCurrentPosition((position) => {
      clearTimeout(getPositionTimeoutID);
      this._fetchWeather(position.coords);
    }, () => {
      this._fetchWeather(DEFAULT_COORDS);
    });
    console.log('_getCurrentPositionAndfetchWeather END');
  },

  _getCurrentPositionByIp(success, fail) {
    console.log('_getCurrentPositionByIp');
    request
      .get('http://freegeoip.net/json/')
      // .get('http://www.telize.com/geoip')
      .end((err, res) => {
        if(err){
          console.log('_getCurrentPositionByIp error');
          console.log(err);
          fail(err);
          return;
        }
        console.log('_getCurrentPositionByIp success: '+res.body);
        if(res.body) {
          console.log('check I body');
          const {
            latitude,
            longitude
          } = res.body;
          success({
            latitude,
            longitude
          });
        }
        else {
          console.log('check II- no body, return default coordinate');
          success(DEFAULT_COORDS);
        }
      });
  },

  _fetchWeather(coords) {
    console.log('_fetchWeather: '+coords);

    let _latitude = DEFAULT_COORDS.latitude;
    let _longitude = DEFAULT_COORDS.longitude;
    if(coords) {
      _latitude = coords.latitude;
      _longitude = coords.longitude;
    }
    // const {latitude, longitude} = coords;
    request
      .get(`http://api.openweathermap.org/data/2.5/weather?lat=${_latitude}&lon=${_longitude}&APPID=${OPEN_WEATHER_MAP_APIKEY}`)
      .end((err, res) => {
        if (err) {
          //set default icon and temperture
          console.log(err);

          if(fetchErrorCnt === 0) {
            console.log('cnt 0');
            _updateFetchWeatherInterval.call(this,UPDATE_WEATHER_INTERVAL, true);
          }
          //fetching weather in 12 hr if fetch weather fails for 3 times
          if(fetchErrorCnt++ > 2) {
            console.log('cnt > 2');
            _updateFetchWeatherInterval.call(this,UPDATE_WEATHER_INTERVAL_12HR, false);
          }
        } else {
          const temperature = res.body.main.temp;
          this.setState({
            temperature,
            icon: this._getWeatherIcon(res.body.weather[0].id),
            description: res.body.weather[0].description
          });
          console.log(res);
          //fetching weather in 12 hr
          _updateFetchWeatherInterval.call(this,UPDATE_WEATHER_INTERVAL_12HR, false);
        }
      });
  },

  _getWeatherIcon(id) {
    if (id >= 200 && id < 300) {
      return 'wi-day-rain';
    } else if (id >= 300 && id < 500) {
      return 'wi-day-sleet';
    } else if (id >= 500 && id < 600) {
      return 'wi-day-rain';
    } else if (id >= 600 && id < 700) {
      return 'wi-day-snow';
    } else if (id >= 700 && id < 800) {
      return 'wi-day-fog';
    } else if (id === 800) {
      return 'wi-day-sunny';
    } else if (id >= 801 && id < 803) {
      return 'wi-day-cloudy';
    } else if (id >= 802 && id < 900) {
      return 'wi-day-cloudy';
    } else if (id === 905 || (id >= 951 && id <= 956)) {
      return 'wi-day-windy';
    } else if (id >= 900 && id < 1000) {
      return 'wi-day-rain';
    }
  },

  renderDegree() {
    const {temperature} = this.state;
    if(temperature !== null) {
      switch(this.props.degreeUnit) {
        case 'c':
          return tuc.k2c(temperature).toFixed(1) + '°C';
        case 'f':
          return tuc.k2f(temperature).toFixed(1) + '°F';
        case 'k':
        default:
          return temperature.toFixed(1) + 'K';
      }
    }
	else
		return 'N/A';
  },

  render() {
    return (
      <div
        {...this.props}
        className={classnames(this.props.className, 'weather')}>
        <div>
          <i style={{fontSize: 80}} className={`wi ${this.state.icon}`} />
          <div className='degree'>{this.renderDegree()}</div>
        </div>
      </div>
    );
  }

});

export default Weather;
