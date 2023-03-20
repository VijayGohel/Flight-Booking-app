import * as PassengerApi from '../api/PassengerRequest'

export const getPassengersList = (tickets: any[]) => async (dispatch: any) => {
  dispatch({ type: 'RETRIEVING_START' })
  try {
    const passengersList: any[] = tickets.map(async (ticket) => {
      const data = await PassengerApi.getPassengersList(ticket.passengerId)
      data.data[0].seatNo = ticket.seatNo
      return data.data[0]
    })
    Promise.all(passengersList).then((res) =>
      dispatch({ type: 'RETRIEVING_SUCCESS', data: res })
    )
  } catch (error) {
    console.log(error)
    dispatch({ type: 'RETRIEVING_FAIL' })
  }
}
