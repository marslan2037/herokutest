import React, { useState } from 'react'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import helpImage from '../../../help.png'
import { useStore } from 'react-context-hook'

function Images ({ data, tabIndex }) {
  const [folded, setFolded] = useState(true)
  const setOpenFaq = useStore('openFaq')[1]

  const toggleFold = () => {
    setFolded(!folded)
  }

  function imagesFaqClick () {
    setOpenFaq('images')
    tabIndex(3)
  }

  const imgs = []
  const audits = data.lighthouseResult.audits
  const keys = [
    'uses-optimized-images',
    'uses-webp-images',
    'offscreen-images',
    'uses-responsive-images',
    'efficient-animated-content',
  ]
  keys.forEach((key) => {
    if (audits[key].details && audits[key].details.items) {
      audits[key].details.items.forEach((item) => {
        imgs.push(item)
      })
    }
  })

  return (
    <div className='images_block'>
      <div className={'helpMoreInfo'}>
        <h4>Images</h4>
        <a href={'#faq-images'}>
          <img alt='Help' id="helpImage" src={helpImage} onClick={imagesFaqClick}/>
        </a>
      </div>
      <span>Here is a list of images, that are not optimized for web usage. Reducing the image size and making sure the image is saved in the correct image format could make a significant impact.</span>
      <div className='images_row'>
        {
          imgs.map((image, i) => {
            if (!folded || (folded && i < 5)) {
              return (
                <div key={i}>
                  <a href={image.url} target={'_blank'}>
                    <img src={image.url} alt='url'/>
                  </a>
                </div>
              )
            } else return null
          })
        }

      </div>
      <div id={'div-fold-unfold'}>
        {
          imgs.length > 5 ?
            <button id='image-fold-unfold' className='btn btn-primary'
                    onClick={toggleFold}>
              Show {folded ? 'more' : 'less'}
              <div className={'foldUnfoldDiv'}>
                {folded ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
              </div>
            </button>
            :
            null
        }
      </div>
    </div>
  )
}

export default Images
