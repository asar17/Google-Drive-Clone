import {configureStore} from '@reduxjs/toolkit'
import modelReducer from '../slices/Model/modelSlice.js'
import photoReducer from '../slices/photoDisplay/photoSlice.js'
import userReducer from '../slices/user/userSlice.js'
import folderReducer from '../slices/folderDisplay/folderSlice.js'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import thunk from 'redux-thunk'
//1---to combine reducer to pass it to persist reducer
const rootReducer=combineReducers({
        model:modelReducer,
        photos: photoReducer,
        user:userReducer,
        folders:folderReducer,
});
//2----to make localstorage from persist
const persistConfig={
    key:'root',
    storage,
};
//3----to make persist reducer
const persistedReducer=persistReducer(persistConfig,rootReducer)

const store=configureStore({
    reducer:persistedReducer,
    middleware:[thunk],
})
export default store