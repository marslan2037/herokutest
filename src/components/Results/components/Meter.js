import React from 'react'

function Meter ({ score }) {
  const m = 2
  const b = -150
  const styles = {
    transform: `rotateZ(${m * score + b}deg)`
  }
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 330 154'
    >
      <defs>
        <image
          width='53'
          height='44'
          id='img1'
          href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAsCAMAAADy4QARAAAAAXNSR0IB2cksfwAAAoJQTFRF/////////////////////////////////0dO//////////////////b3/+np/////////9zd/8TG//////7+/7Cz/7G0//////////Hy/3+E/////////////9LT/1th/7S3//////////39/6Om/0tS/7i6/////////////+rr/3R5/0lQ/7u+/////////////8bI/1Vb/8DC//////////r6/5aa/0hP/8LF/////////////+Pk/2pv/0dO/8XH/////////7q8/1BW/0xT/8rM//////X1/4mN/05V/8zO/////////////9nb/2Jo/8/Q/////////62w/9PV//////////////Dw/3yB/1JY/9TW/////////////9DS/1pg/1NZ/9fZ//////////z8/6Cj/1Ra/9vc/////////////+nq/3J3/1Zd/9ze/////////////1Na/1he/9/g//////////n5/5OY/1lf/+Lj/////////+Hj/2dt/+Tl/////////11k/+bn/////4aL/19l/////////////9ja/2Bm/////////6uu/0tR/2Rq/+zt/+/w/3p//2Vr/+7v/////////83P/1hf/////56h/2tx/////////////+jp/291/21z//P0//T1//////////////j4/5GV/3N4//b2/////////////////3Z7/////////7W4//////////////P0/4SI/0dO/0dO/0dO/////0dO/0dO/0dO/0dO//v7/0dO/0dO/4SI/0dO/0dO/0dO/////0dO/0dO/4qP/////46S//39////////////////////FTho4wAAANZ0Uk5TAAwfOM//4ksAXfQtxP//P93//2v///8vxv//fknt////mHv/////mTPK/////5RT+////4+M/////4o60f////+EYP////+A/////3xB4f///3Zt//9zMMf/////b0rw/////2l9/////2c0y/////9jVf7///9eAv////9c0////1hi//9U//9SQuT//05x//////////9M8///Rv//QzbN///////5BpL/////9jw71f8i6PvuOQELPZ/l/OoGScP3/x+i/wyF8TIFbefXA2DgBboJGZa8wikAAAJpSURBVHicldT5V0xhGAfwRzx5EUWSEiETkoQwid4QMZSsKUuEUGSPLJUsITvZl+xky77v+77/P773ztQ5Zu7tvvP+cJ/ve873c+6ZM8+5RF6eBj7eCqKGjZh9GxMJxaOjJk0Zx9cr1cwPpHkLZh8vlH8AUMtW3r0rEKZ1UBs81X9XcFvUQ0KD8GxHqiqsPeodwjvi2YlUVWe0I7rYIjG6kqLq1h3tqB7RPTFiSFH1ikW7d5/ovhhxpKj6odx/gN0WjzmQ1FTCIJQHJ0pbEuYQUlNDtQ0aliyHj8BMISWlr9DIUVI6RiOMISWVmobu2HSgcQjjSUlN0FZook3K5ElIk0lFZUxBNTNLSjl1GtJ0UlEzslGdOQsoZzbSHKGi5qKZO88ONH8BYp5QUPkL0VxUACMXL0FcKhTUsuVoJq3Q0MpCxFXCWq2OQ7FojWbk2nXI64W1SihGsaRUR+EbkMuEtdqorVCkQ0ebNiNvEZbKuULlupFb8TXibcJSba9Ab8dOJ0qPwmWXsFS7tRXas9eJ9u3XvkbCSukrdKDSaeTBQ7iFCSt1+AhqR4+5UGImbseFlUrRVuiE3YVOhuB6SlioqtNonTnrMvLceebYVGGhyrQ/KT6nFhVcYL7oL+pXly7DVF+pNfLqNebrN0T9quYmlrWwtA7dqmbOrnFHbup2YIzfnbuOOlQJdO++B3JTRA8ePnr85KkLZRUxP6vyRB4K5/mLl690FPqaucIIGSmiN2819g4oLd8IGSt6/+GjLM9lDvhkiEwUff7yNYL5mwkyU/T9x08uzjBBpop+5f0ONkPmiv78NUX/q39vw7agqDArLgAAAABJRU5ErkJggg=='
        />
      </defs>
      <g id='Report'>
        <g id='Home Page'>
          <g id='JS'>
            <g id='Speed Meter'>
              <g id='Shapes'>
                <path
                  id='Shape 7 copy 3'
                  fillRule='evenodd'
                  className='shp0'
                  d='M103.15 114.06l-45.1-31.95S37.19 107.57 36 151h57.13s-3.52-15.17 10.02-36.94z'
                />
                <path
                  id='Shape 7 copy 3'
                  fillRule='evenodd'
                  d='M134.06 86.2L116.3 34.01S84.53 43.2 58.71 78.37c24.82 17.33 46.04 32.15 46.04 32.15s5.88-14.23 29.31-24.32z'
                  fill='#ffa700'
                />
                <path
                  id='Shape 7 copy 2'
                  fillRule='evenodd'
                  d='M179.86 86.04l17.66-52.4s31.86 9.24 57.72 44.55c-24.82 17.37-46.02 32.2-46.02 32.2s-5.9-14.24-29.36-24.35z'
                  fill='#82e895'
                />
                <path
                  id='Shape 7 copy 4'
                  fillRule='evenodd'
                  d='M137.61 86.3l-16.62-52.89s30.48-12.17 72.02-.05C183.7 62.7 175.68 88 175.68 88s-13.31-8-38.07-1.7z'
                  fill='#ffea00'
                />
                <path
                  id='Shape 7 copy 2'
                  fillRule='evenodd'
                  d='M210.7 113.94l45.2-32.05S276.81 107.43 278 151h-57.25s3.52-15.22-10.05-37.06z'
                  fill='#08d15c'
                />
              </g>
              <g id='Current' style={styles}>
                <path
                  id='Ellipse 528'
                  className='shp0'
                  d='M157.5 122c8.56 0 15.5 6.94 15.5 15.5 0 8.56-6.94 15.5-15.5 15.5-8.56 0-15.5-6.94-15.5-15.5 0-8.56 6.94-15.5 15.5-15.5z'
                />
                <path
                  id='Shape 7'
                  fillRule='evenodd'
                  className='shp0'
                  d='M236 71l-72 70s-6.31 7.18-12 1 3-12 3-12l81-59z'
                />
                <use id='Shape 7 copy' href='#img1' x='185' y='68' />
                <path
                  id='Ellipse 3 copy'
                  d='M157.5 135a2.5 2.5 0 010 5 2.5 2.5 0 010-5z'
                  fill='#fff'
                />
              </g>
              <g id='Percents'>
                <g id='100'>
                  <path
                    id='Rectangle 502'
                    className='shp6'
                    d='M291.41 149.19h12.03v1h-12.03v-1z'
                  />
                  <text id='100' transform='matrix(1.038 0 0 .968 307 153.692)'>
                    <tspan x='0' y='0' className='txt7'>
                      100
                    </tspan>
                  </text>
                </g>
                <g id='80'>
                  <path
                    id='Rectangle 502'
                    className='shp6'
                    d='M276.4 68.25l-10.52 5.81.48.88 10.52-5.81-.48-.88z'
                  />
                  <text id='80' transform='matrix(.994 0 0 .968 281 70.692)'>
                    <tspan x='0' y='0' className='txt7'>
                      80
                    </tspan>
                  </text>
                </g>
                <g id='60'>
                  <path
                    id='Rectangle 502'
                    className='shp6'
                    d='M201.6 14.65l-3.59 11.47.96.3 3.58-11.47-.95-.3z'
                  />
                  <text id='60' transform='matrix(.979 0 0 .968 200 9.692)'>
                    <tspan x='0' y='0' className='txt7'>
                      60
                    </tspan>
                  </text>
                </g>
                <g id='40'>
                  <path
                    id='Rectangle 502'
                    className='shp6'
                    d='M113.69 14.62l3.58 11.46-.96.3-3.58-11.46.96-.3z'
                  />
                  <text id='40' transform='translate(116.048 9.929)'>
                    <tspan x='0' y='0' className='txt8'>
                      40
                    </tspan>
                  </text>
                </g>
                <g id='20'>
                  <path
                    id='Rectangle 502'
                    className='shp6'
                    d='M37.99 68.16l10.5 5.8-.48.88-10.5-5.8.48-.88z'
                  />
                  <text id='20' transform='translate(34.048 70.929)'>
                    <tspan x='0' y='0' className='txt8'>
                      20
                    </tspan>
                  </text>
                </g>
                <g id='0'>
                  <path
                    id='Rectangle 502'
                    className='shp6'
                    d='M11 149h12v1H11v-1z'
                  />
                  <text id='0' transform='translate(8.048 153.929)'>
                    <tspan x='0' y='0' className='txt8'>
                      0
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Meter
