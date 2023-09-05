// import React from 'react'

import { useContext, useState } from "react"
import { UserContext } from "../../userContext/UserContext"
import { Link, useParams ,Navigate  } from "react-router-dom";
import axios from "axios";
import Places from "../places/Places";
import AccountNav from "../places/AccountNav";

const ProfilePage = () => {
  const {ready, user, setUser} = useContext(UserContext);
  const [reDirect, setReDirect] = useState(null)

  let {subPage} = useParams();

  if(subPage === undefined){
    subPage = 'profile'
  }

  async function logout(){
    await axios.post('/user/logout')
    setReDirect("/")
    setUser(null)

  }
 
    
    if(!ready){
        return "Loading......."
    }
    if(ready && !user && !reDirect){
      return <Navigate to={'/login'} />
    }

    
    console.log(subPage);



    if(reDirect){
      return <Navigate to={reDirect} />
    }
  return (
    <div>
      <AccountNav />
      {
        subPage == 'profile' && (
          <div className="text-center max-w-lg mx-auto">
            logged in as {user.name} ({user.email})
            <button className="primary max-w-sm mt-2 " onClick={logout}>Logoout</button>
          </div>
        )
      }


    {/* Places  */}

      {
        subPage === 'places'&& (
            <Places />
        )
      }
    </div>
  )
}

export default ProfilePage;