import React from 'react'
import Helpers from '../../../Helpers'
import ResponseCodeCompareItem from './ResponseCodeCompareItem'

export const HistoryCompareSection = ({ title, data_left, data_right, har_data_left, har_data_right, url }) => {

  const scores_left = new Helpers().calculatePageScores(data_left.lighthouseResult.audits)
  const plt_left = scores_left[3]
  const plt_num_left = scores_left[4]
  const page_size_left = scores_left[5]
  const num_requests_left = scores_left[6]

  const scores_right = new Helpers().calculatePageScores(data_right.lighthouseResult.audits)
  const plt_right = scores_right[3]

  const plt_num_right = scores_right[4]
  const page_size_right = scores_right[5]
  const num_requests_right = scores_right[6]

  const perf_left = Math.round(100 * data_left.lighthouseResult.categories.performance.score)
  const perf_right = Math.round(100 * data_right.lighthouseResult.categories.performance.score)

  const perf_diff = perf_right - perf_left
  const perf_percent = Math.round(perf_diff / perf_left * 100)

  const plt_diff = plt_num_right - plt_num_left
  const plt_percent = Math.round(plt_diff / plt_num_left * 100)

  const page_size_diff = page_size_right - page_size_left
  const page_size_percent = Math.round(page_size_diff / page_size_left * 100)

  const num_requests_diff = num_requests_right - num_requests_left
  const num_requests_percent = Math.round(num_requests_diff / num_requests_left * 100)

  // const entry_map_left = []
  // const entry_map_right = []
  const entry_map_count = []
  if (har_data_left && har_data_right) {
    const entries_left = har_data_left.log.entries
    const entries_right = har_data_right.log.entries

    entries_left.forEach((item) => {
      if (!entry_map_count[item.response.status]) {
        entry_map_count[item.response.status] = { status: item.response.status, left: 0, right: 0 }
      }
      entry_map_count[item.response.status].left = entry_map_count[item.response.status].left + 1
    })

    entries_right.forEach((item) => {
      if (!entry_map_count[item.response.status]) {
        entry_map_count[item.response.status] = { status: item.response.status, left: 0, right: 0 }
      }
      entry_map_count[item.response.status].right = entry_map_count[item.response.status].right + 1
    })

    // entries_left.forEach((item) => {
    //   if (!entry_map_left[item.response.status]) {
    //     entry_map_left[item.response.status] = []
    //   }
    //   entry_map_left[item.response.status].push(item)
    // })
    // const entries_right = har_data_left.log.entries
    // entries_right.forEach((item) => {
    //   if (!entry_map_right[item.response.status]) {
    //     entry_map_right[item.response.status] = []
    //   }
    //   entry_map_left[item.response.status].push(item)
    // })
  }

  const getPrefix = (value) => {
    if (value > 0) {
      return '+'
    } else return ''
  }

  const getColorNeg = (value) => {
    if (value > 0) {
      return 'green'
    }
    if (value < 0) {
      return 'red'
    }
    return ''
  }

  const getColor = (value) => {
    if (value > 0) {
      return 'red'
    }
    if (value < 0) {
      return 'green'
    }
    return ''
  }

  return (
    <>
      <div className='head'>{title}</div>
      <div className='compare_headings'>
        <div className='cmp'>
          <div>
            <img
              src={data_left.lighthouseResult.audits['final-screenshot'].details.data}
              alt='screenshoot'/>
          </div>
          <div>{url}</div>
        </div>
        <div className={'cmp'}>
          VS
        </div>
        <div className='cmp'>
          <div>
            <img
              src={data_right.lighthouseResult.audits['final-screenshot'].details.data}
              alt='screenshoot'/>
          </div>
          <div>{url}</div>
        </div>
      </div>


      <div className={'compare_section'}>
        <div className='head_small'>PERFORMANCE SCORES</div>
        <div className='compare_headings'>
          <div className={'cmp ' + getColor(perf_percent)}>
            {perf_left}
          </div>
          <div className='cmp'>
            Page Speed Score
          </div>
          <div className={'cmp ' + getColorNeg(perf_percent)}>
            {perf_right}
            {
              perf_percent !== 0 ?
                <span className={'cmp small ' + getColorNeg(perf_percent)}>
              {'  ' + getPrefix(perf_percent) + perf_percent}%
            </span>
                : null
            }
          </div>
        </div>
        <div className='compare_headings'>
          <div className={'cmp ' + getColorNeg(plt_percent)}>
            {plt_left}
          </div>
          <div className='cmp'>
            Page Load Time
          </div>
          <div className={'cmp ' + getColor(plt_percent)}>
            {plt_right}
            {
              plt_percent !== 0 ?
                <span className={'cmp small ' + getColor(plt_percent)}>
              {'  ' + getPrefix(plt_percent) + plt_percent}%
            </span>
                : null
            }
          </div>
        </div>
        <div className='compare_headings'>
          <div className={'cmp ' + getColorNeg(page_size_percent)}>
            {new Helpers().formatBytes(page_size_left)}
          </div>
          <div className='cmp'>
            Total Page Size
          </div>
          <div className={'cmp ' + getColor(page_size_percent)}>
            {new Helpers().formatBytes(page_size_right)}
            {
              page_size_percent !== 0 ?
                <span className={'cmp small ' + getColor(page_size_percent)}>
              {'  ' + getPrefix(page_size_percent) + page_size_percent}%
            </span>
                : null
            }
          </div>
        </div>
        <div className='compare_headings'>
          <div className={'cmp ' + getColorNeg(num_requests_percent)}>
            {num_requests_left}
          </div>
          <div className='cmp'>
            Requests
          </div>
          <div className={'cmp ' + getColor(num_requests_percent)}>
            {num_requests_right}
            {
              num_requests_percent !== 0 ?
                <span className={'cmp small ' + getColor(num_requests_percent)}>
              {'  ' + getPrefix(num_requests_percent) + num_requests_percent}%
            </span>
                : null
            }
          </div>
        </div>
      </div>
      {
        har_data_left && har_data_right ? (
          <div className={'compare_section'}>
            <div className='head_small'>RESPONSE CODES</div>
            {
              entry_map_count.map((item) => {
                  return (
                    <div className='compare_headings'>
                      <ResponseCodeCompareItem data={item}/>
                    </div>
                  )
                }
              )
            }

          </div>
        ) : null
      }
    </>
  )
}


