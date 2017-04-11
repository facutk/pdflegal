import { createStore, applyMiddleware} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

const store = createStore(
  reducers,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(thunk)
)

export default store
