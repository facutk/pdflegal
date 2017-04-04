import { INCREMENT, DECREMENT } from 'constants/action-types'

export const incCounter = () => (dispatch, getState) => {
    setTimeout( () => dispatch({
        type: 'INCREMENT'
    }), 500)
}

export const decCounter = () => (dispatch, getState) => {
    setTimeout( () => dispatch({
        type: 'DECREMENT'
    }), 500)
}