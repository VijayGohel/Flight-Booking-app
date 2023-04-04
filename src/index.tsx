import ReactDOM from 'react-dom'
import { App } from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux/es/exports'
import store from './store/ReduxStore'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.GOOGLEOAUTH_CLIENTID || ''}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById('root')
)
