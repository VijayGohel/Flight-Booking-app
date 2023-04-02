import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001' })

export const getTickets = (flightId?: string) =>
  API.get(`/tickets${flightId ? '?flightId=' + flightId : ''}`)

export const updateTickets = (
  ticketId: string | undefined,
  seatNo: string | undefined
) => API.patch(`/tickets/${ticketId}`, {seatNo: seatNo})