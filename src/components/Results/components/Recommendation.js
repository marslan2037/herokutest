import React from 'react'
import RecommendationItem from './RecommendationItem'
import { useStore } from 'react-context-hook'
import Drowdown from '../../react-dropdown/Dropdown'
import TypeImpact from './TypeImpact'

function addTypeImpact (audits, typeImpact) {
  audits[typeImpact.id] = typeImpact
}

function getTypeImpact (audit) {

  const audits = {}

  addTypeImpact(audits, new TypeImpact('uses-optimized-images', 'IMAGES', 3, 1, true))
  addTypeImpact(audits, new TypeImpact('uses-webp-images', 'IMAGES', 3, 1, true))
  addTypeImpact(audits, new TypeImpact('offscreen-images', 'IMAGES', 3, 3, false))
  addTypeImpact(audits, new TypeImpact('uses-responsive-images', 'IMAGES', 3, 2, true))
  addTypeImpact(audits, new TypeImpact('efficient-animated-content', 'IMAGES', 3, 2, true))

  addTypeImpact(audits, new TypeImpact('font-display', 'CSS', 2, 1, false))
  addTypeImpact(audits, new TypeImpact('unminified-css', 'CSS', 2, 1, true))
  addTypeImpact(audits, new TypeImpact('unused-css-rules', 'CSS', 2, 3, true))

  addTypeImpact(audits, new TypeImpact('unminified-javascript', 'JS', 3, 2, true))
  ///////////////
  addTypeImpact(audits, new TypeImpact('third-party-summary', 'JS', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('bootup-time', 'JS', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('mainthread-work-breakdown', 'JS', 3, 2, false))

  addTypeImpact(audits, new TypeImpact('render-blocking-resources', 'CONTENT', 2, 2, true))
  addTypeImpact(audits, new TypeImpact('uses-rel-preconnect', 'CONTENT', 3, 2, true))
  addTypeImpact(audits, new TypeImpact('uses-rel-preload', 'CONTENT', 3, 2, true))
  //////
  addTypeImpact(audits, new TypeImpact('network-requests', 'CONTENT', 2, 3, false))
  addTypeImpact(audits, new TypeImpact('estimated-input-latency', 'CONTENT', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('dom-size', 'CONTENT', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('total-byte-weight', 'CONTENT', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('first-contentful-paint-3g', 'CONTENT', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('first-contentful-paint', 'CONTENT', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('first-meaningful-paint', 'CONTENT', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('speed-index', 'CONTENT', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('first-cpu-idle', 'CONTENT', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('max-potential-fid', 'CONTENT', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('interactive', 'CONTENT', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('total-blocking-time', 'CONTENT', 3, 2, false))

  addTypeImpact(audits, new TypeImpact('uses-text-compression', 'SERVER', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('use-long-cache-ttl', 'SERVER', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('network-rtt', 'SERVER', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('network-server-latency', 'SERVER', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('redirects', 'SERVER', 3, 2, false))
  addTypeImpact(audits, new TypeImpact('time-to-first-byte', 'SERVER', 3, 2, false))

  return audits[audit.id] || new TypeImpact('unknown', 'UNKNOWN', 0, 0, false)

}

const Recommendation = ({ data, title }) => {
  const audits = data.lighthouseResult.audits
  const auditsMap = new Map(Object.entries(audits))
  const auditsSorted = [...auditsMap.entries()]
    .filter((item) => {
      const accumulate = (currentValue, accumulator) => {
        let s2 = accumulator.wastedBytes ? accumulator.wastedBytes : 0
        return s2 + currentValue
      }
      const e1 = item[1]
      if (e1.details && e1.details.items) e1.totalWastedBytes = e1.details.items.reduce(accumulate, 0)
      else e1.totalWastedBytes = 0
      // return e1.totalWastedBytes !== 0
      return getTypeImpact(e1).display
    })
    .sort((x, y) => {
        const e1 = x[1]
        const e2 = y[1]
        const i1 = getTypeImpact(e1).getSortOrder()
        const i2 = getTypeImpact(e2).getSortOrder()
        let w1 = e1.totalWastedBytes
        let w2 = e2.totalWastedBytes
        if (i1 === i2) {
          return w2 - w1
        } else {
          return i2 - i1
        }
      }
    )

  const filter = useStore('filter' + title)[0]
  const setFilter = useStore('filter' + title)[1]

  const options = [
    // { id: 1, value: 'server', name: 'Server', selected: true },
    { id: 2, value: 'images', name: 'Images', selected: true },
    { id: 3, value: 'content', name: 'Content', selected: true },
    { id: 4, value: 'js', name: 'JS', selected: true },
    { id: 5, value: 'css', name: 'CSS', selected: true },
    // { id: 6, value: 'other', name: 'Other', selected: true },
  ]

  if (filter)
    filter.forEach((f_item) => {
      options.forEach((o_item) => {
        o_item.selected = f_item.value === o_item.value
      })
    })

  const handleChange = selectedOption => setFilter(selectedOption)

  if (!filter) {
    setFilter(options)
  }

  return (
    <div className='rec_sec'>
      <h4>Performance improvements</h4>
      <div className={'filterMenu'}>

        <Drowdown
          // placeholder={'0 Types Selected'}
          items={options}
          allowMultiselect={true}
          allowSelectAll={true}
          onSelect={handleChange}
        />
      </div>
      <div className='recommendation'>
        <div className='skeleton_headings'>
          <div className='recom'>RECOMMENDATION</div>
          <div className='grade'>GRADE</div>
          <div className='type'>TYPE</div>
          <div className='impact'>IMPACT</div>
          <div className='effort'>EFFORT</div>
          <div className='wasted'>WASTED</div>
        </div>
        {
          auditsSorted
            .filter((item) => {
              const typeImpact = getTypeImpact(item[1])
              let found = false
              if (filter) {
                filter.forEach((item) => {
                  if (item.value.toUpperCase() === typeImpact.category) {
                    found = true
                  }
                })
              }
              return found && (item[1].scoreDisplayMode === 'binary' || item[1].scoreDisplayMode === 'numeric')
            })
            .map((item) => {
                const typeImpact = getTypeImpact(item[1])
                return (
                  <RecommendationItem key={item[1].id} data={item[1]} impact={typeImpact}/>
                )
              }
            )
        }
      </div>
    </div>
  )
}

export default Recommendation
