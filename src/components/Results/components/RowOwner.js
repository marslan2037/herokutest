import React from 'react'
import Meter from './Meter'
import Arrow from '../../icons/Arrow'
import Score from './Score'
import Images from './Images'
import Helpers from '../../../Helpers'
import helpImage from '../../../help.png'
import moreInfoImage from '../../../details.png'
import { useStore } from 'react-context-hook'

const options = [
  { value: 'server', label: 'Server' },
  { value: 'images', label: 'Images' },
  { value: 'content', label: 'Content' },
  { value: 'js', label: 'JS' },
  { value: 'css', label: 'CSS' },
  { value: 'other', label: 'Other' },
]

export const RowOwner = ({ data, head, apps, tabIndex }) => {
  const setFilter = useStore('filter' + head)[1]
  const setOpenFaq = useStore('openFaq')[1]

  function htmlClick () {
    setFilter([options[2]])
    tabIndex(1)
  }

  function cssClick () {
    setFilter([options[4]])
    tabIndex(1)
  }

  function jsClick () {
    setFilter([options[3]])
    tabIndex(1)
  }

  function htmlFaqClick () {
    setOpenFaq('html')
    tabIndex(3)
  }

  function cssFaqClick () {
    setOpenFaq('css')
    tabIndex(3)
  }

  function jsFaqClick () {
    setOpenFaq('js')
    tabIndex(3)
  }

  if (!data) {
    return null
  } else {

    const scores = new Helpers().calculatePageScores(data.lighthouseResult.audits)
    const score_html = scores[0]
    const score_css = scores[1]
    const score_js = scores[2]
    const plt = scores[3]
    const plt_num = scores[4]
    const page_size = scores[5]
    const num_requests = scores[6]

    return (
      <div className='res_section'>
        <div className='head'>{head}</div>
        <a href={data.id} target={'_blank'}>
          <span>{data.id}</span>
        </a>
        <div className='grid_row'>
          <div className={'lefttabs'}>
            <Score value={Math.abs(100 * data.lighthouseResult.categories.performance.score)}
                   title={'Performance Score'}/>
            <div className='load'>
              <span>Page Load Time</span>
              <p>{plt} <Arrow status={plt_num < 7 ? 'positive' : 'negative'}/></p>
            </div>
            <div className='size'>
              <span>Total Page Size</span>
              <p>{new Helpers().formatBytes(page_size)}
                <Arrow status={page_size < 3200000 ? 'positive' : 'negative'}/>
              </p>
            </div>
            <div className='requests'>
              <span>Requests</span>
              <p>{num_requests} <Arrow status={num_requests < 88 ? 'positive' : 'negative'}/></p>
            </div>
          </div>
          <div className='screen'>
            <div><img src={data.lighthouseResult.audits['final-screenshot'].details.data} alt='screenshoot'/></div>
          </div>
        </div>
        {apps ? (<div className='apps_block'>
            <h4>Installed apps:</h4>
            <span>Here is a list of app code we have found on your side. Some of these apps you may have already uninstalled a while back, yet the code still remains on your store slowing it down. We scanned the store for 431 apps and looking to add more soon.</span>
            <div className='apps_wrap'>
              {
                apps.installed_apps.map((app, index) => {
                  if (index < 7) {
                    return (<div className='app_tab'>
                        <div className='app_name'>{app.name}</div>
                        <div className='app_icon'/>
                      </div>
                    )
                  } else {
                    return null
                  }
                })
              }
            </div>
          </div>
        ) : (
          <>
            <Images data={data} tabIndex={tabIndex}/>
            <div className='speedscores'>
              <div className='speedscores_row_wrap'>
                <h5>
                  <div className={'helpMoreInfo'}>
                    JS
                    <a href={'#faq-js'}>
                      <img alt='Help' id="helpImage" src={helpImage} onClick={jsFaqClick}/>
                    </a>
                    <a href={'#rec-' + head}>
                      <img className={'moreInfo'} alt='More Info' id="moreInfoImage" src={moreInfoImage}
                           onClick={jsClick}/>
                    </a>
                  </div>
                </h5>
                <span>
                  JavaScript is a code language used to make your Shopify store dynamic. Here is how well the JS on your store is optimized for speed.
                </span>
                <div className='speedscores_row speedscores_js'>
                  <Meter score={score_js} name='JS'/>
                  {score_js}%
                </div>
              </div>
              <div className='speedscores_row_wrap'>
                <h5>
                  <div className={'helpMoreInfo'}>
                    HTML
                    <a href={'#faq-html'}>
                      <img alt='Help' id="helpImage" src={helpImage} onClick={htmlFaqClick}/>
                    </a>
                    <a href={'#rec-' + head}>
                      <img className={'moreInfo'} alt='More Info' id="moreInfoImage" src={moreInfoImage}
                           onClick={htmlClick}/>
                    </a>
                  </div>
                </h5>
                <span>
                  HTML code builds the structure of your Shopify store. Below you see how effective your html is composed. Click ”see details” for exact issues.
                </span>
                <div className='speedscores_row speedscores_html'>
                  <Meter score={score_html} name={'HTML'}/>
                  {score_html}%
                </div>
              </div>
              <div className='speedscores_row_wrap'>
                <h5>
                  <div className={'helpMoreInfo'}>
                    CSS
                    <a href={'#faq-css'}>
                      <img alt='Help' id="helpImage" src={helpImage} onClick={cssFaqClick}/>
                    </a>
                    <a href={'#rec-' + head}>
                      <img className={'moreInfo'} alt='More Info' id="moreInfoImage" src={moreInfoImage}
                           onClick={cssClick}/>
                    </a>
                  </div>
                </h5>
                <span>
                  CSS code makes your site pretty with colors, spacing and more. Below you see how your css performs in our speed tester.
                </span>
                <div className='speedscores_row speedscores_html'>
                  <Meter score={score_css} name={'CSS'}/>
                  {score_css}%
                </div>
              </div>
            </div>
          </>
        )}
      </div>)
  }
}
