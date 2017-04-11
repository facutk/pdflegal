import { combineReducers } from 'redux'
import counter from './counter'
import files from './files'

const reducers = combineReducers({
  counter,
  files
})

export default reducers
