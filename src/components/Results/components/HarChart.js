import React, { useEffect } from 'react'
import { fromHar } from 'perf-cascade'
import helpImage from '../../../help.png'
import { useStore } from 'react-context-hook'

export const HarChart = ({ data, tabIndex, id }) => {
  useEffect(() => {
    const options = {
      showIndicatorIcons: true,
      leftColumnWidth: 30,
      rowHeight: 35,
      legendHolder: document.getElementById('legendHolder'),
      pageSelector: document.getElementById('pageSelector')
    }
    const perfCascadeSvg = fromHar(data, options)
    let element = document.getElementById('har_chart' + id)
    if (element.childElementCount === 0) {
      document.getElementById('har_chart' + id).appendChild(perfCascadeSvg)
    }
  }, [id, data])

  const setOpenFaq = useStore('openFaq')[1]

  const waterfallFaqClick = () => {
    setOpenFaq('waterfall')
    tabIndex(3)
  }

  return (
    <div className="res_section">
      <div className={'helpMoreInfo'}>
        <div className='head'>Waterfall</div>
        <a href={'#faq-waterfall'}>
          <img alt='Help' id="helpImage" src={helpImage} onClick={waterfallFaqClick}/>
        </a>
      </div>
      <div className={'waterFallChart'} id={'legendHolder'} />
      <div className={'waterFallChart'} id={'har_chart' + id}/>
      <select className={'waterFallChart'} id={'pageSelector'} />
    </div>
  )
}


