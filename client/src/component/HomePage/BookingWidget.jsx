// import React from 'react'

import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from 'date-fns'
import axios from 'axios'
import {Navigate} from 'react-router-dom'
import {UserContext} from '../userContext/UserContext'
const BookingWidget = ({singlePlace}) => {

    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [redirect, setRedirect] = useState("")

    const {user} = useContext(UserContext)
    useEffect(()=>{
      if(user){
        setName(user.name)
      }
    },[user])

    let numberOfDays = 0;

    if(checkIn && checkOut){
      numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function  addBooking(){
      const bookingData = await axios.post('/booking/addBooking', 
      {
        checkIn, checkOut, maxGuests, name, number,place:singlePlace._id, 
        price:numberOfDays * singlePlace.price
      });

      const bookingID = bookingData.data.Data._id;
      setRedirect(`/account/booking/${bookingID}`)
    }

    if(redirect){
      return <Navigate to={redirect}/>
    }

  return (
   <>
    <div>
        <div className="bg-white shadow p-4 rounded-2xl">
          <div className="text-2xl text-center">Price: ${singlePlace.price} / per night</div>
            
            <div className="border rounded-2xl mt-4">
              <div className="flex">
              <div className="py-3 px-4 ">
                 <label >Check in:</label>
                 <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}/>
                 </div>
                 <div className="py-3 px-4 border-l">
                  <label >Check Out:</label>
                 <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}/>
                 </div>
              </div>
            </div>
            <div>
            <div className="border-t py-3 px-4 ">
                 <label >Number Of Guests:</label>
                 <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)}/>
                 </div>
            </div>
            {numberOfDays > 0 && (
                          <div>
                          <div className="border-t py-3 px-4 ">
                               <label >Your Full Name:</label>
                               <input type="text" value={name} placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)}/>

                               <label >Your Contact Number:</label>
                               <input type="tel" value={number} placeholder="Enter Your Contact Number" onChange={(e) => setNumber(e.target.value)}/>
                               
                               </div>
                          </div>
            )}
          <button className="primary mt-4" onClick={addBooking}>
            Book this Place &nbsp;
            {numberOfDays > 0 && (
              <span>
                {numberOfDays * singlePlace.price}
              </span>
            )}
          </button>
        </div>
      </div>
   </>
  )
}

export default BookingWidget