import { useEffect, useState } from 'react'
import { ButtonGroup } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
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

const adminFilter = [
  'All',
  'Missing Passport',
  'Missing Address',
  'Missing Date of Birth',
]
const staffFilter = [
  'All',
  'Chcked-In',
  'Not Checked-In',
  'Wheel Chair',
  'Is With Infant',
]

export const getFlightTickets = async (
  flightId: string | undefined,
  dispatch: any
) => {
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
  const [currentFilter, setCurrentFilter] = useState<string>('All')
  const [filteredPassengers, setFilteredPassengers] =
    useState<IPassenger[]>(passengers)
  const isAdmin: boolean = useSelector(
    (state: any) => state.authReducer.authData
  ).user.isAdmin

  useEffect(() => {
    getFlightTickets(flightId as string, dispatch)
    dispatch(getFlightsList() as any)
  }, [])

  const passengersFilter = isAdmin ? adminFilter : staffFilter

  const onSelectFilter = (key: any, event: object) => {
    let tempPassengers: IPassenger[] = []
    switch (key) {
      case 'All':
        tempPassengers = passengers.filter((passenger: IPassenger) => passenger)
        break
      case 'Missing Passport':
        tempPassengers = passengers.filter(
          (passenger: IPassenger) => !passenger.passport
        )
        break
      case 'Missing Address':
        tempPassengers = passengers.filter(
          (passenger: IPassenger) => !passenger.address
        )
        break
      case 'Missing Date of Birth':
        tempPassengers = passengers.filter(
          (passenger: IPassenger) => !passenger.dateOfBirth
        )
        break
      case 'Chcked-In':
        tempPassengers = passengers.filter(
          (passenger: IPassenger) => passenger.isCheckedIn
        )
        break
      case 'Not Checked-In':
        tempPassengers = passengers.filter(
          (passenger: IPassenger) => !passenger.isCheckedIn
        )
        break
      case 'Wheel Chair':
        tempPassengers = passengers.filter(
          (passenger: IPassenger) => passenger.isWheelChair
        )
        break
      case 'Is With Infant':
        tempPassengers = passengers.filter(
          (passenger: IPassenger) => passenger.iswithInfants
        )
        break
      default:
        break
    }
    setFilteredPassengers(tempPassengers)
    setCurrentFilter(key)
  }

  return (
    <Container>
      {loading ? (
        'Fetching Passengers...'
      ) : !passengers ? (
        'No Passengers available for this flight.'
      ) : (
        <>
          <Dropdown
            as={ButtonGroup}
            id={'passenger-filters'}
            onSelect={onSelectFilter}
            className={`${flightId ? '' : 'mt-5'} mb-3`}
          >
            <Dropdown.Toggle id="dropdown-title">
              {currentFilter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {passengersFilter.map((filter: string) => (
                <Dropdown.Item
                  eventKey={filter}
                  key={filter}
                  active={currentFilter == filter}
                >
                  {filter}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Table striped bordered hover className={'table'}>
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
              {filteredPassengers.map(
                (passenger: IPassenger, index: number) => (
                  <tr key={passenger.ticketId + ' ' + index}>
                    <td>{index + 1}</td>
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
                              checkIn(
                                passenger.id,
                                !passenger.isCheckedIn
                              ) as any
                            )
                          }
                        >
                          {!passenger.isCheckedIn
                            ? 'Check-In'
                            : 'Undo Check-In'}
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
                )
              )}
            </tbody>
          </Table>
        </>
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
