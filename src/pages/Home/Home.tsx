import React from 'react'
import { Button } from 'react-bootstrap'
import FlightsList from '../../components/FlightsList/FlightsList'
import NavBar from '../../components/NavBar/NavBar'

const Home = () => {
  return (
    <>
      <NavBar />
      <FlightsList />
    </>
  )
}

export default Home
