import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001' })

export const getTickets = (flightId?: string) =>
  API.get(`/tickets${flightId ? '?flightId=' + flightId : ''}`)
