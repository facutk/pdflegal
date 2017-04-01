import 'babel-polyfill';
import './style.scss';

import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';

import { Provider, connect } from 'react-redux';

import configureStore from './configureStore';

//const store = configureStore();

//store.subscribe(() =>
    //console.log(store.getState())
//)

//store.dispatch({ type: 'INCREMENT' });
//store.dispatch({ type: 'INCREMENT' });
//store.dispatch({ type: 'DECREMENT' });
//store.dispatch({ type: 'ADD_FILE', name: '1.txt' });
//store.dispatch({ type: 'REMOVE_FILE', name: '1.txt' });

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIncClick: () => {
            dispatch({
                type: 'INCREMENT',
            })
        },
        onDecClick: () => {
            dispatch({
                type: 'DECREMENT',
            })
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
    <Provider store={configureStore()}>
        <CounterApp />
    </Provider>,
    document.getElementById('root')
);