import { useEffect, useState } from 'react'
import { Button, Table, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getFlightsList } from '../../actions/FlightAction'
import { checkIn, getPassengersList } from '../../actions/PassengerAction'
import { getTickets } from '../../api/TicketRequest'
import { IFlight } from '../FlightDetailsModal/FlightDetailsModal'
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
  seatNo?: string
  flightId: string
  ticketId: string
  ancillaryServices: string[]
  specialMeal: string
  shoppingItems: string[]
  isCheckedIn: boolean
  isWheelChair: boolean
  iswithInfants: boolean
}

export const getFlightTickets = async (flightId: string, dispatch: any) => {
  try {
    const { data } = await getTickets(flightId)
    dispatch(getPassengersList(data) as any)
  } catch (error) {
    console.log(error)
  }
}

const PassengersList = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [selectedPassenger, setSelectedPassenger] = useState<any>({})

  const { flightId } = useParams()
  const dispatch = useDispatch()
  const { passengers, loading } = useSelector(
    (state: any) => state.passengerReducer
  )
  const [currentFlight, setCurrentFlight] = useState<IFlight>({} as IFlight)
  const flights = useSelector((state: any) => state.flightReducer).flights

  const isAdmin: boolean = useSelector(
    (state: any) => state.authReducer.authData
  ).user.isAdmin

  useEffect(() => {
    getFlightTickets(flightId as string, dispatch)
    dispatch(getFlightsList() as any)
  }, [])

  return (
    <Container>
      {loading ? (
        'Fetching Passengers...'
      ) : !passengers ? (
        'No Passengers available for this flight.'
      ) : (
        <Table
          striped
          bordered
          hover
          className={`table ${flightId ? '' : 'mt-5'}`}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Flight No.</th>
              <th>Seat No</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((passenger: IPassenger) => (
              <tr key={passenger.ticketId}>
                <td>{passenger.id}</td>
                <td>{passenger.firstName}</td>
                <td>{passenger.lastName}</td>
                <td>{passenger.gender}</td>
                <td>
                  {
                    flights.filter(
                      (flight: any) => flight.id == passenger.flightId
                    )[0]?.flightNo
                  }
                </td>
                <td>{passenger.seatNo}</td>
                <td>
                  {passenger.isCheckedIn ? 'Checked-In' : 'Not Checked-In'}
                </td>
                <td>
                  {!isAdmin && (
                    <Button
                      className="btn m-2 d-inline-block"
                      size="sm"
                      onClick={() =>
                        dispatch(
                          checkIn(passenger.id, !passenger.isCheckedIn) as any
                        )
                      }
                    >
                      {!passenger.isCheckedIn ? 'Check-In' : 'Undo Check-In'}
                    </Button>
                  )}
                  <Button
                    className="btn m-2 d-inline-block"
                    size="sm"
                    onClick={() => {
                      setCurrentFlight(
                        flights.filter(
                          (flight: any) => flight.id == passenger.flightId
                        )[0]
                      )
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
    </Container>
  )
}

export default PassengersList
