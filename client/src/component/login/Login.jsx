// import React from 'react'

import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">

        <div className="mb-32">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form action="" className="max-w-md mx-auto">
                <input type="email" placeholder="your@email.com" />
             <input type="password" placeholder="Enter Your Password"/>
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