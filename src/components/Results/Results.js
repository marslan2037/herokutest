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
      
    </>
  )
}

export default Results
