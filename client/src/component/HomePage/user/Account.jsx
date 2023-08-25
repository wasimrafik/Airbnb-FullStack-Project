// import React from 'react'

import { useContext } from "react"
import { UserContext } from "../../userContext/UserContext"

const Account = () => {

    const {user} = useContext(UserContext);
  return (
    <div>Account 11 {user.name}
        console.log({user.user.name});
    </div>
  )
}

export default Account