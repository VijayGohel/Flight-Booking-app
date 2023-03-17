import './FlightsList.scss'
import { Button, Container, Table } from "react-bootstrap"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFlightsList } from '../../actions/FlightAction'

const FlightsList = () => {
    const dispatch = useDispatch();
    const {flights, loading} = useSelector((state: any)=>state.flightReducer);

    useEffect(()=>{
        dispatch(getFlightsList() as any);
    },[])

  return (
    <Container fluid>
      {loading ? "Fetching Flights..." : 
        !flights ? "No flights available right now." :
        <Table striped bordered hover className='mt-5 table'>
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
        {flights.map(flight => 
        (<tr key={flight.id}>
          <td>{flight.id}</td>
          <td>{flight.airline}</td>
          <td>{flight.flightNo}</td>
          <td>{flight.from}</td>
          <td>{flight.to}</td>
          <td>{flight.departureDate}</td>
          <td><Button className='btn' size='sm'>Check-In</Button></td>
        </tr>)
          )}
        
      </tbody>
    </Table>
  }
    </Container>
  )
}

export default FlightsList