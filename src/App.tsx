import './styles.scss'
import Auth from './pages/Auth/Auth'

export const App = () => {
  const hello = 'Hello'
  return (
    <div className="app">
      <div className="blur"> </div>
      <div className="blur"> </div>

      <Auth />
    </div>
  )
}
