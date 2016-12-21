import React from 'react';
import {
  Col,
  Row
} from 'react-bootstrap';
import _ from 'lodash';

const Tiles = React.createClass({

  propTypes: {
    colNum: React.PropTypes.number,
    activeWidgets: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      colNum: 4,
      activeWidgets: []
    };
  },

  renderItems() {
    let cols = [];
    for(let i = 0; i < this.props.colNum; i++) {
      cols.push([]);
    }

    _.each(this.props.activeWidgets, (item, index) => {
      cols[index % this.props.colNum].push(item);
    });

    return cols.map((colItems, index) => {
      return (
        <Col
          {...this.props}
          md={12 / this.props.colNum }
          className='tiles'
          key={index} >
          {
            colItems.map((item)=>{
              item.key = item.widgetId;
              return React.createElement(
                require('../components/' + item.source),
                item, null);
            })
          }
        </Col>
      );
    });
  },

  render() {
    return (
      <Row {...this.props} style={{marginTop: '1em'}}>
        {this.renderItems()}
      </Row>
    );
  }

});

export default Tiles;
