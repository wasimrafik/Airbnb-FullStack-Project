// import React from 'react'

import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import Perks from "./Perks";
import axios from 'axios'

const Places = () => {

    const {action} = useParams();
    // console.log(action);
    
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [existingPhotos, setExistingPhotos] = useState('');
    const [photoLink, setPhotoLink] = useState([]);
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

    const uploadImages = (e)=> {
      const selectedFiles = e.target.files;
      // console.log(selectedFiles);
      const selectedFilesArray = Array.from(selectedFiles)

      const imageArray = selectedFilesArray.map((file) =>{
        return URL.createObjectURL(file)
      })
      setExistingPhotos(imageArray)
    }
    async function addPhotoByLink(e){
      e.preventDefault();
      let addImageToDB = existingPhotos;
      console.log(addImageToDB);
      let imageData = new FormData()
      for(let i=0; i < addImageToDB.length; i++){
        imageData.append('photoLink',photoLink);
      }
      console.log(imageData);
      // console.log(photoLink);
      axios.post('/place/addNewPlace', imageData,
      {headers: {"Content-Type":"multipart/form-data"}}
      )
      .then(res => {
      const {data} = res;
      })
      .catch(err=> {console.log(err)})

    }

    // console.log(existingPhotos);
    
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
              
                <input type="file" value={photoLink} onChange={uploadImages} placeholder="Add Using a Link ...jpg" multiple/>
                <button className="bg-gray-200 px-4 rounded-2xl" onClick={addPhotoByLink}>Add&nbsp;Photos</button>
              </div>

            {/* Image Preview and Delete */}
              <div className="my-4  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                {existingPhotos && existingPhotos.map((img)=>{
                    return (
                      <div className="ml-3 text-center felx m-auto" key={img}>
                        <button className="p-2 px-4 mb-1 mt-4 rounded-2xl" onClick={()=> setExistingPhotos(existingPhotos.filter((e) => e !== img))}>Delete</button>
                        <img className='rounded-2xl' src={img} alt="Image" width="150" height="100"/>
                        
                      </div>
                    )
                })}
              </div>

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