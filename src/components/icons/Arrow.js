import React from 'react'

function Arrow ({ status }) {
  if (status === 'positive') {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 15'>
        <g id='Report'>
          <g id='Home Page'>
            <g id='Stats'>
              <g id='Requests'>
                <g id='Arrow'>
                  <path id='Shape 6' fill='#00ce7a' d='M11.38 1.99l2.21 2.29-9.38 9.71-2.22-2.29 9.39-9.71z' />
                  <path id='Shape 6 copy'fill='#00ce7a' d='M12.3 1.99l-2.29 2.29 9.71 9.71 2.29-2.29-9.71-9.71z' />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  } else {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 15'>
        <g id='Report'>
          <g id='Home Page'>
            <g id='Stats'>
              <g id='Total Page Size'>
                <g id='Arrow'>
                  <path id='Shape 6' fill='#ff474e' d='M11.38 13.01l2.21-2.29-9.38-9.71-2.22 2.28 9.39 9.72z' />
                  <path id='Shape 6 copy' fill='#ff474e' d='M12.3 13.01l-2.29-2.29 9.71-9.71 2.29 2.28-9.71 9.72z' />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

export default Arrow
