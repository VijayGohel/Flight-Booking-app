import './styles.scss'
import Auth from './pages/Auth/Auth'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Flight from './components/Flight/Flight'
import NavBar from './components/NavBar/NavBar'
import FlightsList from './components/FlightsList/FlightsList'
import PassengersList from './components/PassengersList/PassengersList'

export const App = () => {
  const user = useSelector((state: any) => state.authReducer.authData)

  return (
    <div className="app">
      <div className="app-bg"></div>
      {user && <NavBar />}

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="/home" /> : <Auth />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/auth" />}
        />
        <Route
          path="/flight/:flightId"
          element={user ? <Flight /> : <Navigate to="/auth" />}
        />
        <Route
          path="/flights"
          element={user ? <FlightsList /> : <Navigate to="/auth" />}
        />
        <Route
          path="/passengers"
          element={user ? <PassengersList /> : <Navigate to="/auth" />}
        />
      </Routes>
    </div>
  )
}
