import React from 'react'
import Meter from './Meter'
import Arrow from '../../icons/Arrow'
import Score from './Score'
import Helpers from '../../../Helpers'

export const RowOwnerGtMetrix = ({ result, screenshot, head, apps }) => {
  if (!result) {
    return null
  } else {
    const scoreHTML = 0
    const scoreCSS = 0
    const scoreJS = 0
    const finalscorehtml = Math.floor(100 * scoreHTML / 7 - 100)
    const finalscorecss = Math.floor(100 * scoreCSS / 5 - 100)
    const finalscorejs = Math.floor(100 * scoreJS / 3 - 100)
    const plt = result.results.page_load_time / 1000
    const page_size = result.results.page_bytes
    const num_requests = result.results.page_elements
    return (
      <div className='res_section'>
        <h3>{head}</h3>
        <div className='head'>Overall Scores</div>
        <div>
          <span><b>Theme:</b> {apps.theme.name}</span>
        </div>
        <div className='grid_row'>
          <div className={'lefttabs'}>
            <Score value={result.results.pagespeed_score} title={'Page Speed Score'}/>
            <div className='load'>
              <span>Page Load Time</span>
              <p>{plt} s <Arrow status={plt< 7 ? "positive" : "negative"}/></p>
            </div>
            <div className='size'>
              <span>Total Page Size</span>
              <p>{new Helpers().formatBytes(page_size)}
                <Arrow status={page_size < 3200000 ? "positive" : "negative"}/>
              </p>
            </div>
            <div className='requests'>
              <span>Requests</span>
              <p>{num_requests} <Arrow status={num_requests < 88 ? "positive" : "negative"}/></p>
            </div>
          </div>
          <div className='screen'>
            <div><img src={'data:image/jpeg;base64,' + screenshot} alt='screenshot'/></div>
          </div>
        </div>
        {apps ? (<div className='apps_block'>
            <h4>Installed apps:</h4>
            <span>Here is a list of app code we have found on your side. Some of these apps you may have already uninstalled a while back, yet the code still remains on your store slowing it down.</span>
            <div className='apps_wrap'>{apps.installed_apps.map((app) => {
                return (
                  <div className='app_tab' key={app.name}>
                    <div className='app_name'>
                      {app.name}
                    </div>
                    <img src={app.image_url} alt={app.name + " image"} />
                  </div>
                )
            })}
            </div>
          </div>
        ) : (
          <>
            <div className='speedscores'>
              <div className='speedscores_row_wrap'><h5>JS</h5>
                <div className='speedscores_row speedscores_js'><Meter score={finalscorejs}/>{Math.abs(finalscorejs)} %
                </div>
              </div>
              <div className='speedscores_row_wrap'><h5>HTML</h5>
                <div className='speedscores_row speedscores_html'><Meter
                  score={finalscorehtml}/>{Math.abs(finalscorehtml)} %
                </div>
              </div>
              <div className='speedscores_row_wrap'><h5>CSS</h5>
                <div className='speedscores_row speedscores_css'><Meter
                  score={finalscorecss}/>{Math.abs(finalscorecss)} %
                </div>
              </div>
            </div>
          </>
        )}

      </div>)
  }
}
