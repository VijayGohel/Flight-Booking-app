import renderer from 'react-test-renderer'
import Auth from './Auth'
import store from '../../store/ReduxStore'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'

it('by default signup window should be displayed', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.GOOGLEOAUTH_CLIENTID || ''}>
        <Auth />
      </GoogleOAuthProvider>
    </Provider>
  )
  expect(tree).toMatchSnapshot()
})
