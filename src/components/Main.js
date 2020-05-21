import React, { useState } from 'react'
import Loader from './Loader'
import Results from './Results/Results'
import HowItWorks from './Results/components/HowItWorks'
import BannerMessage from './BannerMessage'
import Select from 'react-select'
import ReactPixel from 'react-facebook-pixel'
import TagManager from 'react-gtm-module'
import ReactGA from 'react-ga'
import Mobile from './Mobile'
import { hotjar } from 'react-hotjar'

const axios = require('axios')

let timer
let c = 0

function Main ({ match }) {
  console.log(match)
  const options = [
    { value: 'all', label: 'All Pages' },
    { value: 'home', label: 'Home page' },
    { value: 'collection', label: 'Collection Page' },
    { value: 'product', label: 'Product page' },
    { value: 'cart', label: 'Cart page' },
  ]

  const [tracked, setTracked] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [checkWhat, setCheckWhat] = useState(options[0])
  const [counter, setCounter] = useState(0)
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

  const countUp = () => setCounter(c + getRandomInt(2))
  const stopWait = () => {
    setLoading(false)
  }
  c = counter
  if (!timer && loading)
    timer = setInterval(countUp, 125)

  const debugMode = process.env.REACT_APP_DEBUG_MODE === 'true'
  const enableTracking = process.env.REACT_APP_TRACKING === 'true'
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

  let id = null

  if (match && match.params && match.params.id) {
    console.log(match);
    console.log(match.params);
    id = match.params.id
  }

  const onUrlChange = (event) => {
    let u = event.target.value.replace(/^https?:\/\//, '').replace(/\//, '')
    setUrl(u)
  }

  const handleChange = selectedOption => setCheckWhat(selectedOption)

  const initDummy = () => {
    const dummy = require('./dummy.json')
    setData({
      product: dummy.google_pagespeed_products,
      collection: dummy.google_pagespeed_collections,
      cart: dummy.google_pagespeed_cart,
      detect: dummy.detection_result,
      home: dummy.google_pagespeed_home,
      gt_pagespeed: dummy.gtmetrix_pagespeed,
      gt_result: dummy.gtmetrix_result,
      gt_screenshot: dummy.gtmetrix_screenshot,
      gt_har: dummy.gtmetrix_har,
    })
    setDataLoaded(true)
    setTimeout(stopWait, 1000)
    clearInterval(timer)
    timer = null
    setHasError(false)
  }

  const initData = () => {
    let endpoint = null
    if (id !== 'home') {
      console.log(id);
      endpoint = BACKEND_URL + '/sc/id/' + id
    }
    if (url) {
      console.log(url);
      endpoint = BACKEND_URL + '/sc/hn?url=' + url.replace(/^http?:\/\//, '') + '&pages=' + checkWhat.value
    }
    if (!endpoint) return

    axios({
      method: 'get',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff'
      }
    }).then(res => {
      console.log('success in initData')
      // getResults(respo.data.id)
      setData({
        product: res.data.google_pagespeed_products,
        collection: res.data.google_pagespeed_collections,
        cart: res.data.google_pagespeed_cart,
        home: res.data.google_pagespeed_home,
        product_mobile: res.data.google_pagespeed_mobile_products,
        collection_mobile: res.data.google_pagespeed_mobile_collections,
        cart_mobile: res.data.google_pagespeed_mobile_cart,
        home_mobile: res.data.google_pagespeed_mobile_home,
        detect: res.data.detection_result,
        gt_pagespeed: res.data.gtmetrix_pagespeed,
        gt_result: res.data.gtmetrix_result,
        gt_screenshot: res.data.gtmetrix_screenshot,
        gt_har: res.data.gtmetrix_har,
        url: res.data.url,
        id: res.data._id,
        history: res.data.history,
      })
      setDataLoaded(true)
      setTimeout(stopWait, 1000)
      clearInterval(timer)
      // TODO: Why is this dangerous?
      // timer = null
      setCounter(100)
      setHasError(false)
    }).catch(err => {
      if (err.response && err.response.data) {
        setError({
          message: err.response.data
        })
      } else {
        setError({
          message: 'An unknown error occurred while testing this site. We are already informed and fixing this Problem'
        })
      }
      clearInterval(timer)
      setDataLoaded(false)
      clearInterval(timer)
      //timer = null
      setCounter(0)
      setLoading(false)
      setHasError(true)
    })
  }

  const directCheck = () => {
    if (debugMode) {
      initDummy()
    } else {
      initData()
    }
  }

  const speedCheck = (event) => {
    if (event) event.preventDefault()
    setDataLoaded(false)
    setHasError(false)
    setData(null)
    if (url) {
      setLoading(true)
      if (debugMode) {
        initDummy()
      } else {
        initData()
      }
    }
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      // borderBottom: '1px dotted pink',
      color: state.isSelected ? '#ffb400' : '#000000',
      marginTop: 10,
      marginBottom: 10,
      background: '#ffffff'
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      padding: 20,
      width: 258,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#ffffff',
      filter: 'drop-shadow(0px 15px 20px #ebeced)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
    }),
    menuList: () => ({
      borderRadius: 30,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'

      return { ...provided, opacity, transition }
    }
  }

  if (!url && id && id !== 'home' && !loading && !dataLoaded && !hasError && !error) {
    setLoading(true)
    setDataLoaded(false)
    setHasError(false)
    setData(null)
    directCheck()
  }

  console.log('tracking: ' + enableTracking)
  if (!tracked && enableTracking) {
    const tagManagerArgs = {
      gtmId: process.env.REACT_APP_TRACKING_CODE_GTM
    }
    TagManager.initialize(tagManagerArgs)
    const advancedMatching = {} // optional, more info: https://developers.facebook.com/docs/facebook-pixel/pixel-with-ads/conversion-tracking#advanced_match
    ReactGA.initialize(process.env.REACT_APP_TRACKING_CODE_GA)
    ReactGA.pageview(window.location.pathname + window.location.search)
    const fbOptions = {
      autoConfig: true, // set pixel's autoConfig
      debug: false, // enable logs
    }
    ReactPixel.init(process.env.REACT_APP_TRACKING_CODE_FB_PIXEL, advancedMatching, fbOptions)
    ReactPixel.pageView() // For tracking page view
    hotjar.initialize(process.env.REACT_APP_TRACKING_CODE_HOTJAR, 6)
    setTracked(true)
  }

  let isMobile = () => {
    return !!(navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i))
  }

  return (
    <main>
      {
        hasError ? (
          <BannerMessage message={error.message} type={'error'}/>) : null
      }
      {
        !isMobile() ?
          (<div className='container'>
            {
              dataLoaded || loading
                ?
                null
                :
                <div className='row mainsearch'>
                  <div id={'mainpage'} className='tagline'>
                    <p>'The Epicenter of Shopify Speed Testing'</p>
                    <h1>Enter a store URL below to see its performance</h1>
                  </div>
                  <form id='analyze'>
                    <input data-hj-whitelist id='analyze-url' type='text' name='url' placeholder='MyShopifyStore.com'
                           onChange={onUrlChange}/>
                    <Select
                      value={checkWhat}
                      styles={customStyles}
                      onChange={handleChange}
                      options={options}
                      isMulti={false}
                      isSearchable={false}
                      defaultValue={'all'}
                    />
                    <button id='analyze-submit' type='submit' onClick={speedCheck} className='btn btn-primary'>
                      Analyze
                    </button>
                  </form>
                </div>
            }
          </div>)
          : <Mobile/>
      }
      {
        !isMobile() ?
          <div>
            {dataLoaded && !loading ? (
                <Results gt_screenshot={data.gt_screenshot}
                         gt_pagespeed={data.gt_pagespeed}
                         gt_result={data.gt_result}
                         url={data.url}
                         home={data.home}
                         product={data.product}
                         collection={data.collection}
                         cart={data.cart}
                         home_mobile={data.home_mobile}
                         product_mobile={data.product_mobile}
                         collection_mobile={data.collection_mobile}
                         cart_mobile={data.cart_mobile}
                         har_data={data.gt_har}
                         id={data.id}
                         history={data.history}
                         detect={data.detect}/>
              )
              :
              null
            }
            {
              loading
                ?
                <Loader value={counter} status={dataLoaded ? 'success' : 'active'}/>
                :
                null
            }
            {
              !loading && !dataLoaded
                ?
                <HowItWorks/>
                :
                null
            }
          </div>
          : null
      }
    </main>
  )
}

export default Main
