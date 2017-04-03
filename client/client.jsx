import 'babel-polyfill'
import './style.scss'

import React from 'react'
import { render } from 'react-dom'

import Root from 'components/Root'
import Counter from 'components/Counter'

import { Provider } from 'react-redux'
import store from 'store'

render (
    <Provider store={store}>
        <Counter />
    </Provider>,
    document.getElementById('root')
)