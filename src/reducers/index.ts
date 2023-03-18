import { combineReducers } from 'redux'

import authReducer from './AuthReducer'
import flightReducer from './FlightReducer'
import passengerReducer from './PassengerReducer'

export const reducers = combineReducers({
  authReducer,
  flightReducer,
  passengerReducer,
})
