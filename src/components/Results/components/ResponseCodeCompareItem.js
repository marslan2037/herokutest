import React from 'react'

const HttpStatus = require('http-status-codes')

const ResponseCodeCompareItem = ({ data }) => {

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
      <>
        <div className='cmp'>
          {data.left}
        </div>
        <div className='cmp'>
          <div className={'cmp_status'}>
            <div className={'statusColor statusColor-' + getStatusColor(data.status)}>
              {data.status}
            </div>
            {getStatusText(data.status)}
          </div>
        </div>
        <div className='cmp'>
          {data.right}
        </div>
      </>
    )
  }
}

export default ResponseCodeCompareItem
