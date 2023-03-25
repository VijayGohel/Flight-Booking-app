const passengerReducer = (
  state = { passengers: [], loading: false, updating: false, error: false },
  action: any
) => {
  let passengers
  switch (action.type) {
    case 'PASSENGERS_RETRIEVING_START':
      return { ...state, loading: true, error: false }
    case 'PASSENGERS_RETRIEVING_SUCCESS':
      return { ...state, loading: false, error: false, passengers: action.data }
    case 'PASSENGERS_RETRIEVING_FAIL':
      return { ...state, loading: false, error: true }
    case 'PASSENGER_UPDATING_START':
      return { ...state, loading: true, error: false }
    case 'PASSENGER_UPDATING_SUCCESS':
      passengers = state.passengers.map((passenger: any) =>
        passenger.id == action.data.id ? { ...action.data } : passenger
      )
      return { ...state, loading: false, error: false, passengers: passengers }
    case 'PASSENGER_UPDATING_FAIL':
      return { ...state, loading: false, error: true }
    case 'CHECKIN_START':
      return { ...state, loading: true, error: false }
    case 'CHECKIN_SUCCESS':
      passengers = state.passengers.map((passenger: any) =>
        passenger.id == action.data.id ? { ...action.data } : passenger
      )
      return { ...state, loading: false, error: false, passengers: passengers }
    case 'CHECKIN_FAIL':
      return { ...state, loading: false, error: true }
    default:
      return state
  }
}

export default passengerReducer
