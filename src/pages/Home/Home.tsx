import { useSelector } from 'react-redux'
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard'
import FlightsList from '../../components/FlightsList/FlightsList'

const Home = () => {
  const isAdmin: boolean = useSelector(
    (state: any) => state.authReducer.authData
  ).user.isAdmin

  return <>{isAdmin ? <AdminDashboard /> : <FlightsList />}</>
}

export default Home
