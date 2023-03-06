import ReactDOM from 'react-dom'
import { App } from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.render(
  <GoogleOAuthProvider clientId={process.env.GOOGLEOAUTH_CLIENTID || ''}>
    <App />
  </GoogleOAuthProvider>,
  document.getElementById('root')
)
