import axios from 'axios'
import { IFlight } from '../components/FlightDetailsModal/FlightDetailsModal'

const API = axios.create({ baseURL: 'http://localhost:3001' })

export const getFlightsList = () => API.get('/flights')

export const updateFlight = (
  flightId: string | undefined,
  formData: IFlight | undefined
) => API.patch(`/flights/${flightId}`, formData)
