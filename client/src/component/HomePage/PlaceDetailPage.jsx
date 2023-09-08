import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "./BookingWidget";

const PlaceDetailPage = () => {
    const [singlePlace, setSinglePlace] = useState([])
    const [showAllPhotos, setShowAllPhotos] = useState(false)
    const {id} = useParams();

    useEffect(()=>{
        if(!id){
            return ;
        }

        axios.get(`/place/getSinglePlacesForHomePage/${id}`)
        .then(res =>{
            setSinglePlace(res.data.Data);
        })
    },[id])

    if(showAllPhotos){
      return(
        <div className="absolute inset-0 text-white min-h-screen">
          <div className="p-8 grid gap-4 bg-black">
            <div>
              <h2 className="text-3xl mr-48">Photos of {singlePlace.title}</h2>
              <button onClick={()=> setShowAllPhotos(false)} className="fixed right-72 top-8 flex gap-1 py-2 px-4 rounded-2xl bg-white text-black shadow shadow-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>

                Close photos</button>
            </div>
          {singlePlace?.photos?.length > 0 && singlePlace.photos.map((img,ind) =>{
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
    // console.log(singlePlace);
  return (
    <>
      <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8">
      <div >
         <h1 className="text-3xl">{singlePlace.title}</h1>  
         <a className="my-2 gap-1 my-3  flex block font-semibold underline truncate" target="_blank" rel="noreferrer" href={'https://maps.google.com/?q='+singlePlace.address}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>

          {singlePlace.address}
          </a>
    </div>

    <div className="relative bg-gray-100">
    <div className="rounded-3xl overflow-hidden bg-gray-100 grid gap-2 grid-cols-[2fr_1fr]">
      <div className="grid gap-2 ">
        {singlePlace.photos?.[0] && (
          <div>
            <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/Uploads/places/'+singlePlace.photos[0]} alt="" />
          </div>
        )}
      </div>
      <div className="grid bg-gray-100">
      {singlePlace.photos?.[1] && (
          <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/Uploads/places/'+singlePlace.photos[1]} alt="" />
        )}
        <div className="overflow-hidden bg-gray-100">
        {singlePlace.photos?.[2] && (
          <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover relative top-2" src={'http://localhost:4000/Uploads/places/'+singlePlace.photos[2]} alt="" />
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
      <div>
      <div className="my-4 bg-gray-100">
      <h2 className="font-semibold text-2xl">Description</h2>
      {singlePlace.description}
    </div>
        Check-in Time: {singlePlace.checkIn}<br />
        Check-Out TIme: {singlePlace.checkOut} <br />
        Max number of Guests {singlePlace.maxGuests}

      </div>
        <BookingWidget singlePlace={singlePlace}/>
    </div>
        <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
            <h2 className="font-semibold text-2xl">
              Extra Info
            </h2>
          </div>
            <div className="text-sm mt-1 mb-4  text-gray-700 leading-5">
          {singlePlace.extraInfo}
        </div>
        </div>
      </div>
    </>
  )
}

export default PlaceDetailPage