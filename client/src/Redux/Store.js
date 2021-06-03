import { createStore, applyMiddleware, compose} from 'redux';
import RootReducer from './RootReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    RootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

export default store;