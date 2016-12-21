import React from 'react';
import {
  Button,
  ButtonGroup,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';
import Icon from 'react-fa';

import actions from '../actions/actions';
import widgetList from '../utils/widget-list';
import backgroundImageEN from '../../images/background_en.png';
import defaultPreference from '../utils/defaultENPreference';

let preference = defaultPreference;

const backgroundList = [
  {
    name: 'QOCA Home',
    source: backgroundImageEN
  }
];

const DeveloperMode = React.createClass({

  propTypes: {
    preference: React.PropTypes.object,
    onPreferenceReset: React.PropTypes.object
  },

  getInitialState() {
    return {
      visible: false,
      currentTimezoneOffset: this.props.preference.timezoneOffset,
      onPreferenceReset: this.props.onPreferenceReset
    };
  },

  componentDidMount() {
    //CDM
  },

  toggleVisible() {
    this.setState({visible: !this.state.visible});
  },

  handlePreferenceReset() {
    let reset = confirm('Reset Portal?');
    if (reset == true) {
      localStorage.removeItem('preference');
      this.props.onPreferenceReset(preference);
      // actions.reset();
      // this.setState({visible: !this.state.visible});
    }
  },

  handleWidgetSelect(eventKey) {
    console.log(eventKey);

    actions.addWidget({
      widgetName: eventKey.widgetName,
      source: eventKey.source
    });
  },

  handleBackgroundSelect(eventKey) {
    console.log(eventKey);
    actions.setBackgroundImage(eventKey);
  },

  handleTimezoneChange(event) {
    const timezoneOffset = event.currentTarget.value !== 'null' ?
      parseInt(event.currentTarget.value) :
      null;

    this.setState({currentTimezoneOffset: timezoneOffset});
    actions.setTimezoneOffset(timezoneOffset);
    actions.setDegreeUnit(timezoneOffset <= -4 * 60 && timezoneOffset >= -6 * 60 ? 'f' : 'c');
  },

  renderBackgroundListDropdown() {
    return (
      <DropdownButton
        title={<span><Icon name='null' />&nbsp;Background</span>}
        onSelect={this.handleBackgroundSelect} >

        {
          backgroundList.map((item, index) => {
            return (
              <MenuItem
                key={index}
                eventKey={item.source} >
                <h4>{item.name}</h4>
              </MenuItem>
            );
          })
        }
      </DropdownButton>
    );
  },

  renderWidgetListDropdown() {
    return (
      <DropdownButton
        title={<span><Icon name='plus' />&nbsp;Add</span>}
        onSelect={this.handleWidgetSelect} >
        {
          widgetList.map((item, index) => {
            return (
              <MenuItem
                key={index}
                eventKey={item} >
                <h4>{item.widgetName}</h4>
              </MenuItem>
            );
          })
        }
      </DropdownButton>
    );
  },

  renderTimezoneSelection() {
    let timezoneOffsetHourList = [];
    for(let timezoneOffsetHour = -12; timezoneOffsetHour <= 12; timezoneOffsetHour++) {
      timezoneOffsetHourList.push(timezoneOffsetHour);
    }

    return (
      <select
        value={this.state.currentTimezoneOffset}
        onChange={this.handleTimezoneChange}
        style={{
          height: '55%',
          display: 'inline-block',
          verticalAlign: 'middle'
        }} >
        <option value='null'>Default Timezone</option>
        {
          timezoneOffsetHourList.map((timezoneOffsetHour, index)=>{
            return (
              <option
                key={index}
                value={timezoneOffsetHour * 60} >
                {`${timezoneOffsetHour > 0 ? '+' : ''}${timezoneOffsetHour}`}
              </option>
            );
          })
        }
      </select>
    );
  },

  render() {
    if (!this.state.visible) {
      return (
        <div
          {...this.props}
          onClick={this.toggleVisible}
          style={{width: 200, height: '100%'}} />
      );
    }

    // return (
    //   <div {...this.props}>
    //     <ButtonGroup>
    //       <Button onClick={this.toggleVisible}>
    //         <Icon name='eye-slash' />&nbsp;Hide
    //       </Button>
    //       <Button onClick={this.handlePreferenceReset}>
    //         <Icon name='refresh' />&nbsp;reset
    //       </Button>
    //       {this.renderTimezoneSelection()}
    //     </ButtonGroup>
    //   </div>
    // );

    return (
      <div {...this.props}>
        <ButtonGroup>
          <Button onClick={this.toggleVisible}>
            <Icon name='eye-slash' />&nbsp;Hide
          </Button>
          {this.renderWidgetListDropdown()}
          {this.renderBackgroundListDropdown()}
          {this.renderTimezoneSelection()}
          <Button onClick={this.handlePreferenceReset}>
            <Icon name='refresh' />&nbsp;reset
          </Button>
        </ButtonGroup>
      </div>
    );
  }
});

export default DeveloperMode;
