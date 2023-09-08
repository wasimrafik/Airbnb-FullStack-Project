// import React from 'react'

import { useState } from "react"

const BookingWidget = ({singlePlace}) => {

    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
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
            <div className="py-3 px-4 ">
                 <label >Number Of Guests:</label>
                 <input type="number" value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)}/>
                 </div>
            </div>
          <button className="primary mt-4">Book this Place</button>
        </div>
      </div>
   </>
  )
}

export default BookingWidget