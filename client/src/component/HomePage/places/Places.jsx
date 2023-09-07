// import React from 'react'

import { Link } from "react-router-dom"
// import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

const Places = () => {

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/place/places').then(({ data }) => {
      console.log(data);
      setPlaces(data.Data); // Assuming `data.Data` contains the array of places
      
    });
  }, []);
    
  return (
    <>
    <AccountNav />
        <div className="text-center">
        <Link className="inline-flex gap-2 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        Add New Place</Link>
        </div>

        <div className="">
        {
          places.length > 0 && places.map(place => (
          <Link
          key={place._id} // Add a unique key using place._id
          to={'/account/places/' + place._id}
          className="flex gap-4 cursor-pointer mb-3 mt-3 bg-gray-200 p-4 rounded-2xl"
          >
          <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
          {place.photos.length > 0 && (
          <img className="object-cover w-32" src={'http://localhost:4000/Uploads/places/'+place.photos[0]} alt="photos" />
          )}
          </div>
          <div className="grow-0 shrink">
          <h2 className="text-xl ">{place.title}</h2>
          <p className="text-sm mt-2">{place.description}</p>
          </div>
          </Link>
           ))
         }          
        </div>
   </>
  )
}

export default Places