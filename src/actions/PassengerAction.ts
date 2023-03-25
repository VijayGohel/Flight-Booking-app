import * as PassengerApi from '../api/PassengerRequest'

export const getPassengersList = (tickets: any[]) => async (dispatch: any) => {
  dispatch({ type: 'PASSENGERS_RETRIEVING_START' })
  try {
    const passengersList: any[] = tickets.map(async (ticket) => {
      const data = await PassengerApi.getPassengersList(ticket.passengerId)
      data.data.seatNo = ticket.seatNo
      return data.data
    })
    Promise.all(passengersList).then((res) =>
      dispatch({ type: 'PASSENGERS_RETRIEVING_SUCCESS', data: res })
    )
  } catch (error) {
    console.log(error)
    dispatch({ type: 'PASSENGERS_RETRIEVING_FAIL' })
  }
}

export const checkIn =
  (passengerId: string, checkIn: boolean) => async (dispatch: any) => {
    dispatch({ type: 'CHECKIN_START' })
    try {
      const { data } = await PassengerApi.checkinPassenger(passengerId, checkIn)
      dispatch({ type: 'CHECKIN_SUCCESS', data: data })
    } catch (error) {
      console.log(error)
      dispatch({ type: 'CHECKIN_ERROR' })
    }
  }
