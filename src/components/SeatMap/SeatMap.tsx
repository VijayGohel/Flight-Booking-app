import { useState } from 'react'
import { Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import Seat from '../Seat/Seat'

const SeatMap = (props: any) => {
  const { canSelect, getSelectedSeat } = props
  const [flightSeats, setFlightSeats] = useState([
    { seatNo: '1A', specialMeal: false },
    { seatNo: '3C', specialMeal: false },
    { seatNo: '2D', specialMeal: true },
  ])
  const [selectedSeat, setSelectedSeat] = useState()

  const toggleSeat = (e: any) => {
    const currSeat = e.target.parentNode.childNodes[1].innerText
    console.log(currSeat)
    setSelectedSeat(currSeat)
    getSelectedSeat(currSeat)
  }

  const displaySeats = () => {
    const seats: any = []
    let row = 1,
      col = 1
    for (row = 1; row <= 10; row += 1) {
      const seatsRow = []
      for (col = 1; col <= 6; col += 1) {
        const currSeat = JSON.stringify(row) + String.fromCharCode(64 + col)
        seatsRow.push(
          <div
            className={`text-center seat-row d-inline-block m-1 ${
              col == 3 ? 'me-4' : ''
            }`}
            key={currSeat}
          >
            <Seat
              value={currSeat}
              selected={currSeat == selectedSeat ? true : false}
              disableSeat={
                flightSeats.find((seat) => seat.seatNo == currSeat)
                  ? true
                  : false
              }
              specialMeal={
                flightSeats.find((seat) => seat.seatNo == currSeat)?.specialMeal
                  ? true
                  : false
              }
              onClick={toggleSeat}
              canSelect={canSelect}
            />
          </div>
        )
      }
      seats.push(<div key={row}>{seatsRow}</div>)
    }

    return seats
  }

  return (
    <>
      <Row className="text-center">
        <Col sm={12} md={8}>
          {displaySeats()}
        </Col>
        <Col sm={12} md={4}>
          <div className="d-flex mt-2">
            <i
              className={`fa-solid fa-couch seat me-2`}
              style={{ color: 'orange' }}
            ></i>
            <div>Special Meal</div>
          </div>
          <div className="d-flex mt-2">
            <i
              className={`fa-solid fa-couch seat me-2`}
              style={{ color: 'blue' }}
            ></i>
            <div>Booked</div>
          </div>
          <div className="d-flex mt-2">
            <i
              className={`fa-solid fa-couch seat me-2`}
              style={{ color: 'gray' }}
            ></i>
            <div>Available</div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default SeatMap
