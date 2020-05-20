import React from 'react'
import Score from './Score'

export const GeneralScores = ({ result }) => {
  if (!result) {
    return null
  } else {
    return (
      <>
        <Score value={result.shopify_score} title={'Shopify Score'}/>
        <Score value={result.app_score} title={'App Score'}/>
        <Score value={result.theme_score} title={'Theme Score'}/>
        <Score value={result.modification_score} title={'Modification Score'}/>
      </>
    )
  }
}
