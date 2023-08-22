// import React from 'react'

import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  async function handleLoginSubmit(e){
    e.preventDefault();
    try {
      await axios.post("/user/login", {email,password});
      if(email === ''){
        alert("Enter your email")
      }else if(password === ''){
        alert("Enter your password")
      }else{
        alert("Login Sucessfull")
        navigate('/')
      }
    } catch (error) {
      alert("Login failed !!!!")
      console.log("Login Failed");
    }
    
  
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">

        <div className="mb-32">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form action="" className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                <input type="email" 
                    placeholder="your@email.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
             <input type="password" 
                placeholder="Enter Your Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
                <button className="primary">Login</button>

                <div className="text-center py-2 text-gray-500">
                    Dont have an account yet?
                    <Link className="underline text-black pl-2" to={"/register"}>Register Now</Link>
                </div>
            </form>
        </div>
        
    </div>
  )
}

export default Login