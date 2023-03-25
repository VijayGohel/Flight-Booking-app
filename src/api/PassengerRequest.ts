import axios from 'axios'
import { IPassenger } from '../components/PassengersList/PassengersList'

const API = axios.create({ baseURL: 'http://localhost:3001' })

export const getPassengersList = (passengerId: string) =>
  API.get(`/passengers/${passengerId}`)

export const updatePassenger = (
  passengerId: string | undefined,
  formData: IPassenger | undefined
) => API.patch(`/passengers/${passengerId}`, formData)

export const checkinPassenger = (passengerId: string, checkIn: boolean) =>
  API.patch(`/passengers/${passengerId}`, { isCheckedIn: checkIn })
