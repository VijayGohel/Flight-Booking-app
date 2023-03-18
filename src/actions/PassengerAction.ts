import * as PassengerApi from '../api/PassengerRequest'

export const getPassengersList =
  (flightId: string) => async (dispatch: any) => {
    dispatch({ type: 'RETRIEVING_START' })
    try {
      const passengersList = await PassengerApi.getPassengersList()
      dispatch({ type: 'RETRIEVING_SUCCESS', data: passengersList.data })
    } catch (error) {
      console.log(error)
      dispatch({ type: 'RETRIEVING_FAIL' })
    }
  }
