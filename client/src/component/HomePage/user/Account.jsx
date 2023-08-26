// import React from 'react'

import { useContext, useState } from "react"
import { UserContext } from "../../userContext/UserContext"
import { Link, useParams ,Navigate  } from "react-router-dom";
import axios from "axios";

const Account = () => {
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
    if(ready && !user){
      return <Navigate to={'/login'} />
    }

    
    console.log(subPage);

    function activeLinkClass (type=null) {

      let classes = 'py-2 px-6 ';

      if(type === subPage || (subPage === undefined && type === 'profile')){
        classes += ' bg-primary  text-white  rounded-full ';
      }
      return classes;
    }

    if(reDirect){
      return <Navigate to={reDirect} />
    }
  return (
    <div>
      <nav className="w-full flex justify-center mt-10 gap-2 mb-8">
        <Link className={activeLinkClass('Profile')} to={'/account'}>My Profile</Link>
        <Link className={activeLinkClass('Bookings')} to={'/account/booking'}>My Bookings</Link>
        <Link className={activeLinkClass('Places')} to={'/account/places'}>My Accomodations</Link>
      </nav>
      {
        subPage == 'profile' && (
          <div className="text-center max-w-lg mx-auto">
            logged in as {user.name} ({user.email})
            <button className="primary max-w-sm mt-2 " onClick={logout}>Logoout</button>
          </div>
        )
      }
    </div>
  )
}

export default Account