import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import "../form.scss"
import "./styles_form/styling_forms.scss"
import { useAuth } from '../hooks/useAuth'
import Alert from "../../../Components/alert"

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { loading, handelLogin } = useAuth()
  const [email, Setemail] = useState("")
  const [password, Setpassword] = useState("")
  const [showPass, SetShowPass] = useState("password")
  const [showPassSVG, SetShowPassSVG] = useState(true)


  const [alert, setAlert] = useState({
    type: location.state?.message ? "success" : "",
    message: location.state?.message || ""
  })
  // Form Submition

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await handelLogin({ email, password });

      const redirectTo = location.state?.redirectTo || "/";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.response?.data?.message || "Login failed."
      });
    }
  }
  // Loading 
  if (loading) {
    return <main><h1 style={{ color: "black",}}>Loading......</h1></main>
  }

  // Password show btn.
  const ShowP = () => {
    if (showPass == "password") {
      SetShowPass("text")
      SetShowPassSVG(false)
    }
    else {
      SetShowPass("password")
      SetShowPassSVG(true)
    }
  }

  return (
    <main>
      <div className='form-container' id='sign'>
        <h1>Login</h1>
        <Alert type={alert.type} message={alert.message} className="Form-Alert-styling" />
        <form onSubmit={handelSubmit}>
          <div className='input-group'>
            <label htmlFor="email" id="l_email_label">E-mail</label>
            <input onChange={(e) => { Setemail(e.target.value) }} type="email" id='email' name='email' placeholder='abc@gmail.com' required={true} />
          </div>
          <div className='input-group'>
            <label htmlFor="password">Password</label>
            <div className='input-group-password'>
              <input onChange={(e) => { Setpassword(e.target.value) }} type={`${showPass}`} id='password' name='password' placeholder='enter Password' minLength={6} required={true} />
              <span onClick={ShowP} >
                {showPassSVG ?
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M599-361q49-49 49-119t-49-119q-49-49-119-49t-119 49q-49 49-49 119t49 119q49 49 119 49t119-49Zm-187-51q-28-28-28-68t28-68q28-28 68-28t68 28q28 28 28 68t-28 68q-28 28-68 28t-68-28ZM220-270.5Q103-349 48-480q55-131 172-209.5T480-768q143 0 260 78.5T912-480q-55 131-172 209.5T480-192q-143 0-260-78.5ZM480-480Zm207 158q95-58 146-158-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58q112 0 207-58Z" /></svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="m637-425-62-62q4-38-23-65.5T487-576l-62-62q13-5 27-7.5t28-2.5q70 0 119 49t49 119q0 14-2.5 28t-8.5 27Zm133 133-52-52q36-28 65.5-61.5T833-480q-49-101-144.5-158.5T480-696q-26 0-51 3t-49 10l-58-58q38-15 77.5-21t80.5-6q143 0 261.5 77.5T912-480q-22 57-58.5 103.5T770-292Zm-2 202L638-220q-38 14-77.5 21t-80.5 7q-143 0-261.5-77.5T48-480q22-57 58-104t84-85L90-769l51-51 678 679-51 51ZM241-617q-35 28-65 61.5T127-480q49 101 144.5 158.5T480-264q26 0 51-3.5t50-9.5l-45-45q-14 5-28 7.5t-28 2.5q-70 0-119-49t-49-119q0-14 3.5-28t6.5-28l-81-81Zm287 89Zm-96 96Z" /></svg>
                }
              </span>
            </div>
          </div>
          <button className='btn primary-btn md-btn'>Login</button>
        </form>
        <div className='redirection'>
          <p>Don't have an account? <Link className='link' to={"/signup"}>SignUp</Link></p>
        </div>
      </div>
    </main>
  )
}
export default Login