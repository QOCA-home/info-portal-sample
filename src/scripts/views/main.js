import React from 'react';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import Reflux from 'reflux';

import preference from '../stores/preference';
import Tiles from '../components/tiles';
import TopPanel from '../components/top-panel';
import DeveloperMode from '../components/developer-mode';
import defaultPreference from '../utils/defaultENPreference';

const Main = React.createClass({

  mixins: [
    Reflux.connect(preference, 'preference')
  ],

  propTypes: {
    background: React.PropTypes.string
  },

  onPreferenceReset: function(value) {

    location.reload();
  },

  render() {

    const {
      backgroundImage,
      degreeUnit,
      timezoneOffset,
      activeWidgets,
      version
    } = this.state.preference;

    let logoStyle = {
      height: 'auto',
      width: 'auto',
      position: 'relative',
      float: 'left',
      display: 'none'
    };
    console.log('check defualt:: ' +defaultPreference.version);
    if(version === null || version === '' || version !== defaultPreference.version) {

      console.info('Portal will be updated.');
      localStorage.removeItem('preference');
      location.reload();
      return(<div></div>);
    }

    return (
      <Grid>
        <div className='app-background' style={{
          backgroundImage: `url(${backgroundImage})`
        }} >
        </div>
        <Row style={{height: 60}}>
          <DeveloperMode //style={{display:'none'}}
            preference={this.state.preference}
            className='pull-right'
            onPreferenceReset= {this.onPreferenceReset}/>
        </Row>

        <Row style={{marginBottom: 25}}>
          <Col md={6} />
          <Col md={6}>
            <TopPanel
              timezoneOffset={timezoneOffset}
              degreeUnit={degreeUnit}/>
          </Col>
        </Row>
        <div style={{clear: 'both'}}></div>
        <Tiles
          colNum={2}
          activeWidgets={activeWidgets}/>
      </Grid>
    );
  }
});

export default Main;
