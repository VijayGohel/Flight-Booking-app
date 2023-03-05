import { useState } from 'react'
import './Auth.scss'

const Auth = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    confirmPass: '',
  }

  const [isSignup, setIsSignup] = useState(true)
  const [passMatched, setPassMatched] = useState(true)
  const [data, setData] = useState(initialState)

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (isSignup) {
      if (data.password != data.confirmPass) setPassMatched(false)
      else console.log('SignUp', data)
    } else {
      // dispatch(login(data))
      console.log('Submit ', data)
    }
  }

  const resetForm = () => {
    setPassMatched(true)
    setData(initialState)
  }

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
                placeholder="Username"
                value={data.userName}
                onChange={handleChange}
                name="userName"
                id="user-name"
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
          <a href="/auth/google" className="btn signin-google">
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
