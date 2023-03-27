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
  ancillaryServices: []
  specialMeals: []
  shoppingItems: []
}

const FlightDetailsModal = (props: any) => {
  const { show, closeModal } = props
  const [flight, setFlight] = useState<IFlight>()

  useEffect(() => {
    const temp = props.flight
    const ancillaryServicesTemp = temp.ancillaryServices.map((item: string) => {
      return {
        value: item,
        error: false,
      }
    })
    const specialMealsTemp = temp.specialMeals.map((item: string) => {
      return {
        value: item,
        error: false,
      }
    })
    const shoppingItemsTemp = temp.shoppingItems.map((item: string) => {
      return {
        value: item,
        error: false,
      }
    })

    temp.ancillaryServices = ancillaryServicesTemp
    temp.specialMeals = specialMealsTemp
    temp.shoppingItems = shoppingItemsTemp

    setFlight(temp)
  }, [])

  const handleClose = () => {
    closeModal()
  }

  const handleChange = (
    e: any,
    inputField: 'ancillaryServices' | 'specialMeals' | 'shoppingItems',
    index: number
  ) => {
    const temp: any[] = [...flight[inputField]]
    temp[index].value = e.target.value
    temp[index].error = false
    setFlight({ ...flight, [inputField]: temp })
  }

  const handleSave = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    const temp = JSON.parse(JSON.stringify(flight))

    let hasError: boolean = false
    ;['ancillaryServices', 'specialMeals', 'shoppingItems'].map(
      (category: any) => {
        temp[category].map((item: any, index: number) => {
          if (
            !temp[category][index].value ||
            temp[category][index].value == ''
          ) {
            hasError = true
            temp[category][index].error = true
          }
        })
      }
    )
    if (!hasError) {
      // dispatch(updatePassenger(passenger?.id, passenger) as any)
      closeModal()
    } else setFlight(temp)
  }

  const addInput = (
    inputField: 'ancillaryServices' | 'specialMeals' | 'shoppingItems'
  ) => {
    const temp: any[] = [...flight[inputField]]
    temp.push({ value: '', error: false })
    setFlight({ ...flight, [inputField]: temp })
  }

  const removeInput = (
    inputField: 'ancillaryServices' | 'specialMeals' | 'shoppingItems',
    index: number
  ) => {
    const temp: string[] = [...flight[inputField]]
    temp.splice(index, 1)
    setFlight({ ...flight, [inputField]: temp })
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
            <Button
              className="btn"
              size="sm"
              onClick={() => addInput('ancillaryServices')}
            >
              Add
            </Button>
            {flight?.ancillaryServices.map((service: any, index: number) => (
              <Row className="my-2" key={`ancillaryServices_${index}`}>
                <Col xs={10}>
                  <Form.Control
                    value={service.value}
                    type="text"
                    aria-label={service.value}
                    required
                    name={`ancillaryServices_${index}`}
                    onChange={(e) =>
                      handleChange(e, 'ancillaryServices', index)
                    }
                    isInvalid={service.error}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter Ancillary Service.
                  </Form.Control.Feedback>
                </Col>
                <Col xs={1}>
                  <i
                    role="button"
                    className={'fa-solid fa-xmark mt-2'}
                    style={{ fontSize: 20 }}
                    onClick={() => removeInput('ancillaryServices', index)}
                  ></i>
                </Col>
              </Row>
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Special meals</Form.Label>
            <Button
              className="btn"
              size="sm"
              onClick={() => addInput('specialMeals')}
            >
              Add
            </Button>
            {flight?.specialMeals.map((meal: any, index: number) => (
              <Row className="my-2" key={`specialMeal_${index}`}>
                <Col xs={10}>
                  <Form.Control
                    value={meal.value}
                    type="text"
                    aria-label={meal}
                    required
                    name={`specialMeal_${index}`}
                    onChange={(e) => handleChange(e, 'specialMeals', index)}
                    isInvalid={meal.error}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter Meal.
                  </Form.Control.Feedback>
                </Col>
                <Col xs={1}>
                  <i
                    role="button"
                    className={'fa-solid fa-xmark mt-2'}
                    style={{ fontSize: 20 }}
                    onClick={() => removeInput('specialMeals', index)}
                  ></i>
                </Col>
              </Row>
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Shopping Items</Form.Label>
            <Button
              className="btn"
              size="sm"
              onClick={() => addInput('shoppingItems')}
            >
              Add
            </Button>
            {flight?.shoppingItems.map((item: any, index: number) => (
              <Row className="my-2" key={`shoppingItems_${index}`}>
                <Col xs={10}>
                  <Form.Control
                    value={item.value}
                    type="text"
                    aria-label={item}
                    required
                    name={`shoppingItems_${index}`}
                    onChange={(e) => handleChange(e, 'shoppingItems', index)}
                    isInvalid={item.error}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter Shopping Item.
                  </Form.Control.Feedback>
                </Col>
                <Col xs={1}>
                  <i
                    role="button"
                    className={'fa-solid fa-xmark mt-2'}
                    style={{ fontSize: 20 }}
                    onClick={() => removeInput('shoppingItems', index)}
                  ></i>
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
