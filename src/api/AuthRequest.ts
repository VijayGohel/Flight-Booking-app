import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001' })

export const login = (formData: any) => API.post('/login', formData)

export const signup = (formData: any) => API.post('/register', formData)
