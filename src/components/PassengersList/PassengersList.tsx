import { Button, Table } from 'react-bootstrap'

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
  const passenger: IPassenger = {
    id: '1',
    flightId: '1',
    firstName: 'Vijay',
    lastName: 'Gohel',
    mobileNo: 1234567890,
    dateOfBirth: '15/05/2000',
    gender: 'Male',
    passport: 'DEMO123',
    address: 'Rajkot, Gujarat, India',
    seatNo: 'C1',
    ancillaryServices: ['Drinks', 'Baggage'],
    specialMeal: 'Veg Special',
    shoppingItems: ['Magazins', 'Books'],
    isCheckedIn: false,
    isWheelChair: false,
    iswithInfants: false,
  }

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
          <tr>
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
        </tbody>
      </Table>
    </div>
  )
}

export default PassengersList
