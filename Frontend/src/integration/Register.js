import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  let [Rname, setRname] = useState("");
  let [Remail, setemail] = useState("");
  let [Rpassword, setRpassword] = useState("");
  let [RCpassword, setRCpassword] = useState("");

  const navigate = useNavigate()
  useEffect(() => {
    let authtoken = localStorage.getItem("token")
    if (authtoken) {
      navigate("/home")
    }
  }, [navigate])
  let handleregister = (e) => {
    if (!Rname || !Remail || !Rpassword || !RCpassword) {
      return alert("Feilds are required")
    }
    else if (Rpassword !== RCpassword) {
      return alert("Password does not match")
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "name": Rname,
      "email": Remail,
      "password": Rpassword,
      "confirmpassword": RCpassword
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5055/api/register", requestOptions)
      .then(response => response.json())
      .then(result => { console.log(result); })
      .catch(error => console.log('error', error));
    navigate("/");
    alert("User Registered Successfully")
  }

  return (
    <> 
      <div className='Register-container'>
      <h1 className='heading-top'>REGISTER</h1>
      <input type='text' className='input-field' placeholder='Full Name' value={Rname} onChange={(e) => setRname(e.target.value)} /><br />
      <input type='text' className='input-field' placeholder='Email' value={Remail} onChange={(e) => setemail(e.target.value)} /><br />
      <input type='password' className='input-field' placeholder='Password' value={Rpassword} onChange={(e) => setRpassword(e.target.value)} /><br />
      <input type='password' className='input-field' placeholder='Confirm Password' value={RCpassword} onChange={(e) => setRCpassword(e.target.value)} /><br />
      <button onClick={handleregister} className='register-btn' >Register</button>
      <p>Already Have an Account?</p>
      <Link to="/"><button className='register-btn'>Sign In</button></Link>
      </div>
    </> 

  )
}

export default Register