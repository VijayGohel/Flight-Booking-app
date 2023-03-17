import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001' })

export const getFlightsList = () => API.get('/flightListData')