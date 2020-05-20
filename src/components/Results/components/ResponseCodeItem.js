import React, { useState } from 'react'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

var HttpStatus = require('http-status-codes')

const ResponseCodeItem = ({ data }) => {
  const [folded, setFolded] = useState(true)

  const toggleFold = () => {
    setFolded(!folded)
  }

  const getStatusText = (code) => {
    try {
      return HttpStatus.getStatusText(code)
    } catch (e) {
      return 'N/A'
    }
  }

  const getStatusColor = (code) => {
    if (code >= 200 && code < 300) {
      return 'green'
    } else if (code >= 300 && code < 400) {
      return 'orange'
    } else if (code >= 400 && code < 600) {
      return 'red'
    }
    return 'black'
  }

  if (!data) {
    return null
  } else {
    return (
      <div className='skeleton'>
        <div className='skeleton_head'>
          <div className='skeleton_show' onClick={toggleFold}>
            {
              folded ? <KeyboardArrowRightIcon/> : <KeyboardArrowDownIcon/>
            }
          </div>
          <div className={'statusColor statusColor-' + getStatusColor(data[0].response.status)}>
            {data[0].response.status}
          </div>
          <p className='skeleton_title'>
            {getStatusText(data[0].response.status)}
          </p>
          <p className='skeleton_type responseCount'>
            {data.length}
          </p>
        </div>
        <div className={folded ? 'skeleton_hidden sk' : 'skeleton_hidden skeleton_show'}>
          <div className='skeleton_items'>
            {
              data.map((item, index) => {
                if (item.request.url) {
                  return (
                    <div key={index} className={index % 2 === 0 ? 'skeleton_item' : 'skeleton_item skeleton_item_odd'}>
                      {JSON.stringify(item.request.url)}
                    </div>
                  )
                } else {
                  return null
                }
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ResponseCodeItem
