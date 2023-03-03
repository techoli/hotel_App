import React, { useState, useEffect } from 'react'
import axios from "axios";
import Loader from '../Component/Loader';
import Error from '../Component/Error';
import Success from '../Component/Success';

function Loginscreen() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false)

  async function login() {

    const userl = {
      email,
      password
    };
    console.log(userl)
    try {
      setloading(true)
      const result = (await axios.post("api/users/login", userl)).data
      setsuccess(true)
      setloading(false)
      seterror(false)
      localStorage.setItem('currentuser', JSON.stringify(result))
      window.location.href = '/homes'
    } catch (error) {
      seterror(true)
      setloading(false)

    }

  }
  return (
    <div>
      {loading && (<Loader />)}

      <div className='row justify-content-center mt-5 '>
        <div className='col-md-4 mt-5'>
          {error && (<Error message='Password Incorrect' />)}
          {success && (<Success message='LoginSuccessful !!!' />)}
          <div className='shadow'>
            <h2>Login</h2>
            <input type="text" className="form-control mt-2" placeholder="Email" value={email} onChange={(e) => { setemail(e.target.value) }} />
            <input type="text" className="form-control mt-2" placeholder="Password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
            <button className='btn btn-primary mt-3' onClick={login}>Login</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Loginscreen