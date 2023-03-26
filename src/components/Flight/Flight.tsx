import './Flight.scss'
import { Col, Row, Table } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import PassengersList from '../PassengersList/PassengersList'
import FlightDetail from '../FlightDetail/FlightDetail'

const Flight = () => {
  return (
    <Container className="flight">
      <Row className="mb-3">
        <FlightDetail />
      </Row>
      <Row>
        <Col>
          <PassengersList />
        </Col>
      </Row>
      <Row>
        <Col>Seat Map</Col>
      </Row>
    </Container>
  )
}

export default Flight
