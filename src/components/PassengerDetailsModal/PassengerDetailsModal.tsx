import { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Container, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { IPassenger } from '../PassengersList/PassengersList'

const PassengerDetailsModal = (props: any) => {
  const { show, flight } = props
  const [passenger, setPassenger] = useState<IPassenger>()
  const isAdmin: boolean = useSelector(
    (state: any) => state.authReducer.authData
  ).user.isAdmin

  useEffect(() => {
    setPassenger(props.passenger)
  }, [])

  const handleChange = (e: any) => {
    if (e.target.type == 'checkbox') {
      const name = e.target.name.split('_')[0]
      const value = e.target.name.split('_')[1]
      let temp = passenger[name].map((item) => item)

      if (e.target.checked) temp?.push(value)
      else temp = temp.filter((item) => item != value)
      setPassenger({ ...passenger, [name]: temp })
    } else if (e.target.type == 'radio') {
      const name = e.target.name.split('_')[0]
      let value = e.target.name.split('_')[1]
      value = value == 'true' ? true : value == 'false' ? false : value
      setPassenger({ ...passenger, [name]: value })
    } else setPassenger({ ...passenger, [e?.target?.name]: e?.target?.value })
  }

  const handleClose = () => {
    console.log('Close')
  }

  const handleSave = () => {
    console.log('Save')
  }

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" show={show}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Passenger Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            console.log(e)
          }}
        >
          <Row>
            <Col sm={6} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={passenger?.firstName}
                  name={'firstName'}
                  plaintext={!isAdmin}
                  readOnly={!isAdmin}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={6} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name={'lastName'}
                  value={passenger?.lastName}
                  plaintext={!isAdmin}
                  readOnly={!isAdmin}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={6} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Phone Number"
                  name={'mobileNo'}
                  value={passenger?.mobileNo}
                  plaintext={!isAdmin}
                  readOnly={!isAdmin}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={6} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date of Birth"
                  name={'dateOfBirth'}
                  value={passenger?.dateOfBirth}
                  plaintext={!isAdmin}
                  readOnly={!isAdmin}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <span style={{ marginRight: 10 }}></span>
            <Form.Check
              value="Male"
              type="radio"
              aria-label="male"
              label="Male"
              name={'gender_Male'}
              onChange={handleChange}
              checked={passenger?.gender == 'Male'}
              disabled={!isAdmin}
              inline
            />
            <Form.Check
              value="Female"
              type="radio"
              aria-label="female"
              label="Female"
              name={'gender_Female'}
              onChange={handleChange}
              checked={passenger?.gender == 'Female'}
              disabled={!isAdmin}
              inline
            />
          </Form.Group>

          <Row>
            <Col xs={6} className="mb-3">
              <div className="mb-2">Flight No</div>
              <div>{flight.flightNo}</div>
            </Col>
            <Col xs={6} className="mb-3">
              <div className="mb-2">Flight Name</div>
              <div>{flight.airline}</div>
            </Col>
          </Row>

          <Row>
            <Col sm={6} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label>Passport</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Passport"
                  name={'passport'}
                  value={passenger?.passport}
                  plaintext={!isAdmin}
                  readOnly={!isAdmin}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={6} xs={12} className="mb-3">
              <div className="mb-2">Seat Number</div>
              <div>{passenger?.seatNo}</div>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name={'address'}
              value={passenger?.address}
              plaintext={!isAdmin}
              readOnly={!isAdmin}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ancillary Services</Form.Label>
            {flight.ancillaryServices.map((service: string) => (
              <Form.Check
                value={service}
                type="checkbox"
                aria-label={service}
                name={`ancillaryServices_${service}`}
                label={service}
                onChange={handleChange}
                checked={passenger?.ancillaryServices.includes(service)}
              />
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Special meals</Form.Label>
            {flight.specialMeals.map((meal: string) => (
              <Form.Check
                value={meal}
                type="radio"
                aria-label={meal}
                name={`specialMeal_${meal}`}
                label={meal}
                onChange={handleChange}
                checked={passenger?.specialMeal == meal}
              />
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Shopping Items</Form.Label>
            {flight.shoppingItems.map((item: string) => (
              <Form.Check
                className="col-sm-6 col-md-3"
                value={item}
                type="checkbox"
                aria-label={item}
                label={item}
                name={`shoppingItems_${item}`}
                onChange={handleChange}
                checked={passenger?.shoppingItems.includes(item)}
              />
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>isWheelChair</Form.Label>
            <span style={{ marginRight: 10 }}></span>
            <Form.Check
              value="Yes"
              type="radio"
              aria-label="yes"
              label="Yes"
              name={'isWheelChair_true'}
              onChange={handleChange}
              checked={passenger?.isWheelChair}
              disabled={!isAdmin}
              inline
            />
            <Form.Check
              value="No"
              type="radio"
              aria-label="no"
              label="No"
              name={'isWheelChair_false'}
              onChange={handleChange}
              checked={!passenger?.isWheelChair}
              disabled={!isAdmin}
              inline
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>iswithInfants</Form.Label>
            <span style={{ marginRight: 10 }}></span>
            <Form.Check
              value="Yes"
              type="radio"
              aria-label="yes"
              label="Yes"
              name={'iswithInfants_true'}
              onChange={handleChange}
              checked={passenger?.iswithInfants}
              disabled={!isAdmin}
              inline
            />
            <Form.Check
              value="No"
              type="radio"
              aria-label="no"
              label="No"
              name={'iswithInfants_false'}
              onChange={handleChange}
              checked={!passenger?.iswithInfants}
              disabled={!isAdmin}
              inline
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PassengerDetailsModal
