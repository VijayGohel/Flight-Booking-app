import { combineReducers } from 'redux'

import authReducer from './AuthReducer'
import flightReducer from './FlightReducer'

export const reducers = combineReducers({ authReducer, flightReducer })
