import React from 'react';
import {
  Modal,
  Button
} from 'react-bootstrap';

const WidgetPreference = React.createClass({

  propTypes: {
    onSave: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    onHide: React.PropTypes.func,
    children: React.PropTypes.node
  },

  getDefaultProps() {
    return {
      children: null
    };
  },

  handleSaveBtnClick() {
    if (this.props.onSave) {
      this.props.onSave();
    }
    this.props.onHide();
  },

  handleCloseBtnClick() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this.props.onHide();
  },

  render() {
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
  }
});

export default WidgetPreference;
