import Reflux from 'reflux';
import _ from 'lodash';

import actions from '../actions/actions';

let widgetContent = JSON.parse(localStorage.getItem('widgetContent')) || {};

const widgetContentStore = Reflux.createStore({

  listenables: [ actions ],

  getInitialState() {
    // localStorage.setItem('widgetContent', JSON.stringify(widgetContent));
    return widgetContent;
  },

  // setBackgroundImage(_backgroundImage) {
  //   widgetContent.backgroundImage = _backgroundImage || defaultPreference.backgroundImage;
  //   this._saveAndTrigger();
  // },
  showWidgetContent(){
    this.trigger(widgetContent);
  },

  saveWidgetContent(_content) {
    this._saveAndTrigger();
  },

  _saveAndTrigger() {
    // localStorage.setItem('widgetContent', JSON.stringify(widgetContent));
    this.trigger(widgetContent);
  }
});

export default widgetContentStore;
