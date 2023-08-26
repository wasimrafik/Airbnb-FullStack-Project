// import React from 'react'

import { useContext, useState } from "react"
import { UserContext } from "../../userContext/UserContext"
import { Link, useParams ,Navigate  } from "react-router-dom";
import axios from "axios";
import Places from "../places/Places";

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
    if(ready && !user && !reDirect){
      return <Navigate to={'/login'} />
    }

    
    console.log(subPage);

    function activeLinkClass (type=null) {

      let classes = 'py-2 px-6 inline-flex bg-primary rounded-full text-white gap-2';

      if(type === subPage || (subPage === undefined && type === 'profile')){
        classes += ' bg-blue-300  text-white';
      }else{
        classes += ' bg-primary  text-black ';
      }
      return classes;
    }

    if(reDirect){
      return <Navigate to={reDirect} />
    }
  return (
    <div>
      <nav className="w-full flex justify-center mt-10 gap-2 mb-8">
        <Link className={activeLinkClass('Profile')} to={'/account'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>

          My Profile</Link>
        <Link className={activeLinkClass('Bookings')} to={'/account/booking'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>

          My Bookings</Link>
        <Link className={activeLinkClass('Places')} to={'/account/places'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>

          My Accomodations</Link>
      </nav>
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

export default Account