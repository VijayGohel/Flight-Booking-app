import './FlightsList.scss'
import { Button, Container, Table } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFlightsList } from '../../actions/FlightAction'
import { useNavigate } from 'react-router-dom'
import FlightDetailsModal from '../FlightDetailsModal/FlightDetailsModal'

interface IFlightDetails {
  id: string
  flightNo: number
  airline: string
  from: string
  to: string
  departureDate: string
  arrivalDate: string
  special_meals: string[]
  ancillary: string[]
}

const FlightsList = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [selectedFlight, setSelectedFlight] = useState<any>({})
  const isAdmin: boolean = useSelector(
    (state: any) => state.authReducer.authData
  ).user.isAdmin
  const dispatch = useDispatch()
  const { flights, loading } = useSelector((state: any) => state.flightReducer)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getFlightsList() as any)
  }, [])

  return (
    <Container>
      {loading ? (
        'Fetching Flights...'
      ) : !flights ? (
        'No flights available right now.'
      ) : (
        <>
          <Table striped bordered hover className="mt-5 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Airline</th>
                <th>Flight Number</th>
                <th>From</th>
                <th>To</th>
                <th>Depart At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight: IFlightDetails) => (
                <tr key={flight.id}>
                  <td>{flight.id}</td>
                  <td>{flight.airline}</td>
                  <td>{flight.flightNo}</td>
                  <td>{flight.from}</td>
                  <td>{flight.to}</td>
                  <td>{flight.departureDate}</td>
                  <td>
                    {!isAdmin && (
                      <Button
                        className="btn m-2 d-inline-block"
                        size="sm"
                        onClick={() => navigate(`../flight/${flight.id}`)}
                      >
                        Check-In
                      </Button>
                    )}
                    <Button
                      className="btn m-2 d-inline-block"
                      size="sm"
                      onClick={() => {
                        setShowDetails(!showDetails)
                        setSelectedFlight(flight)
                      }}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {showDetails && (
            <FlightDetailsModal
              show={showDetails}
              flight={selectedFlight}
              closeModal={() => setShowDetails(false)}
            />
          )}
        </>
      )}
    </Container>
  )
}

export default FlightsList
