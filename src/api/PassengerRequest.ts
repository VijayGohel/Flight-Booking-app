import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001' })

export const getPassengersList = (passengerId: string) =>
  API.get(`/passengers/${passengerId}`)

export const checkinPassenger = (passengerId: string, checkIn: boolean) => 
 API.patch(`/passengers/${passengerId}`, {"isCheckedIn": checkIn})
