import './Flight.scss'
import { Col, Row, Table } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import PassengersList from '../PassengersList/PassengersList'

const Flight = () => {
  return (
    <Container className="flight">
      <Row>
        <Col md={8} sm={12}>
          <PassengersList />
        </Col>
        <Col md={4} sm={12}>
          Seat Map
        </Col>
      </Row>
    </Container>
  )
}

export default Flight
