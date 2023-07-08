
import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authReducer'
import emailReducer from './emailReducer'

const store=configureStore({
    reducer:{auth:authReducer,mail:emailReducer}
})

export default store