import React from 'react'

export default class HowItWorks extends React.Component {
  render () {
    return (
      <div>
        <div className="how_section">
          <div className='head'>How It Works</div>
          <div className='grid_row' id='how_grid_row'>
            <div className='howitworks' id={'how_analyze'}>
              <h4>STEP 1</h4>
              <h3>ANALYZE</h3>
              <p>Run your site through the analyzer.</p>
            </div>
            <div className='howitworks' id={'how_results'}>
              <h4>STEP 2</h4>
              <h3>GET RESULTS</h3>
              <p> You will get a score for each optimization area and recommendations to fix issues.</p>
            </div>
            <div className='howitworks' id={'how_optimize'}>
              <h4>STEP 3</h4>
              <h3>OPTIMIZE</h3>
              <p>Contact your favorite developer to help optimize your Shopify store. Alternatively you can <a
                target={'_empty'} href="https://ecomexperts.io/pages/contact">contact us</a> and we can help you.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}