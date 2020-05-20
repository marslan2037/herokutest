import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Helpers from '../../../Helpers'

function Score ({ value, title }) {
  const text = value < 0 ? "N/A" : new Helpers().getRating(value) + '(' + Math.round(value) + ')'
  return (

      <div className='load'>
        <span>{title}</span>
        <div className='score_value'>
          <CircularProgressbar value={value} text={text} styles={buildStyles({
            pathColor: new Helpers().getColor(value),
            textColor: new Helpers().getColor(value),
          })}/>
        </div>
      </div>
  )
}

export default Score
