import React from 'react'
import { connect } from 'react-redux'
import { asyncCounterIncrement, asyncCounterDecrement } from 'actions/counter'

const mapStateToProps = (state) => ({
  counter: state.counter
})

const mapDispatchToProps = (dispatch) => {
  return {
    onIncClick: () => {
      dispatch(asyncCounterIncrement())
    },
    onDecClick: () => {
      dispatch(asyncCounterDecrement())
    }
  }
}

let Counter = (props) => (
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

Counter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default Counter
