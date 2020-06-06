import {all, takeLatest} from 'redux-saga/effects';
import {TypesActions} from '../../reducers/developer/index';
import {Add} from '../developer/add';

export default function* RootSaga(){
    yield all([
        takeLatest(TypesActions.ADD_REQUEST, Add)
    ]);
}