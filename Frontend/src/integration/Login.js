import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
  let [username, setusername] = useState("");
  let [password, setpassword] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    let authtoken = localStorage.getItem("token");

    if (authtoken) {
      navigate("/home")
    }
  }, [navigate])
  let handlelogin = (e) => {
    e.preventDefault()
    if (!username || !password) {
      return alert("Feilds are required")
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": username,
      "password": password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`http://localhost:5055/api/login`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.token) {
          console.log(result);
          localStorage.setItem("token", JSON.stringify(result.token));
          navigate("/home");
        }
        else {
          alert("Invalid Email or Password");
        }

      })
      .catch(error => console.log('error', error));
  }
  return (
    <>
    <div className='container-login'>
       <nav>
        <nav className="navbar">
          <div className="container">
            <div className="logo">
              TASK LIST
            </div>
          </div>
        </nav>
      </nav>
      <div className='login-content'>
    <h2 className='heading-top'>SIGN IN</h2>
    <input className='input-field' type='text' placeholder='Email' value={username} onChange={(e) => setusername(e.target.value)} /><br />
    <input className='input-field' type='password' placeholder='  Password' value={password} onChange={(e) => setpassword(e.target.value)} /><br />
    <button className='submit-btn' onClick={handlelogin}>Sign In</button>
    <p className='info-text'>Don't Have an Account?</p>
    <Link to="/register" className='register-link'><button className='register-btn'>Register</button></Link>
    </div>
      </div>
    </>
  )
}

export default Login