import React from 'react'
import 'react-circular-progressbar/dist/styles.css'

import Chart from 'react-apexcharts'

export class PieChart extends React.Component {
  constructor (props) {
    super(props)

    this.state = {

      series: this.props.series,
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: this.props.labels,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },

    }
  }

  render () {
    return (
      <div className='pie'>
        <span>{this.props.title}</span>
          <div className="chart">
            <Chart options={this.state.options} series={this.state.series} type="pie" width={300}/>
          </div>
      </div>
    )
  }
}

