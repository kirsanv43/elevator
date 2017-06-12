import { createStore, applyMiddleware, compose } from 'redux';
import manager from './middleware/manager';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware( ReduxThunk))
);

export default store;
