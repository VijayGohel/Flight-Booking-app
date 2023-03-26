import { useEffect, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { Button, Form } from 'react-bootstrap'

export interface IFlight {
  id: string
  flightNo: string
  airline: string
  from: string
  to: string
  departureDate: string
  arrivalDate: string
  ancillaryServices: string[]
  specialMeals: string[]
  shoppingItems: string[]
}

const FlightDetailsModal = (props: any) => {
  const { show, closeModal } = props
  const [flight, setFlight] = useState<IFlight>()

  useEffect(() => {
    setFlight(props.flight)
  }, [])

  const handleClose = () => {
    closeModal()
  }

  const handleChange = (e: any) => {}

  const handleSave = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const addInput = (inputField: "ancillaryServices" | "specialMeals" | "shoppingItems") => {
    const temp: string[] = [...flight[inputField]]
    temp.push("")
    setFlight({...flight, [inputField]: temp})
  }

  const removeInput = (inputField: "ancillaryServices" | "specialMeals" | "shoppingItems", index: number) => {
    const temp: string[] = [...flight[inputField]]
    temp.splice(index, 1)
    setFlight({...flight, [inputField]: temp})
  }

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" show={show}>
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title id="contained-modal-title-vcenter">
          Flight Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Form>
          <Row>
            <Col sm={6} xs={12} className="mb-3">
              <div className="mb-2">Flight No</div>
              <div>{flight?.flightNo}</div>
            </Col>
            <Col sm={6} xs={12} className="mb-3">
              <div className="mb-2">Flight Name</div>
              <div>{flight?.airline}</div>
            </Col>
          </Row>

          <Row>
            <Col sm={6} xs={12} className="mb-3">
              <div className="mb-2">From</div>
              <div>{flight?.from}</div>
            </Col>
            <Col sm={6} xs={12} className="mb-3">
              <div className="mb-2">To</div>
              <div>{flight?.to}</div>
            </Col>
          </Row>

          <Row>
            <Col sm={6} xs={12} className="mb-3">
              <div className="mb-2">Departure</div>
              <div>{flight?.departureDate}</div>
            </Col>
            <Col sm={6} xs={12} className="mb-3">
              <div className="mb-2">Arrival</div>
              <div>{flight?.arrivalDate}</div>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Ancillary Services</Form.Label>
            <Button className='btn' size='sm' onClick={()=>addInput("ancillaryServices")}>Add</Button>
            {flight?.ancillaryServices.map((service: string, index: number) => (
              <Row className='my-2' key={`ancillaryServices_${service}`}>
              <Col xs={10}>
                <Form.Control
                  value={service}
                  type="text"
                  aria-label={service}
                  required
                  name={`ancillaryServices_${service}`}
                  onChange={handleChange}
                />
              </Col>
              <Col xs={1}>
                <i className={'fa-solid fa-xmark mt-2'} style={{fontSize: 20}} onClick={()=>removeInput("ancillaryServices", index)}></i>
              </Col>
            </Row>
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Special meals</Form.Label>
            <Button className='btn' size='sm' onClick={()=>addInput("specialMeals")}>Add</Button>
            {flight?.specialMeals.map((meal: string, index: number) => (
              <Row className='my-2' key={`specialMeal_${meal}`}>
              <Col xs={10}>
                <Form.Control
                  value={meal}
                  type="text"
                  aria-label={meal}
                  required
                  name={`specialMeal_${meal}`}
                  onChange={handleChange}
                />
              </Col>
              <Col xs={1}>
                <i className={'fa-solid fa-xmark mt-2'} style={{fontSize: 20}} onClick={()=>removeInput("specialMeals", index)}></i>
              </Col>
            </Row>
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Shopping Items</Form.Label>
            <Button className='btn' size='sm' onClick={()=>addInput("shoppingItems")}>Add</Button>
            {flight?.shoppingItems.map((item: string, index: number) => (
              <Row className='my-2' key={`shoppingItems_${item}`}>
                <Col xs={10}>
                  <Form.Control
                    value={item}
                    type="text"
                    aria-label={item}
                    required
                    name={`shoppingItems_${item}`}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={1}>
                  <i className={'fa-solid fa-xmark mt-2'} style={{fontSize: 20}} onClick={()=>removeInput("shoppingItems", index)}></i>
                </Col>
              </Row>
            ))}
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

export default FlightDetailsModal
