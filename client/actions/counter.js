import { INCREMENT, DECREMENT } from 'constants/action-types'

const incCounter = () => (dispatch, getState) => {
    setTimeout( () => dispatch({
        type: 'INCREMENT'
    }), 500)
}

const decCounter = () => (dispatch, getState) => {
    setTimeout( () => dispatch({
        type: 'DECREMENT'
    }), 500)
}

export {
    incCounter,
    decCounter
}