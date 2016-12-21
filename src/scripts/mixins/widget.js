import React from 'react';
import Icon from 'react-fa';

import actions from '../actions/actions';
import WidgetPreference from '../mixins/widget-preference';

///
/// componet shoud implement renderWidget();
/// component could implement renderHeader(), renderPreferenceBody(), handlePreferenceSave();

export default {

  getInitialState() {
    return {
      showControls: false,
      isModalVisible: false
    };
  },

  handleRemoveClick(e) {
    e.stopPropagation();
    actions.removeWidget(this.props.widgetId);
  },

  saveWidget(widgetData) {
    widgetData.widgetId = this.props.widgetId;
    actions.saveWidget(widgetData);
  },

  _toggleControls() {
    this.setState({showControls: !this.state.showControls});
  },

  _stopPropogation(e) {
    e.stopPropagation();
  },

  _showPreference(e){
    this.setState({isModalVisible: true});
  },

  _hidePreference(e){
    this.setState({isModalVisible: false});
  },

  renderControls() {
    const btnStyle = {
      padding: 10,
      cursor: 'pointer'
    };
	//unmark line below to disable widget editting function
    // return (<div></div>);
    return (
      <div>
        <span
          className='pull-left'
          style={btnStyle}
          onClick={this.handleRemoveClick}>
          <Icon name='minus' />
        </span>
        <div
          className='pull-right'
          style={{marginBottom: '1em'}}
          onClick={this._stopPropogation}>

          <WidgetPreference
            show={this.state.isModalVisible}
            onHide={this._hidePreference}
            onSave={this.handlePreferenceSave}>
            {this.renderPreferenceBody && this.renderPreferenceBody()}
          </WidgetPreference>

          <span
            onClick={this._showPreference}
            style={btnStyle}>
            <Icon name='gear' />
          </span>

        </div>
      </div>
    );
  },

  render() {
    const header = this.renderHeader ? this.renderHeader() : ' ';

    const wrapperStyle = {
      padding: 5
    };

    const panelStyle = {
      backgroundColor: 'rgba(0,0,0,0)',
      marginBottom: 0
    };

    return (
      <div {...this.props} style={wrapperStyle}>
        <div className='panel panel-default' style={panelStyle}>
          <div className='panel-heading' onClick={this._toggleControls}>
            {this.state.showControls ? this.renderControls() : null}
            &nbsp;{header}&nbsp;
          </div>
          <div className='panel-body' style={this.props.bodyStyle}>
            {this.renderWidget()}
          </div>
        </div>
      </div>
    );
  }
};
