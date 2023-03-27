import * as FlightApi from '../api/FlightRequest'
import { IFlight } from '../components/FlightDetailsModal/FlightDetailsModal'

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

export const updateFlight =
  (flightId: string | undefined, formData: IFlight | undefined) =>
  async (dispatch: any) => {
    dispatch({ type: 'FLIGHT_UPDATING_START' })
    try {
      const { data } = await FlightApi.updateFlight(flightId, formData)
      dispatch({ type: 'FLIGHT_UPDATING_SUCCESS', data: data })
    } catch (error) {
      dispatch({ type: 'FLIGHT_UPDATING_FAIL' })
      console.log(error)
    }
  }
