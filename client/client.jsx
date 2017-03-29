import 'babel-polyfill';
import './style.scss';

import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';

import { Provider, connect } from 'react-redux';

import configureStore from './configureStore';

const store = configureStore();

store.subscribe(() =>
    console.log(store.getState())
)

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
store.dispatch({ type: 'ADD_FILE', name: '1.txt' });
store.dispatch({ type: 'REMOVE_FILE', name: '1.txt' });

render (
    <Root />,
    document.getElementById('root')
);