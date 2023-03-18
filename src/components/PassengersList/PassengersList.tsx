import { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPassengersList } from '../../actions/PassengerAction'

interface IPassenger {
  id: string
  flightId: string
  firstName: string
  lastName: string
  mobileNo: number
  dateOfBirth: string
  gender: 'Male' | 'Female'
  passport: string
  address: string
  seatNo: string
  ancillaryServices: string[]
  specialMeal: string
  shoppingItems: string[]
  isCheckedIn: boolean
  isWheelChair: boolean
  iswithInfants: boolean
}

const PassengersList = () => {
  const { flightId } = useParams()
  const dispatch = useDispatch()
  const { passengers, loading } = useSelector(
    (state: any) => state.passengerReducer
  )

  useEffect(() => {
    dispatch(getPassengersList(flightId as string) as any)
  }, [])

  return (
    <div>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Seat No</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((passenger: IPassenger) => (
            <tr key={passenger.id}>
              <td>{passenger.id}</td>
              <td>{passenger.firstName}</td>
              <td>{passenger.lastName}</td>
              <td>{passenger.gender}</td>
              <td>{passenger.seatNo}</td>
              <td>{passenger.isCheckedIn ? 'Checked-In' : 'Not Checked-In'}</td>
              <td>
                <Button
                  className="btn m-2"
                  size="sm"
                  onClick={() => console.log(`Clicked ${passenger.id}`)}
                >
                  {!passenger.isCheckedIn ? 'Check-In' : 'Undo Check-In'}
                </Button>
                <Button
                  className="btn m-2"
                  size="sm"
                  onClick={() => console.log(`Clicked ${passenger.id}`)}
                >
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default PassengersList
