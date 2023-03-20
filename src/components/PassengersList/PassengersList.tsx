import { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPassengersList } from '../../actions/PassengerAction'
import { getTickets } from '../../api/TicketRequest'

interface IPassenger {
  id: string
  firstName: string
  lastName: string
  mobileNo: number
  dateOfBirth: string
  gender: 'Male' | 'Female'
  passport: string
  address: string
  seatNo: string
  ancillaryServices: string[]
  specialMeal: string
  shoppingItems: string[]
  isCheckedIn: boolean
  isWheelChair: boolean
  iswithInfants: boolean
}

const PassengersList = () => {
  const { flightId } = useParams()
  const dispatch = useDispatch()
  const { passengers, loading } = useSelector(
    (state: any) => state.passengerReducer
  )

  useEffect(() => {
    getFlightTickets(flightId as string)
  }, [])

  const getFlightTickets = async (flightId: string) => {
    try {
      const { data } = await getTickets(flightId)
      dispatch(getPassengersList(data) as any)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {loading ? (
        'Fetching Flights...'
      ) : !passengers ? (
        'No flights available right now.'
      ) : (
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Seat No</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((passenger: IPassenger) => (
              <tr key={passenger.id}>
                <td>{passenger.id}</td>
                <td>{passenger.firstName}</td>
                <td>{passenger.lastName}</td>
                <td>{passenger.gender}</td>
                <td>{passenger.seatNo}</td>
                <td>
                  {passenger.isCheckedIn ? 'Checked-In' : 'Not Checked-In'}
                </td>
                <td>
                  <Button
                    className="btn m-2"
                    size="sm"
                    onClick={() => console.log(`Clicked ${passenger.id}`)}
                  >
                    {!passenger.isCheckedIn ? 'Check-In' : 'Undo Check-In'}
                  </Button>
                  <Button
                    className="btn m-2"
                    size="sm"
                    onClick={() => console.log(`Clicked ${passenger.id}`)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default PassengersList
