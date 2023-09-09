// import React from 'react'

import { useEffect, useState } from "react"
import AccountNav from "../HomePage/places/AccountNav"
import axios from 'axios'
import {format} from 'date-fns'
import { differenceInCalendarDays } from "date-fns/fp"
import { Link } from "react-router-dom"

const Bookings = () => {
    
  const [BookingsData, setBookingData] = useState([]);

  useEffect(()=>{
    axios.get('/booking/getAllBookings')
    .then(res => {
      setBookingData(res.data.Data)
    });
  },[])

  console.log(BookingsData);
  return (
    <>
      <AccountNav />
      <div>
        {BookingsData.length > 0 && BookingsData.map((booking, ind)=>{
          return (
            <Link to={`/account/booking/${booking._id}`} key={ind} className="flex gap-4 bg-gray-200  rounded-2xl overflow-hidden">
              <div className="w-60 h-full">
              {booking.place.photos.length > 0 && (
              <img className="object-cover " src={'http://localhost:4000/Uploads/places/'+booking.place.photos[0]} alt="photos" />
              )}
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.place.title}</h2>
              <div className="flex gap-2 border-t border-gray-300 mt-2 py-2 text-gray-4 00">

                <div className="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>
              {format(new Date(booking.checkIn), 'dd-MM-yyy')}    
              &rarr;    
                </div>

                <div className="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
             </svg>

              {format(new Date(booking.checkOut), 'dd-MM-yyy')} 
                </div>

              </div>
              <div className="text-lg">
                Number Of Days: {differenceInCalendarDays(new Date(booking.checkIn), new Date(booking.checkOut))} Days<br />
                <div className="flex gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>

                Total Price: $ {booking.price}
                </div>
                
              </div>
              </div>

              
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default Bookings