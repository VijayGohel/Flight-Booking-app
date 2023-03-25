import './FlightsList.scss'
import { Button, Container, Table } from 'react-bootstrap'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFlightsList } from '../../actions/FlightAction'
import { useNavigate } from 'react-router-dom'

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
                  <Button
                    className="btn"
                    size="sm"
                    onClick={() => navigate(`../flight/${flight.id}`)}
                  >
                    Check-In
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default FlightsList
