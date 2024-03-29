import { useState } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import FlightDetailsModal from '../FlightDetailsModal/FlightDetailsModal'

const FlightDetail = () => {
  const { flightId } = useParams()
  const currentFlight = useSelector(
    (state: any) => state.flightReducer
  ).flights.filter((flight: any) => flight.id == flightId)[0]
  const [showDetails, setShowDetails] = useState<boolean>(false)

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>
            {currentFlight.from} To {currentFlight.to}
          </Card.Title>
          <Row>
            <Col sm={6} xs={12}>
              <Card.Text>Flight No: {currentFlight.flightNo}</Card.Text>
            </Col>
            <Col sm={6} xs={12}>
              <Card.Text>Flight Name: {currentFlight.airline}</Card.Text>
            </Col>
            <Col sm={6} xs={12}>
              <Card.Text>Departure: {currentFlight.departureDate}</Card.Text>
            </Col>
            <Col sm={6} xs={12}>
              <Card.Text>Arrival: {currentFlight.arrivalDate}</Card.Text>
            </Col>
          </Row>
          <Button
            className="btn mt-2"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            Details
          </Button>
        </Card.Body>
      </Card>

      {showDetails && (
        <FlightDetailsModal
          show={showDetails}
          flight={currentFlight}
          closeModal={() => setShowDetails(false)}
        />
      )}
    </div>
  )
}

export default FlightDetail
