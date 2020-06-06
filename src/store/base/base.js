import {createStore, applyMiddleware} from 'redux';
import combineReducers from '../reducers/base/base';
import createSagaMiddleware from 'redux-saga';
import RootSaga from '../saga/base/base';

const sagaMiddleware = createSagaMiddleware();
const Store = createStore(combineReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(RootSaga);

export default Store;