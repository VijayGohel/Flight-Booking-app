import { useEffect, useState } from 'react'
import { Button, Table, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { checkIn, getPassengersList } from '../../actions/PassengerAction'
import { getTickets } from '../../api/TicketRequest'
import PassengerDetailsModal from '../PassengerDetailsModal/PassengerDetailsModal'

export interface IPassenger {
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
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [selectedPassenger, setSelectedPassenger] = useState<any>({})

  const { flightId } = useParams()
  const dispatch = useDispatch()
  const { passengers, loading } = useSelector(
    (state: any) => state.passengerReducer
  )
  const currentFlight = useSelector(
    (state: any) => state.flightReducer
  ).flights.filter((flight: any) => flight.id == flightId)[0]

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
        'Fetching Passengers...'
      ) : !passengers ? (
        'No Passengers available for this flight.'
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
                    onClick={() =>
                      dispatch(
                        checkIn(passenger.id, !passenger.isCheckedIn) as any
                      )
                    }
                  >
                    {!passenger.isCheckedIn ? 'Check-In' : 'Undo Check-In'}
                  </Button>
                  <Button
                    className="btn m-2"
                    size="sm"
                    onClick={() => {
                      setShowDetails(!showDetails)
                      setSelectedPassenger(passenger)
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {showDetails && (
        <PassengerDetailsModal
          show={showDetails}
          passenger={selectedPassenger}
          flight={currentFlight}
          closeModal={() => setShowDetails(false)}
        />
      )}
    </div>
  )
}

export default PassengersList
