import React from 'react'
import Arrow from '../../icons/Arrow'
import Score from './Score'
import Helpers from '../../../Helpers'
import { GeneralScores } from './GeneralScores'
import { PieChart } from './PieChart'

export const RowDevGtMetrix = ({ result, head, apps, har_data }) => {

  const entries = har_data.log.entries

  const script_entries = entries.filter((item) => {
    return item.response.content.mimeType.indexOf('javascript') !== -1
  })

  const html_entries = entries.filter((item) => {
    return item.response.content.mimeType.indexOf('html') !== -1
  })

  const font_entries = entries.filter((item) => {
    return item.response.content.mimeType.indexOf('font') !== -1
  })

  const image_entries = entries.filter((item) => {
    return item.response.content.mimeType.indexOf('image') !== -1
  })

  const css_entries = entries.filter((item) => {
    return item.response.content.mimeType.indexOf('css') !== -1
  })

  const other_entries = entries.filter((item) => {
    return !css_entries.includes(item)
      && !image_entries.includes(item)
      && !font_entries.includes(item)
      && !html_entries.includes(item)
      && !script_entries.includes(item)
  })

  const requests_labels = ['Script', 'HTML', 'Font', 'Image', 'CSS', 'Other']
  const weight_labels = ['Script', 'HTML', 'Font', 'Image', 'CSS', 'Other']

  const sum_reducer = (accumulator, currentValue) => {
   return  accumulator + currentValue.time
  }

  const weight_series = [
    script_entries.reduce(sum_reducer, 0),
    html_entries.reduce(sum_reducer, 0),
    font_entries.reduce(sum_reducer, 0),
    image_entries.reduce(sum_reducer, 0),
    css_entries.reduce(sum_reducer, 0),
    other_entries.reduce(sum_reducer, 0)
  ]

  const requests_series = [
    script_entries.length,
    html_entries.length,
    font_entries.length,
    image_entries.length,
    css_entries.length,
    other_entries.length
  ]

  if (!result) {
    return null
  } else {

    const plt = result.results.page_load_time / 1000
    const page_size = result.results.page_bytes
    const num_requests = result.results.page_elements
    return (
      <div className='res_section'>
        <h3>{head}</h3>
        <div className='head'>Overall Scores</div>
        <div>
          <span><b>Theme:</b> {apps.theme.name}</span>
        </div>
        <div className='grid_row'>
          <Score value={result.results.pagespeed_score} title={'Page Speed Score'}/>
          <div className='load'>
            <span>Page Load Time</span>
            <p>{plt} s <Arrow status={plt< 7 ? "positive" : "negative"}/></p>
          </div>
          <div className='size'>
            <span>Total Page Size</span>
            <p>{new Helpers().formatBytes(page_size)}
              <Arrow status={page_size < 3200000 ? "positive" : "negative"}/>
            </p>
          </div>
          <div className='requests'>
            <span>Requests</span>
            <p>{num_requests} <Arrow status={num_requests < 88 ? "positive" : "negative"}/></p>
          </div>
        </div>
        <div className='grid_row'>
          <GeneralScores result={result}/>
        </div>
        <div className='grid_row'>
          <PieChart title={'Processing Requests'} labels={requests_labels} series={requests_series}/>
          <PieChart title={'Processing Weight'} labels={weight_labels} series={weight_series}/>
        </div>
      </div>
    )
  }
}
