import React from 'react'
import { Progress } from 'react-sweet-progress'
import 'react-sweet-progress/lib/style.css'

function Loader ({ value, status }) {

  let v = 100
  if(status !== 'success') {
    v = value > 97 ? 97 : value
  }

  const theme = {
    active: {
      color: '#ffb400'
    },
  }

  return (
    <div className='container'>
      <div className='row mainsearch'>
        <div className={'progressDiv'}>
          <h5 className='load'>Analyzing your website</h5>
          <Progress percent={v} theme={theme} status={status}/>
        </div>
        <h4 className={'didYouKnow'}>Did you know?</h4>
        <ul className={'didYouKnow'}>
          <li>This Shopify Specific tool is built on top of GTMetrix and Google Pagespeed - combining the best of both worlds.</li>
          <li>We’re in Beta!  Various elements are still under development or “N/A”</li>
          <li>The more friends you tell - the better this app will become!</li>
          <li>We analyze a random collection/product and cart page.</li>
        </ul>
      </div>
    </div>
  )
}

export default Loader
