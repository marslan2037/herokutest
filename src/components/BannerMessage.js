import React from 'react'
import Banner from 'react-js-banner'

const BannerMessage = ({ message, type }) => {

  const css = {
    banner1Css: { color: '#FFF', backgroundColor: 'green' },
    banner2Css: { color: '#000', backgroundColor: 'grey', fontFamily: 'arial' },
    banner3Css: { color: '#FFF', backgroundColor: 'red', fontSize: 20 }
  }
  return (
    <>
      <Banner
        title={message}
        css={type && type === 'error' ? css.banner3Css : css.banner1Css}
      />
    </>
  )
}

export default BannerMessage
