import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.scss'

const AdminDashboard = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Row>
        <Col sm={12} md={6} className="d-flex justify-content-center mt-5">
          <Button
            className="manage-btns"
            onClick={() => navigate('../flights')}
          >
            Manage Flights
          </Button>
        </Col>
        <Col sm={12} md={6} className="d-flex justify-content-center mt-5">
          <Button
            className="manage-btns"
            onClick={() => navigate('../passengers')}
          >
            Manage Passengers
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard
