import Reflux from 'reflux';
import _ from 'lodash';

import actions from '../actions/actions';
import defaultPreference from '../utils/defaultENPreference';

// let preference = JSON.parse(localStorage.getItem('preference')) || defaultPreference;
let preference = defaultPreference;

const preferenceStore = Reflux.createStore({

  listenables: [ actions ],

  getInitialState() {
    localStorage.setItem('preference', JSON.stringify(preference));
    return preference;
  },

  setBackgroundImage(_backgroundImage) {
    preference.backgroundImage = _backgroundImage || defaultPreference.backgroundImage;
    this._saveAndTrigger();
  },

  addWidget(widgetData) {
    let {activeWidgets} = preference;
    widgetData.widgetId = activeWidgets.length + 1;
    // widgetData.backgroundColor = palette.getRandomColor();
    delete widgetData.key;

    activeWidgets.push(widgetData);
    preference.activeWidgets = activeWidgets;
    this._saveAndTrigger();
  },

  saveWidget(widgetData) {
    let {activeWidgets} = preference;
    let editingWidget = _.findWhere(activeWidgets, {widgetId: widgetData.widgetId});
    _.extend(editingWidget, widgetData);
    this._saveAndTrigger();
  },

  removeWidget(widgetId) {
    let {activeWidgets} = preference;
    preference.activeWidgets = _.reject(activeWidgets, (item) => {
      return item.widgetId === widgetId;
    });
    this._saveAndTrigger();
  },

  setDegreeUnit(_degreeUnit) {
    preference.degreeUnit = _degreeUnit || defaultPreference.degreeUnit;
    this._saveAndTrigger();
  },

  setTimezoneOffset(_timezoneOffset) {
    preference.timezoneOffset = _timezoneOffset || defaultPreference.timezoneOffset;
    this._saveAndTrigger();
  },

  setVersion(_versionInfo) {
    preference.version = _versionInfo || defaultPreference.version;
    this._saveAndTrigger();
  },

  _saveAndTrigger() {
    localStorage.setItem('preference', JSON.stringify(preference));
    this.trigger(preference);
  }
});

export default preferenceStore;
