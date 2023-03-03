import React, { useState, useEffect } from 'react'
import axios from "axios";
import Loader from '../Component/Loader';
import Success from '../Component/Success';
import Error from '../Component/Error';

function Registerscreen() {
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [cpassword, setcpassword] = useState();
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    async function register() {
        if (password == cpassword) {
            const user = {

                name,
                email,
                password,
                cpassword
            }
            console.log(user)
            try {
                setloading(true)
                const result = (await axios.post("api/users/register", user)).data
                setloading(false)
                setsuccess(true)

                setname('')
                setemail('')
                setpassword('')
                setcpassword('')
                window.location.href = "/login"
                //const result = await axios.post('/api/users/register', {name:name, email:email, password:password}).data
            } catch (error) {
                setloading(false)
                seterror(true)

            }

        } else {
            alert("not same")

        }
    }

    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error />)}
            <div className='row justify-content-center mt-5 '>
                <div className='col-md-5 '>
                    {success && (<Success message="Registered Successfully!!!" />)}
                    <div className='shadow'>
                        <h2>Register</h2>
                        <input type="text" className="form-control mt-2" placeholder="Name" value={name} onChange={(e) => { setname(e.target.value) }} />
                        <input type="text" className="form-control mt-2" placeholder="Email" value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="text" className="form-control mt-2" placeholder="Password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <input type="text" className="form-control mt-2" placeholder="Confirm password" value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
                        <button className='btn btn-primary mt-3' onClick={register}>Register</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Registerscreen