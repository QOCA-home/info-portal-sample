import React from 'react';
import request from 'superagent';
import Icon from 'react-fa';

import WidgetMixin from '../mixins/widget';
import SmartIntervalMixin from '../mixins/smart-interval';

const UPDATE_WEATHER_INTERVAL = 15 * 60 * 1000;

const WidgetWeather = React.createClass({

  mixins: [
    WidgetMixin,
    SmartIntervalMixin
  ],

  propTypes: {
    latLng: React.PropTypes.shape({
      lat: React.PropTypes.number,
      lng: React.PropTypes.number
    })
  },

  getDefaultProps() {
    return {
      latLng: null
    };
  },

  getInitialState() {
    return {
      name: null,
      temperature: null,
      weather: null
    };
  },

  componentWillMount() {
    this.setSmartInterval(this._getCurrentPositionAndfetchWeather, UPDATE_WEATHER_INTERVAL, null, true);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.latLng && (
        !this.props.latLng ||
        this.props.latLng.lat !== nextProps.latLng.lat ||
        this.props.latLng.lng !== nextProps.latLng.lng )) {
      this._fetchWeather(nextProps.latLng.lat, nextProps.latLng.lng);
    }
  },

  _getCurrentPositionAndfetchWeather() {
    if (this.props.latLng) {
      this._fetchWeather(this.props.latLng.lat, this.props.latLng.lng);
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords;
      this._fetchWeather(latitude, longitude);
    }, () => {
      this._fetchWeather(25.03, 121.30);
    });
  },

  _fetchWeather(latitude, longitude) {
    request
      .get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {

          this.setState({
            celsius: this._toCelsius(res.body.main.temp),
            icon: this._getIcon(res.body.weather[0].id),
            description: res.body.weather[0].description,
            name: res.body.name
          });
          console.log(res);
        }
      });
  },

  _getIcon(id) {
    if (id >= 200 && id < 300) {
      return 'RAIN';
    } else if (id >= 300 && id < 500) {
      return 'SLEET';
    } else if (id >= 500 && id < 600) {
      return 'RAIN';
    } else if (id >= 600 && id < 700) {
      return 'SNOW';
    } else if (id >= 700 && id < 800) {
      return 'FOG';
    } else if (id === 800) {
      return 'CLEAR_DAY';
    } else if (id >= 801 && id < 803) {
      return 'PARTLY_CLOUDY_DAY';
    } else if (id >= 802 && id < 900) {
      return 'CLOUDY';
    } else if (id === 905 || (id >= 951 && id <= 956)) {
      return 'WIND';
    } else if (id >= 900 && id < 1000) {
      return 'RAIN';
    }
  },

  _toCelsius(temp) {
    return parseInt( (temp - 273.15) * 10 ) / 10 + '°C';
  },

  renderHeader() {
    return 'Forecast 天氣';
  },

  setPreference() {
    /*eslint no-alert: 0*/
    const latLng = prompt('what is your latLng');
    //{"lat":22.512557,"lng":114.169922}
    //{"lat":40.748817,"lng":-73.985428}
    //{"lat":35.689488,"lng":139.691706}

    this.saveWidget({
      latLng: JSON.parse(latLng)
    });
  },

  renderWidget() {
    return (
      <div>
        <h1>{this.state.day}</h1>

        <br />
        <h1 className='temperature' >{this.state.celsius}</h1>
        <label className='description' >{this.state.description}</label>
        <hr/>
        <h1 className='cityname'>{this.state.name}</h1>
        <Icon name='umbrella' className='pull-left' size='2x'/>
      </div>
    );
  }

});

export default WidgetWeather;
