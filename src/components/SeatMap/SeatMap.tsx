import { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { IFlight } from '../FlightDetailsModal/FlightDetailsModal'
import { getFlightTickets, IPassenger } from '../PassengersList/PassengersList'
import Seat from '../Seat/Seat'

const SeatMap = (props: any) => {
  const { canSelect, getSelectedSeat, flightId } = props
  const [flightSeats, setFlightSeats] = useState<string[]>([])
  const [selectedSeat, setSelectedSeat] = useState<string>()
  const currentFlight: IFlight = useSelector(
    (state: any) => state.flightReducer
  ).flights.filter((flight: any) => flight.id == flightId)[0]
  const { passengers } = useSelector(
    (state: any) => state.passengerReducer
  )
  const [specialMeals, setSpecialMeals] = useState<string[]>([])
  const dispatch = useDispatch()

  useEffect(()=>{
    // getFlightById(flightId)
    // getFlightById(flightId).then((res)=>console.log(res))
    
    // getFlightTickets(flightId as string, dispatch)

    const temp = passengers.map((passenger: IPassenger)=>{
      if(passenger.specialMeal != "none"){
        return passenger.seatNo
      }
    })
    setSpecialMeals(temp);
  }, [passengers])

  useEffect(()=>{
    setFlightSeats(currentFlight?.selectedSeats)
  }, [currentFlight])

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
                flightSeats?.find((seat: string) => seat == currSeat)
                  ? true
                  : false
              }
              specialMeal={
                specialMeals?.find((seat) => seat == currSeat)
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
          {canSelect && <div className="d-flex mt-2">
            <i
              className={`fa-solid fa-couch seat me-2`}
              style={{ color: 'green' }}
            ></i>
            <div>selected</div>
          </div>}
        </Col>
      </Row>
    </>
  )
}

export default SeatMap
