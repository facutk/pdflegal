import { COUNTER_INCREMENT, COUNTER_DECREMENT } from 'constants/action-types'

export const counterIncrement = () => ({
  type: COUNTER_INCREMENT
})

export const counterDecrement = () => ({
  type: COUNTER_DECREMENT
})

export const asyncCounterIncrement = () => (dispatch, getState) => {
  setTimeout(() => dispatch(counterIncrement()), 500)
}

export const asyncCounterDecrement = () => (dispatch, getState) => {
  setTimeout(() => dispatch(counterDecrement()), 500)
}