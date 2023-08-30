// import React from 'react'

import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import Perks from "./Perks";

const Places = () => {

    const {action} = useParams();
    // console.log(action);
    
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [existingPhotos, setExistingPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    function inputHeader(label){
      return(
        <h2 className="text-2xl mt-4">{label}</h2> 
      )
    }

    function inputDescreiption(text){
      return(
        <p className="text-gray-500 text-sm">{text}</p>
      )
    }

    function preInput(header, description){
      return(
        <>
          {inputHeader(header)}
           {inputDescreiption(description)}
        </>
      )
    }

    function addPhotoByLink(){
      
    }

  return (
    <>
    { action !== 'new' && (
        <div className="text-center">
        <Link className="inline-flex gap-2 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        Add New Place</Link>
        </div>
    )};

    {action === 'new' && (
        <div>
            <form>

              {preInput('Title','Title fir your place should be short and catchy as in advertisment')}
              <input  type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title, ex:- My Lovely Apt"/>
              
              {preInput('Address','Address for this place')}
              <input  type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address"/> 

              {preInput('Photos','More = better')} 

              <div className="flex gap-2">
                <input type="text" value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} placeholder="Add Using a Link ...jpg"/>
                <button className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photos</button>
              </div>

              <div className="mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

              </div>
              <button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl font-bold text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>

                Uploads
              </button> 
              {preInput('Description','Description of the place')}

              <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
              {preInput('Perks','Select all the perks for your places')}
              
              <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                  <Perks selected={perks} onChange={setPerks}/>
              </div>
              {preInput('Extra info','hose rules, etc')}
              <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)}/>
              
              {preInput('CheckIn & CheckOut Time','Add checkIn and CheckOut time')}

              <div className="grid gap-2 sm:grid-cols-3">
                <div>   
                    <h3 className="mt-2 -mb-2 ">Check in time</h3>
                    <input type="number" value={checkInTime} onChange={(e) => setCheckInTime(e.target.value)} placeholder="14:00"/>
                </div>
                <div>   
                    <h3 className="mt-2 -mb-2 ">Check out time</h3>
                    <input type="number" value={checkOutTime} onChange={(e) => setCheckOutTime(e.target.value)}placeholder="11:00"/>
                </div>
                <div>   
                    <h3 className="mt-2 -mb-2 ">Max no Guest</h3>
                    <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)}placeholder="no of guestes"/>
                </div>
              </div>

                <button className="primary my-4">Save</button>

            </form>
        </div>
    )}
   </>
  )
}

export default Places