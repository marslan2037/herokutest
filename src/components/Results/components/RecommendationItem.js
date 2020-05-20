import React, { useState } from 'react'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import Markdown from 'markdown-to-jsx'
import Helpers from '../../../Helpers'

const RecommendationItem = ({ data, impact }) => {
  const [folded, setFolded] = useState(true)
  let gradeChar = '?'
  let gradeColor = '#000000'

  if (data.score !== null) {
    let s = data.score * 100
    gradeChar = new Helpers().getRating(s)
    gradeColor = new Helpers().getColor(s)
  }

  const toggleFold = () => {
    setFolded(!folded)
  }

  const divStyle = {
    backgroundColor: gradeColor
  }

  if (!data) {
    return null
  } else {
    return (
      <div className='skeleton'>
        <div className='skeleton_head'>
          <div className='skeleton_show' onClick={toggleFold}>
            {
              folded ? <KeyboardArrowRightIcon/> : <KeyboardArrowDownIcon/>
            }
          </div>
          <p className='skeleton_title'>
            {data.title ? data.title : null}
            {/*{data.id ? data.id : null}*/}
          </p>
          <div className='skeleton_score'>
            <div className='score_wrapper'>
              <div className='gradechar' style={divStyle}>
                {gradeChar}
              </div>
              {data.score !== null ? (Math.floor(data.score * 100)) : null}
            </div>
          </div>
          <p className='skeleton_type'>
            {impact.category}
          </p>
          <p className='skeleton_type'>
            {impact.getImpactString()}
          </p>
          <p className='skeleton_type'>
            {impact.getEffortString()}
          </p>
          <p className='skeleton_type'>
            {new Helpers().formatBytes(data.totalWastedBytes)}
          </p>
        </div>
        <div className={folded ? 'skeleton_hidden sk' : 'skeleton_hidden skeleton_show'}>
          <p className='skeleton_description'>
            {data.description ? <Markdown options={{
              overrides: {
                a: {
                  props: {
                    target: '_blank',
                  },
                },
              },
            }}>{data.description}</Markdown> : null}
          </p>
          <p className='skeleton_displayValue'>
            {data.displayValue ? data.displayValue : null}
          </p>
          <div className='skeleton_items'>
            {
              data.details && data.details.items ? data.details.items.map((item, index) => {
                if (item.url) {
                  return (
                    <div key={index} className={index % 2 === 0 ? 'skeleton_item' : 'skeleton_item skeleton_item_odd'}>
                      {JSON.stringify(item.url)}
                    </div>
                  )
                } else {
                  return null
                }
              }) : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default RecommendationItem
