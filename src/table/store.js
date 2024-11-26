import { applyMiddleware,legacy_createStore } from 'redux';
import productReducer from '../table/tableReducer';
import { thunk } from 'redux-thunk';
import { initialState } from '../table/tableReducer';

const middleware = [thunk];
const store = legacy_createStore(productReducer,initialState,applyMiddleware(...middleware));

export default store;