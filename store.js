// import { configureStore, createSlice } from '@reduxjs/toolkit'
import { initialState } from './redux/constant'
import reducers from './redux/reducers'
import { createStore, applyMiddleware } from 'redux'
import Thunk from 'redux-thunk'


const store = createStore(reducers, initialState, applyMiddleware(Thunk))
export default store;