import React, { useState, useRef } from 'react'
import { RowOwner } from './components/RowOwner'
import { HistoryChart } from './components/HistoryChart'
import { RowOwnerGtMetrix } from './components/RowOwnerGtMetrix'
import { RowDev } from './components/RowDev'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { HarChart } from './components/HarChart'
import Faq from './components/Faq'
import copyImage from '../../icons8-copy-24.png'
import checkmarkImage from '../../icons8-checkmark-24.png'
import { useStore } from 'react-context-hook'
import { RowDevGtMetrix } from './components/RowDevGtMetrix'
import FixIt from './components/FixIt'

const Results = ({ url, id, gt_pagespeed, gt_screenshot, gt_result, home, product, collection, cart, detect, har_data, history, home_mobile, product_mobile, collection_mobile, cart_mobile }) => {
  const [copySuccess, setCopySuccess] = useState('')
  const [tabIndex, setTabIndex] = useState(0)
  const setOpenFaq = useStore('openFaq')[1]
  const inputRef = useRef(null)

  function copyToClipboard (e) {
    inputRef.current.select()
    document.execCommand('copy')
    e.target.focus()
    setCopySuccess('Copied!')
  }

  let s = window.location.origin + '/' + id

  return (
    <>
      <nav>
        <div className={'shareUrl'}>
          <div className="block">
            <h3 className={'shareTitle'}>Share this report</h3>
          </div>
          <div className="block">
            <div id="inputWithImage">

              <input data-hj-whitelist type="text" ref={inputRef} id="form-section1-input1"
                     name="name" readOnly={'yes'}
                     value={s}/>
              {copySuccess
                ?
                <img alt={'Copied to Clipboard'} id="image1" src={checkmarkImage}/>
                :
                <img alt={'Copy to Clipboard'} id="image1" src={copyImage} onClick={copyToClipboard}/>
              }
            </div>
          </div>
        </div>
      </nav>
      <Tabs selectedIndex={tabIndex} onSelect={tabIndex => setTabIndex(tabIndex)}>
        <TabList>
          <Tab>Owner</Tab>
          <Tab>Developers</Tab>
          <Tab>History</Tab>
          <Tab>Fix It!</Tab>
          <Tab>FAQ</Tab>
        </TabList>

        <TabPanel>
          <RowOwnerGtMetrix result={gt_result} screenshot={gt_screenshot} head={url} apps={detect}/>
          <RowOwner key='home' k='home' data={home} head='Home Page' tabIndex={setTabIndex} />
          <RowOwner key='home-mobile' k='home-mobile' data={home_mobile} head='Home Page (mobile)' tabIndex={setTabIndex} />
          <RowOwner key='collection' k='collection' data={collection} head='Collection' tabIndex={setTabIndex} />
          <RowOwner key='collection-mobile' k='collection-mobile' data={collection_mobile} head='Collection (mobile)' tabIndex={setTabIndex} />
          <RowOwner key='product' k='product' data={product} head='Product' tabIndex={setTabIndex} />
          <RowOwner key='product-mobile' k='product-mobile' data={product_mobile} head='Product (mobile)' tabIndex={setTabIndex} />
          <RowOwner key='cart' k='cart' data={cart} head='Cart Page' tabIndex={setTabIndex} />
          <RowOwner key='cart-mobile' k='cart-mobile' data={cart_mobile} head='Cart Page (mobile)' tabIndex={setTabIndex} />
          <HarChart key='har' data={har_data} tabIndex={setTabIndex} setOpenFaq={setOpenFaq} id={1}/>
        </TabPanel>

        <TabPanel>
          <RowDevGtMetrix result={gt_result} head={url} apps={detect} har_data={har_data}/>
          <RowDev data={home} head='Home Page' har_data={har_data}/>
          <RowDev data={home_mobile} head='Home Page (mobile)' har_data={har_data}/>
          <HarChart key='har' data={har_data} tabIndex={setTabIndex} setOpenFaq={setOpenFaq} id={2}/>
          <RowDev data={collection} head='Collection'/>
          <RowDev data={collection_mobile} head='Collection (mobile)'/>
          <RowDev data={product} head='Product'/>
          <RowDev data={product_mobile} head='Product (mobile)'/>
          <RowDev data={cart} head='Cart Page'/>
          <RowDev data={cart_mobile} head='Cart Page (mobile)'/>
        </TabPanel>

        <TabPanel>
          <HistoryChart history={history} url={url}/>
        </TabPanel>

        <TabPanel>
          <FixIt/>
        </TabPanel>

        <TabPanel>
          <Faq/>
        </TabPanel>
      </Tabs>
    </>
  )
}

export default Results
