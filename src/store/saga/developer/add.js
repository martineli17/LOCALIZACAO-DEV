import {put, select} from 'redux-saga/effects';
import {Creators, TypesMessagens} from '../../reducers/developer/index';
import {Api} from '../../../services/axios/base';

export  function* Add(action){
   
    try{
        const exists = yield select(state => state.Developers.data.find(dev => dev.login === action.payload.developer.user));
        if(exists){
            yield put(Creators.ErrorRequest(TypesMessagens.EXISTS));
        }
        else{
            const response = yield Api.get(`users/${action.payload.developer.user}`);
            const dataDeveloper = {
                nome: response.data.name,
                login: response.data.login,
                avatar: response.data.avatar_url,
                id: response.data.id,
                latitude: action.payload.developer.latitude,
                longitude: action.payload.developer.longitude,
            };
            yield put(Creators.AddDeveloperSuccess(dataDeveloper));
        }
       
    }
    catch{
        yield put(Creators.ErrorRequest(TypesMessagens.ERRORS));
    }
}