import 'babel-polyfill';
import './style.scss';

import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';

import { Provider, connect } from 'react-redux';

import store from './store';

import { incCounter, decCounter } from './actions/counter'

const mapStateToProps = (state) => ({
    counter: state.counter
})

const mapDispatchToProps = (dispatch) => {
    return {
        onIncClick: () => {
            dispatch(incCounter())
        },
        onDecClick: () => {
            dispatch(decCounter())
        },
        onFileAdd: () => {
            dispatch({
                type: 'ADD_FILE',
                name: '1.txt'
            })
        }
    };
};

let CounterApp = (props) => (
    <div>
        <ul>
            <li>
                <b>Count: {props.counter}</b>
            </li>
            <li>
                <a href="#" onClick={()=>{props.onIncClick()}}>INCREMENT</a>
            </li>
            <li>
                <a href="#" onClick={()=>{props.onDecClick()}}>DECREMENT</a>
            </li>
        </ul>
    </div>
)

CounterApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(CounterApp)

render (
    <Provider store={store}>
        <CounterApp />
    </Provider>,
    document.getElementById('root')
);