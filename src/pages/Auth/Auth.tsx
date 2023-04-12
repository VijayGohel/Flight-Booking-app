import { useGoogleLogin } from '@react-oauth/google'
import { useState, useEffect } from 'react'
import './Auth.scss'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import * as AuthAction from '../../actions/AuthAction'

const Auth = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPass: '',
  }

  const [isSignup, setIsSignup] = useState(false)
  const [passMatched, setPassMatched] = useState(true)
  const [data, setData] = useState(initialState)
  const [user, setUser] = useState(null as any)
  const [profile, setProfile] = useState([])
  const [localError, setLocalError] = useState<boolean>(false)
  const [localLoading, setLocalLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state: any) => state.authReducer)

  useEffect(() => {
    setLocalError(error)
  }, [error])

  useEffect(() => {
    setLocalLoading(localLoading || loading)
  }, [loading])

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          setProfile(res.data)
          axios
            .get(`http://localhost:3001/users?email=${res.data.email}`)
            .then((res2) => {
              if (res2.data.length) {
                dispatch(
                  AuthAction.login({
                    email: res.data.email,
                    password: 'googleAuth',
                  }) as any
                )
              } else {
                const temp = {
                  email: res.data.email,
                  firstName: res.data.given_name,
                  lastName: res.data.family_name,
                  password: 'googleAuth',
                }
                dispatch(AuthAction.singup(temp) as any)
              }
            })
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (isSignup) {
      if (data.password != data.confirmPass) setPassMatched(false)
      else {
        const { confirmPass, ...otherDetails } = data
        dispatch(AuthAction.singup(otherDetails) as any)
      }
    } else dispatch(AuthAction.login(data) as any)
  }

  const resetForm = () => {
    setPassMatched(true)
    setData(initialState)
    setLocalError(false)
    setLocalLoading(false)
  }

  const login: any = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  })

  return (
    <div className="container d-flex justify-content-center">
      <div className="card login-container">
        <h3 className="card-title">{isSignup ? 'Sign Up' : 'Login'}</h3>

        <form className="signup-form" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <input
                  type="text"
                  placeholder="First Name"
                  value={data.firstName}
                  required
                  onChange={handleChange}
                  name="firstName"
                  id="first-name"
                  className="form-input form-control"
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={data.lastName}
                  required
                  onChange={handleChange}
                  name="lastName"
                  id="last-name"
                  className="form-input"
                />
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-sm-12">
              <input
                type="email"
                placeholder="Email"
                value={data.email}
                required
                onChange={handleChange}
                name="email"
                id="email"
                className="form-input"
              />
            </div>
          </div>

          <div className="row">
            <div className={`${isSignup ? 'col-md-6' : ''} col-sm-12`}>
              <input
                type="password"
                placeholder="Password"
                value={data.password}
                required
                onChange={handleChange}
                name="password"
                id="pass"
                className="form-input"
              />
            </div>
            {isSignup && (
              <div className={`${isSignup ? 'col-md-6' : ''} col-sm-12`}>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={data.confirmPass}
                  required
                  onChange={handleChange}
                  name="confirmPass"
                  id="confirm-pass"
                  className="form-input"
                />
              </div>
            )}
          </div>

          {!passMatched && (
            <span className="pass-match">*Password does not match!</span>
          )}

          {localError && localLoading && (
            <span className="pass-match">{`${
              isSignup ? 'Signup' : 'Login'
            } failed! Please try again.`}</span>
          )}

          <div
            className="login-link"
            onClick={() => {
              setIsSignup((prev) => !prev)
              resetForm()
            }}
          >
            <span>
              {isSignup
                ? 'Already have an account? Login!'
                : "Don't have an account? Signup!"}
            </span>
          </div>

          <div className="row justify-content-center mt-2">
            <button type="submit" className="btn signup-btn">
              {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </form>

        <hr />

        <div className="row justify-content-center">
          <button
            onClick={login}
            className="btn signin-google"
            disabled={loading}
          >
            {loading ? (
              'Loading...'
            ) : (
              <>
                <i className="fa-brands fa-google"></i>
                <div style={{ width: '10px' }}></div>
                <span>Login with Google</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth
