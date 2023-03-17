import * as FlightApi from '../api/FlightRequest'

export const getFlightsList = () => async (dispatch: any) => {
  dispatch({ type: 'RETRIEVING_START' })
  try {
    const flightsList = await FlightApi.getFlightsList()
    dispatch({ type: 'RETRIEVING_SUCCESS', data: flightsList.data })
  } catch (error) {
    console.log(error)
    dispatch({ type: 'RETRIEVING_FAIL' })
  }
}
