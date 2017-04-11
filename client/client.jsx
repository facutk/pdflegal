import 'babel-polyfill'
import './style.scss'

import React from 'react'
import { render } from 'react-dom'

import Root from 'components/Root'

import { Provider } from 'react-redux'
import store from 'store'

render (
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
