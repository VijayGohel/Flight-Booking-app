const passengerReducer = (
  state = { passengers: [], loading: false, updating: false, error: false },
  action: any
) => {
  switch (action.type) {
    case 'RETRIEVING_START':
      return { ...state, loading: true, error: false }
    case 'RETRIEVING_SUCCESS':
      return { ...state, loading: false, error: false, passengers: action.data }
    case 'RETRIEVING_FAIL':
      return { ...state, loading: false, error: true }
    default:
      return state
  }
}

export default passengerReducer
