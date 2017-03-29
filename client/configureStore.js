import { createStore } from 'redux';
import reducers from './reducers'

const configureStore = () => {
    const store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());
    return store;
};

export default configureStore;