const flightReducer = (
  state = { flights: [], loading: false, updating: false, error: false },
  action: any
) => {
  switch (action.type) {
    case 'RETRIEVING_START':
      return { ...state, loading: true, error: false }
    case 'RETRIEVING_SUCCESS':
      return { ...state, loading: false, error: false, flights: action.data }
    case 'RETRIEVING_FAIL':
      return { ...state, loading: false, error: true }
    default:
      return state
  }
}

export default flightReducer
