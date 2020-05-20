import React from 'react'
import Chart from 'react-apexcharts'
import moment from 'moment'
import HistoryCompare from './HistoryCompare'

export class HistoryChart extends React.Component {

  constructor (props) {
    super(props)

    this.days_zoom = 9999
    this.selection = '1w'

    this.state = {
      options: {
        noData: {
          text: 'No history, yet',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        },
        chart: {
          id: 'history',
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 400,
            animateGradually: {
              enabled: false,
              delay: 50
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          },
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
              customIcons: []
            },
            autoSelected: 'zoom'
          },
        },
        markers: {
          size: 6,
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'round',
          colors: undefined,
          width: 2,
          dashArray: 0,
        },
        yaxis: {
          seriesName: 'Time',
          labels: {
            formatter: (value) => { return value.toFixed(2) + 's' },
          },
          axisBorder: {
            show: true
          }
        },
        xaxis: {
          type: 'datetime',
          labels: {
            formatter: function (value, timestamp) {
              return moment(timestamp).format("ddd, hA")
            },
            show: true,
            style: {
              fontWeight: 100,
              fontSize: '0.75rem',
            }
          },
          axisBorder: {
            show: true
          }
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          shared: false,
          followCursor: false,
          intersect: true,
          inverseOrder: false,
          custom: undefined,
          fillSeriesColor: false,
          theme: false,
          style: {
            fontSize: '12px',
            fontFamily: undefined
          },
          onDatasetHover: {
            highlightDataSeries: false,
          },
          x: {
            show: true,
            format: 'dd MMM',
            formatter: undefined,
          },
          y: {
            formatter: undefined,
            title: {
              formatter: (seriesName) => seriesName,
            },
          },
          z: {
            formatter: undefined,
            title: 'Size: '
          },
          marker: {
            show: true,
          },
          items: {
            display: 'flex',
          },
          fixed: {
            enabled: false,
            position: 'topRight',
            offsetX: 0,
            offsetY: 0,
          },
        }
      },
      series: props.history[0].data.length === 0 ? [] : props.history
    }
  }

  updateSeries () {
    const zoom_min = Number(moment().subtract(this.days_zoom, 'days').format("x"))
    this.setState({
        options: { xaxis: { min: zoom_min , max: Number(moment().format('x'))} }
      }
    )
  }

  zoom (v) {
    this.days_zoom = v
    this.updateSeries()
  }

  zoom1d () {
    this.selection = '1d'
    this.zoom(1)
  }

  zoom1w () {
    this.selection = '1w'
    this.zoom(7)
  }

  zoom1m () {
    this.selection = '1m'
    this.zoom(31)
  }

  zoom3m () {
    this.selection = '3m'
    this.zoom(93)
  }

  zoom6m () {
    this.selection = '6m'
    this.zoom(186)
  }

  zoom1y () {
    this.selection = '1y'
    this.zoom(365)
  }

  zoomAll () {
    this.selection = 'all'
    const min_date = Math.min.apply(Math, this.props.history[0].data.map((o) => o.x))
    const duration = moment.duration(moment().diff(moment(min_date)))
    this.zoom(duration.asDays())
  }

  render () {
    return (
      <div className='res_section'>
        <div className='head'>History</div>
        <div className={'zoomButtonRow'}>
          <button className={`zoomButtonL ${this.selection === '1d' ? ' zoomActive' : ""}`} onClick={this.zoom1d.bind(this)}>1d</button>
          <button className={`zoomButton ${this.selection === '1w' ? ' zoomActive' : ""}`} onClick={this.zoom1w.bind(this)}>1w</button>
          <button className={`zoomButton ${this.selection === '1m' ? ' zoomActive' : ""}`} onClick={this.zoom1m.bind(this)}>1m</button>
          <button className={`zoomButton ${this.selection === '3m' ? ' zoomActive' : ""}`} onClick={this.zoom3m.bind(this)}>3m</button>
          <button className={`zoomButton ${this.selection === '6m' ? ' zoomActive' : ""}`} onClick={this.zoom6m.bind(this)}>6m</button>
          <button className={`zoomButton ${this.selection === '1y' ? ' zoomActive' : ""}`} onClick={this.zoom1y.bind(this)}>1y</button>
          <button className={`zoomButtonR ${this.selection === 'all' ? ' zoomActive' : ""}`} onClick={this.zoomAll.bind(this)}>All</button>
        </div>
        <div className='grid_row' id={'historycontainer'}>
          <Chart options={this.state.options} series={this.state.series} type="line" width='1024' height='450'/>
        </div>
        <div className='grid_row compare' id={'historycontainer'}>
          <HistoryCompare hostname={this.props.url}/>
        </div>
      </div>
    )
  }
}

