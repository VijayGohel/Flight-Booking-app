import { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassenger } from '../../actions/PassengerAction'
import { IPassenger } from '../PassengersList/PassengersList'

const PassengerDetailsModal = (props: any) => {
  const { show, flight, closeModal } = props
  const [passenger, setPassenger] = useState<IPassenger>()
  const [validated, setValidated] = useState({
    firstName: false,
    lastName: false,
    mobileNo: false,
    dateOfBirth: false,
    passport: false,
    address: false,
  })
  const isAdmin: boolean = useSelector(
    (state: any) => state.authReducer.authData
  ).user.isAdmin
  const dispatch = useDispatch()

  useEffect(() => {
    setPassenger(props.passenger)
  }, [])

  const handleChange = (e: any) => {
    if (e.target.type == 'checkbox') {
      const name: 'ancillaryServices' | 'shoppingItems' =
        e.target.name.split('_')[0]
      const value: string = e.target.name.split('_')[1]
      let temp: string[] | undefined =
        passenger && passenger[name].map((item: string) => item)

      if (e.target.checked) temp?.push(value)
      else temp = temp?.filter((item) => item != value)
      setPassenger({ ...passenger, [name]: temp })
    } else if (e.target.type == 'radio') {
      const name = e.target.name.split('_')[0]
      let value = e.target.name.split('_')[1]
      value = value == 'true' ? true : value == 'false' ? false : value
      setPassenger({ ...passenger, [name]: value })
    } else {
      setPassenger({ ...passenger, [e?.target?.name]: e?.target?.value })
      const temp = {...validated}
      temp[e?.target?.name]=false
      setValidated(temp);
    }
  }

  const handleClose = () => {
    closeModal()
  }

  const handleSave = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    let hasError: boolean = false;
    const errors = {...validated};

    [
      'firstName',
      'lastName',
      'mobileNo',
      'dateOfBirth',
      'passport',
      'address',
    ].map((item) => {
      if (!passenger[item] || passenger[item] == '') {
        hasError = true
        errors[item] = true;
      }

    })
    if (!hasError) {
      dispatch(updatePassenger(passenger?.id, passenger) as any)
      closeModal()
    }
    else
      setValidated(errors)
  }

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" show={show}>
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title id="contained-modal-title-vcenter">
          Passenger Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Form>
          <Row>
            <Col sm={6} xs={12} className="mb-3">
              <Form.Group controlId="validationFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={passenger?.firstName}
                  name={'firstName'}
                  plaintext={!isAdmin}
                  readOnly={!isAdmin}
                  required
                  isInvalid={validated.firstName}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter first name.
                </Form.Control.Feedback>
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
                  required
                  isInvalid={validated.lastName}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter last name.
                </Form.Control.Feedback>
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
                  required
                  isInvalid={validated.mobileNo}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter mobile number.
                </Form.Control.Feedback>
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
                  required
                  isInvalid={validated.dateOfBirth}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter date of birth.
                </Form.Control.Feedback>
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
                  required
                  isInvalid={validated.passport}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter passport.
                </Form.Control.Feedback>
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
              required
              isInvalid={validated.address}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ancillary Services</Form.Label>
            {flight.ancillaryServices.map((service: string) => (
              <Form.Check
                key={`ancillaryServices_${service}`}
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
                key={`specialMeal_${meal}`}
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
                key={`shoppingItems_${item}`}
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