import React from 'react'
import Footer from './components/Footer'

import './index.css'
import './App.css'
import Header from './components/Header'
// import { withStore } from 'react-context-hook'

// const storeConfig = {
//   // listener: state => {
//     // console.log('state changed', state)
//   // },
//   logging: process.env.NODE_ENV !== 'production'
// }

function App () {
  return (
    <div className='App'>
      <Header />
      <Footer />
    </div>
  )
}

export default App
