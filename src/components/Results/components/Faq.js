import * as React from 'react'
import { useStore } from 'react-context-hook'
import { useState } from 'react'
import ScrollableAnchor from 'react-scrollable-anchor'

const data = [
  {
    title: 'What pages do you inspect?',
    text: "We do a shopify speed test on the home and cart page. Then our code will randomly pick a collection and a product page to analyze as well. We think it’s important your entire shopify store gets a speed check and not just your homepage!"
  },
  {
    title: 'Why do you detect the store theme?',
    text: 'Right under the “overall score” on the owner page you can see the theme the store uses. We look for patterns and compare it to our database of the main themes. We can’t recognize all themes just yet - and some stores have a custom theme. A future feature will be to compare your score vs your theme score out of the box. So you can see how heavily your changes affect your site’s performance.'
  },
  {
   title: 'Why do you detect apps?',
   text: 'We analyze the store to detect which apps are used. You will see that you might have some apps show up that you uninstalled - this means the source code wasn’t removed and the app code is still there slowing you down!\n' +
     '\n' +
     'Our code scans your site against patterns of 431 apps for the moment - so not all apps will be detected - but we’re working on it - the more people use our app the better it gets, so tell your friends!'
  },
  {
    key: 'waterfall',
    title: 'What is a waterfall?',
    text: 'Here you see a timeline of which files got loaded in chronological order. And how long it took each file to load. This will give you a solid idea which files are slowing down your site.'
  },
  {
    key: 'images',
    title: 'Optimizing images',
    text: 'Images can be optimized for speed. In some cases lowering the quality of the image will not be noticeable to your clients but will go a long way performance wise. PNG are usually larger files so if possible save your pictures in a JPEG format! Also avoid resizing images with css tricks.',
  },
  {
    key: 'js',
    title: 'What is JS?',
    text: 'JavaScript is a code language used to make your Shopify store dynamic.Here is how well the JS on your store is optimized for speed. Some JS issues might originate from apps you use! Make sure you don’t have old app code lingering on your site.'
  },
  {
    key: 'html',
    title: 'What is HTML?',
    text: 'HTML code builds the structure of your Shopify store. Having a long DOM - when your page is very long- can affect your page speed. Re-directs and deadlinks also affect the shopify speed. That said overall HTML is usually only a minor contributor vs the real cause of a failing Shopify speedtest.'
  },
  {
    key: 'css',
    title: 'What is CSS?',
    text: 'CSS code makes your site pretty with colors, spacing and more. Minimizing your css files can sometimes make a difference in your shopify page speed. Similarly - you would want to avoid inline css or any css tricks that resize images. '
  },
]

export default class Faq extends React.Component {
  render () {
    return (
      <div {...{ className: 'wrapper' }}>
        <h2>Frequently Asked Questions</h2>
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
              {data.text}
            </p>
          </div>
        </div>
      </div>
    </ScrollableAnchor>
  )
}
