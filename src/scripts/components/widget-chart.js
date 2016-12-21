import React from 'react';

import {Line} from 'react-chartjs';
import WidgetMixin from '../mixins/widget';

const WidgetChart = React.createClass({

  mixins: [WidgetMixin],

  renderWidget() {
    let chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    return (
      <div>
        <h1>健康資訊</h1>
        <Line data={chartData} width="300" height="250"/>
      </div>
    );
  }

});

export default WidgetChart;
