import { useEffect, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateFlight } from '../../actions/FlightAction'
import SeatMap from '../SeatMap/SeatMap'

export interface IFlight {
  id: string
  flightNo: string
  airline: string
  from: string
  to: string
  departureDate: string
  arrivalDate: string
  selectedSeats: []
  ancillaryServices: []
  specialMeals: []
  shoppingItems: []
}

const FlightDetailsModal = (props: any) => {
  const { show, closeModal } = props
  const [flight, setFlight] = useState<IFlight>()
  const dispatch = useDispatch()
  const isAdmin: boolean = useSelector(
    (state: any) => state.authReducer.authData
  ).user.isAdmin

  useEffect(() => {
    const temp = JSON.parse(JSON.stringify(props.flight))
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
      const ancillaryServicesTemp = temp.ancillaryServices.map(
        (item: any) => item.value
      )
      const specialMealsTemp = temp.specialMeals.map((item: any) => item.value)
      const shoppingItemsTemp = temp.shoppingItems.map(
        (item: any) => item.value
      )

      temp.ancillaryServices = ancillaryServicesTemp
      temp.specialMeals = specialMealsTemp
      temp.shoppingItems = shoppingItemsTemp

      dispatch(updateFlight(temp?.id, temp) as any)
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
              <div className="mb-2 fw-bold">Flight No</div>
              <div>{flight?.flightNo}</div>
            </Col>
            <Col sm={6} xs={12} className="mb-3">
              <div className="mb-2 fw-bold">Flight Name</div>
              <div>{flight?.airline}</div>
            </Col>
          </Row>

          <Row>
            <Col sm={6} xs={12} className="mb-3">
              <div className="mb-2 fw-bold">From</div>
              <div>{flight?.from}</div>
            </Col>
            <Col sm={6} xs={12} className="mb-3">
              <div className="mb-2 fw-bold">To</div>
              <div>{flight?.to}</div>
            </Col>
          </Row>

          <Row>
            <Col sm={6} xs={12} className="mb-3">
              <div className="mb-2 fw-bold">Departure</div>
              <div>{flight?.departureDate}</div>
            </Col>
            <Col sm={6} xs={12} className="mb-3">
              <div className="mb-2 fw-bold">Arrival</div>
              <div>{flight?.arrivalDate}</div>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Ancillary Services</Form.Label>
            {isAdmin && (
              <Button
                className="btn"
                size="sm"
                onClick={() => addInput('ancillaryServices')}
              >
                Add
              </Button>
            )}
            {flight?.ancillaryServices.map((service: any, index: number) => (
              <Row className="my-2" key={`ancillaryServices_${index}`}>
                {isAdmin ? (
                  <>
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
                        className={'fa-solid fa-xmark mt-2 fs-4'}
                        onClick={() => removeInput('ancillaryServices', index)}
                      ></i>
                    </Col>
                  </>
                ) : (
                  <div>{service.value}</div>
                )}
              </Row>
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Special meals</Form.Label>
            {isAdmin && (
              <Button
                className="btn"
                size="sm"
                onClick={() => addInput('specialMeals')}
              >
                Add
              </Button>
            )}
            {flight?.specialMeals.map((meal: any, index: number) => (
              <Row className="my-2" key={`specialMeal_${index}`}>
                {isAdmin ? (
                  <>
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
                        className={'fa-solid fa-xmark mt-2 fs-4'}
                        onClick={() => removeInput('specialMeals', index)}
                      ></i>
                    </Col>
                  </>
                ) : (
                  <div>{meal.value}</div>
                )}
              </Row>
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Shopping Items</Form.Label>
            {isAdmin && (
              <Button
                className="btn"
                size="sm"
                onClick={() => addInput('shoppingItems')}
              >
                Add
              </Button>
            )}
            {flight?.shoppingItems.map((item: any, index: number) => (
              <Row className="my-2" key={`shoppingItems_${index}`}>
                {isAdmin ? (
                  <>
                    <Col xs={10}>
                      <Form.Control
                        value={item.value}
                        type="text"
                        aria-label={item}
                        required
                        name={`shoppingItems_${index}`}
                        onChange={(e) =>
                          handleChange(e, 'shoppingItems', index)
                        }
                        isInvalid={item.error}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter Shopping Item.
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={1}>
                      <i
                        role="button"
                        className={'fa-solid fa-xmark mt-2 fs-4'}
                        onClick={() => removeInput('shoppingItems', index)}
                      ></i>
                    </Col>
                  </>
                ) : (
                  <div>{item.value}</div>
                )}
              </Row>
            ))}
          </Form.Group>
        </Form>

        <SeatMap currentFlight={flight} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {isAdmin && (
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default FlightDetailsModal
