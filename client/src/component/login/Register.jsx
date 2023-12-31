// import React from 'react'

import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import axios from 'axios';
const Register = () => {

  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const navigate = useNavigate()

  async function  registerUser(e) {
    e.preventDefault();
   try {
    await axios.post("/user/register",{
      name,
      email,
      password,
    });
    alert("Registeration Sucessfully, Now you can login")
    navigate('/login')
   } catch (error) {
    alert("Registation Failed!!!!!!!")
   }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">

        <div className="mb-32">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form action="" className="max-w-md mx-auto" onSubmit={registerUser}>
              <input type="text" placeholder="Joe Doe" 
              value={name} 
              onChange={e => setName(e.target.value)}/>

              <input type="email" placeholder="your@email.com"
              value={email} 
              onChange={e => setemail(e.target.value)}/>               
              
              <input type="password" placeholder="Enter Your Password"
              value={password} 
              onChange={e => setpassword(e.target.value)}/>              

                <button type={"submit"} className="primary">Register</button>

                <div className="text-center py-2 text-gray-500">
                    Already a member ?
                    <Link className="underline text-black pl-2" to={"/login"}>Login</Link>
                </div>
            </form>
        </div>
        
    </div>
  )
}

export default Register