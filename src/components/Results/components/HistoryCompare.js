import React, { useState } from 'react'
import AsyncSelect from 'react-select/async'
import Async from 'react-async'
import CircularProgress from '@material-ui/core/CircularProgress'
import { HistoryCompareSection } from './HistoryCompareSection'

const axios = require('axios')

const HistoryCompare = ({ hostname }) => {

  const [left, setLeft] = useState(null)
  const [right, setRight] = useState(null)

  const changeLeft = selectedOption => setLeft(selectedOption)
  const changeRight = selectedOption => setRight(selectedOption)

  const getHistoryList = async () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
    let res = await axios({
      method: 'get',
      url: BACKEND_URL + '/sc/hl/' + hostname.replace('https://', ''),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff'
      }
    })

    return res.data.map((item) => {
      const d = new Date(item.timestamp)
      return { value: item.id, label: d.toLocaleDateString() + ' ' + d.toLocaleTimeString() }
    })
  }

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(getHistoryList())
      }, 1000)
    })

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      // borderBottom: '1px dotted pink',
      color: state.isSelected ? '#ffb400' : '#000000',
      marginTop: 10,
      marginBottom: 10,
      background: '#ffffff'
    }),
    control: (provided) => ({
      // none of react-select's styles are passed to <Control />
      // ...provided,
      padding: 20,
      // width: 258,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#ffffff',
      filter: 'drop-shadow(0px 15px 20px #ebeced)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
    }),
    menuList: (provided) => ({
      ...provided,
      borderRadius: 30,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'

      return { ...provided, opacity, transition }
    }
  }

  const loadHistory = async () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
    let promise_left = axios({
      method: 'get',
      url: BACKEND_URL + '/sc/id/' + left.value,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff'
      }
    })
    let promise_right = axios({
      method: 'get',
      url: BACKEND_URL + '/sc/id/' + right.value,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff'
      }
    })

    let [res_left, res_right] = await Promise.all([promise_left, promise_right])
    return [res_left.data, res_right.data]
  }

  return (
    <div className='cmp_sec'>
      <div className='head'>Compare Results</div>
      <div className='compare'>
        <div className='compare_headings'>
          <div className='cmp'>
            <AsyncSelect
              value={left}
              cacheOptions
              defaultOptions
              loadOptions={promiseOptions}
              styles={customStyles}
              onChange={changeLeft}
              isMulti={false}
              isSearchable={false}
            />
          </div>
          <div className={'cmp'}>
            VS
          </div>
          <div className='cmp'>
            <AsyncSelect
              value={right}
              styles={customStyles}
              cacheOptions
              defaultOptions
              loadOptions={promiseOptions}
              onChange={changeRight}
              isMulti={false}
              isSearchable={false}
            />
          </div>
        </div>
      </div>
      {
        left && right
          ?
          <>
            <Async promiseFn={loadHistory}>
              {({ data, error, isLoading }) => {
                if (isLoading) return (
                  <div className='compare'>
                    <div className='compare_headings'>
                      <div className='cmp'/>
                      <div className='cmp'>
                        <CircularProgress id='compare-progress'/>
                      </div>
                      <div className='cmp'/>
                    </div>
                  </div>
                )

                if (error) return `Something went wrong: ${error.message}`
                if (data)
                  return (
                    <>
                      <div className='compare'>
                        <HistoryCompareSection url={data[0].url} title={'Home'}
                                               data_left={data[0].google_pagespeed_home}
                                               data_right={data[1].google_pagespeed_home}
                                               har_data_left={data[0].gtmetrix_har}
                                               har_data_right={data[1].gtmetrix_har}/>
                      </div>
                      <div className='compare'>
                        <HistoryCompareSection url={data[0].url} title={'Collection'}
                                               data_left={data[0].google_pagespeed_collections}
                                               data_right={data[1].google_pagespeed_collections}/>
                      </div>
                      <div className='compare'>
                        <HistoryCompareSection url={data[0].url} title={'Cart'}
                                               data_left={data[0].google_pagespeed_cart}
                                               data_right={data[1].google_pagespeed_cart}/>
                      </div>
                      {
                        data[0].google_pagespeed_products && data[1].google_pagespeed_products ?
                          (<div className='compare'>
                            <HistoryCompareSection url={data[0].url} title={'Product'}
                                                   data_left={data[0].google_pagespeed_products}
                                                   data_right={data[1].google_pagespeed_products}/>
                          </div>)
                          : null
                      }
                    </>
                  )
                return null
              }}
            </Async>
          </>
          :
          null
      }
    </div>
  )
}

export default HistoryCompare
