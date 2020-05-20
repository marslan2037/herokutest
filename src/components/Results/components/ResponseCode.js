import React from 'react'
import ResponseCodeItem from './ResponseCodeItem'

const ResponseCode = ({ data }) => {
  const entries = data.log.entries
  const entry_map = []
  entries.forEach((item) => {
    if (!entry_map[item.response.status]) {
      entry_map[item.response.status] = []
    }
    entry_map[item.response.status].push(item)
  })

  return (
    <div className='rec_sec'>
      <h4>Response Codes</h4>
      <div className={'filterMenu'}>
      </div>
      <div className='recommendation'>
        <div className='skeleton_headings'>
          <div className='recom'>RESPONSE CODE</div>
          <div className='wasted'>RESPONSES</div>
        </div>
        {
          entry_map.map((item) => {
              return (
                <ResponseCodeItem key={item[0].response.status} data={item}/>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default ResponseCode
