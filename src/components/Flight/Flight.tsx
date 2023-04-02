import './Flight.scss'
import { Col, Row, Table } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import PassengersList from '../PassengersList/PassengersList'
import FlightDetail from '../FlightDetail/FlightDetail'
import SeatMap from '../SeatMap/SeatMap'

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
        <Col>
          <SeatMap />
        </Col>
      </Row>
    </Container>
  )
}

export default Flight
