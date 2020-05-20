import * as React from 'react'
import { useStore } from 'react-context-hook'
import { useState } from 'react'
import ScrollableAnchor from 'react-scrollable-anchor'
import Markdown from 'markdown-to-jsx'

const data = [
  {
    title: 'Ecom Experts',
    text: "Ask [Ecom Experts](https://ecomexperts.io) to fix things for you."
  },
  {
    title: 'Independent Developer',
    text: "Ask [Lukas](https://www.lukaselsner.de) to fix things for you."
  },
]

export default class FixIt extends React.Component {
  render () {
    return (
      <div {...{ className: 'wrapper' }}>
        <h2>Hire someone to fix issues for you</h2>
        <p>This is a list of Agencies and Developers able to fix performance issues for you (under construction)</p>
        <ul {...{ className: 'accordion-list' }}>
          {data.map((data, key) => {
            return (
              <li {...{ className: 'accordion-list__item', key }}>
                <AccordionItem data={data}/>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const AccordionItem = ({ data }) => {
// class AccordionItem extends React.Component {
  const openFaq= useStore('openFaq')[0]
  const [state, setState] = useState(data.key && openFaq === data.key)

  return (
    <ScrollableAnchor id={'faq-' + data.key}>
      <div
        {...{
          className: `accordion-item, ${state && 'accordion-item--opened'}`,
          onClick: () => { setState(!state) }
        }}
      >
        <div {...{ className: 'accordion-item__line' }}>
          <h3 {...{ className: 'accordion-item__title' }}>
            {data.title}
          </h3>
          <span {...{ className: 'accordion-item__icon' }}/>
        </div>
        <div {...{ className: 'accordion-item__inner' }}>
          <div {...{ className: 'accordion-item__content' }}>
            <p {...{ className: 'accordion-item__paragraph' }}>
              <Markdown options={{
                overrides: {
                  a: {
                    props: {
                      target: '_blank',
                    },
                  },
                },
              }}>{data.text}</Markdown>
            </p>
          </div>
        </div>
      </div>
    </ScrollableAnchor>
  )
}
