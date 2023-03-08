import { useGoogleLogin } from '@react-oauth/google'
import { useState, useEffect } from 'react'
import './Auth.scss'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import * as AuthAction from '../../actions/AuthAction'

const Auth = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPass: '',
  }

  const [isSignup, setIsSignup] = useState(true)
  const [passMatched, setPassMatched] = useState(true)
  const [data, setData] = useState(initialState)
  const [user, setUser] = useState([] as any)
  const [profile, setProfile] = useState([])
  const dispatch = useDispatch()

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
      if (data.password != data.confirmPass) 
        setPassMatched(false)
      else
        dispatch(AuthAction.singup(data) as any)
    } 
    else 
      dispatch(AuthAction.login(data) as any)
  }

  const resetForm = () => {
    setPassMatched(true)
    setData(initialState)
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
                  onChange={handleChange}
                  name="firstName"
                  id="first-name"
                  className="form-input"
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={data.lastName}
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
                type="text"
                placeholder="Email"
                value={data.email}
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
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </form>

        <hr />

        <div className="row justify-content-center">
          <a onClick={login} className="btn signin-google">
            <i className="fa-brands fa-google"></i>
            <div style={{ width: '10px' }}></div>
            <span>Login with Google</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Auth
