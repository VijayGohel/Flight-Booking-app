import './NavBar.scss'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../actions/AuthAction'

const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout() as any)
  }

  return (
    <>
      <Navbar bg="light" variant="light" className="navbar">
        <Container>
          <Navbar.Brand onClick={()=>navigate("/")} className="nav-brand">
            <i className="fa-solid fa-plane"></i>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={()=>navigate("/flights")}>Flights</Nav.Link>
            <Nav.Link onClick={()=>navigate("/passengers")}>Passengers</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
