import './styles.scss'
import Auth from './pages/Auth/Auth'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'

export const App = () => {
  const user = useSelector((state) => state.authReducer.authData)
  console.log(user)

  return (
    <div className="app">
      <div className="blur"> </div>
      <div className="blur"> </div>

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
      </Routes>
    </div>
  )
}
