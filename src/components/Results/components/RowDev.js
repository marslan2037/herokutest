import React from 'react'
import Arrow from '../../icons/Arrow'
import Score from './Score'
import Recommendation from './Recommendation'
import Helpers from '../../../Helpers'
import ScrollableAnchor from 'react-scrollable-anchor'
import ResponseCode from './ResponseCode'

const TopRow = ({ data }) => {
  if (!data) {
    return null
  } else {

    const plt = data.lighthouseResult.audits.interactive.displayValue
    const plt_num = data.lighthouseResult.audits.interactive.numericValue
    const page_size = data.lighthouseResult.audits['total-byte-weight'].numericValue
    const num_requests = data.lighthouseResult.audits['network-requests'].numericValue
    return (
      <div className='res_section s_row'>
        <div className='grid_row'>
          <div className={'lefttabs'}>
            <Score value={Math.abs(100 * data.lighthouseResult.categories.performance.score)} title={'Performance Score'}/>
            <div className='load'>
              <span>Page Load Time</span>
              <p>{plt} <Arrow status={plt_num < 7000 ? "positive" : "negative"}/></p>
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
        </div>
      </div>
    )
  }
}

export const RowDev = ({ data, head, har_data }) => {
  if (!data) {
    return null
  } else {
    return (
      <ScrollableAnchor id={'rec-' + head}>
        <div className='res_section'>
          <div className='head'>{head}</div>
          <div>
            <TopRow data={data}/>
            <Recommendation data={data} title={head}/>
            {
              har_data ?
                <ResponseCode data={har_data}/>
                :
                null
            }
          </div>
        </div>
      </ScrollableAnchor>
    )
  }
}
