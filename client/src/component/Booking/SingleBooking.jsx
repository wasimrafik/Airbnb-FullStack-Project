// import React from 'react'

import { useParams } from "react-router-dom"
import AccountNav from "../HomePage/places/AccountNav"
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const SingleBooking = () => {
  const [booking, setBooking] = useState('')
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  const {id} = useParams();

  useEffect(() => {
    if (id) {
      axios.get('/booking/getAllBookings')
        .then((res) => {
          console.log(res.data.Data);
          const foundBooking = res.data.Data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          } else {
            // Handle the case when the booking is not found
            // You might want to set an error state or handle it differently
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          // Handle the error here if needed
        });
    }
  }, [id]);
  console.log(booking);
  if(!booking){
    return <div>Loading...........</div>;
  }

  if(showAllPhotos){
    return(
      <div className="absolute inset-0 text-white min-h-screen">
        <div className="p-8 grid gap-4 bg-black">
          <div>
            <h2 className="text-3xl mr-48">Photos of {booking.place.title}</h2>
            <button onClick={()=> setShowAllPhotos(false)} className="fixed right-72 top-8 flex gap-1 py-2 px-4 rounded-2xl bg-white text-black shadow shadow-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

              Close photos</button>
          </div>
        {booking.place?.photos?.length > 0 && booking.place?.photos.map((img,ind) =>{
          return(
            <div key={ind}>
              <img src={'http://localhost:4000/Uploads/places/'+img} alt="photos" />
            </div>
          )
        })}
        </div>
      </div>
    )
  }
  return (
    <>
        <AccountNav />
       <div>
        <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8">
      <div >
         <h1 className="text-3xl">{booking.place.title}</h1>  
         <a className="my-2 gap-1 my-3  flex block font-semibold underline truncate" target="_blank" rel="noreferrer" href={'https://maps.google.com/?q='+booking.place.address}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>

          {booking.place.address}
          </a>
    </div>
    
    <div className="bg-gray-200 p-6 my-6 rounded-2xl ">
    <h2>Your Booking Details</h2>
    Number of Guests {booking.maxGuests}
        <div className="flex justify-between">
        <div className="flex gap-2 justify-between border-t border-gray-300 mt-2 py-2 text-gray-4 00">
          
          <div className="flex gap-1 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
          </svg>
          Check-in Time: {format(new Date(booking.checkIn), 'dd-MM-yyy')}    
          &rarr;    
          </div>
  
          <div className="flex gap-1 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
          </svg>
  
          Check-Out TIme: {format(new Date(booking.checkOut), 'dd-MM-yyy')} 
          </div>
          <div>
          
          </div>
          </div>
  
          <div className="bg-primary p-6 text-white rounded-2xl">
            Total Amount: ${booking.price}
          </div>
        </div>
    </div>

    <div className="relative bg-gray-100">
    <div className="rounded-3xl overflow-hidden bg-gray-100 grid gap-2 grid-cols-[2fr_1fr]">
      <div className="grid gap-2 ">
        {booking.place.photos?.[0] && (
          <div>
            <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/Uploads/places/'+booking.place.photos[0]} alt="" />
          </div>
        )}
      </div>
      <div className="grid bg-gray-100">
      {booking.place.photos?.[1] && (
          <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/Uploads/places/'+booking.place.photos[1]} alt="" />
        )}
        <div className="overflow-hidden bg-gray-100">
        {booking.place.photos?.[2] && (
          <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover relative top-2" src={'http://localhost:4000/Uploads/places/'+booking.place.photos[2]} alt="" />
        )}
        </div>
      </div>
    </div>
    <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 font-lg">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
      Show more photo</button>
    </div>
    
   
    <div className="mt-8 gap-8 mb-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] bg-gray-100">

    </div>
        <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
            <h2 className="font-semibold text-2xl">
              Extra Info
            </h2>
          </div>
            <div className="text-sm mt-1 mb-4  text-gray-700 leading-5">
          {booking.place.extraInfo}
        </div>
        </div>
      </div>
       </div>
    </>
    
  )
}

export default SingleBooking