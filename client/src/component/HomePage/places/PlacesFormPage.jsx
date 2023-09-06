import {  useState,useEffect } from 'react';
import Perks from './Perks';
import axios from 'axios';
import AccountNav from './AccountNav';
import { Navigate, useParams } from 'react-router-dom';

const PlacesFormPage = () => {

  const {id} = useParams();
  // console.log(id);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckInTime] = useState('');
  const [checkOut, setCheckOutTime] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false)
  // console.log(id);
  useEffect(() => {
    if (!id) {
      return;
    }
  
    axios.get('/place/places/' + id)
      .then(res => {
        // console.log(res.data.Data);
        const data  = res.data.Data;
        setTitle(data.title);
        setAddress(data.address);
        setExistingPhotos(data.existingPhotos);
        setDescription(data.description);
        setExtraInfo(data.extraInfo);
        setPerks(data.perks);
        setCheckInTime(data.checkIn);
        setCheckOutTime(data.checkOut);
        setMaxGuests(data.maxGuests);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [id]);


  function inputHeader(label) {
    return <h2 className="text-2xl mt-4">{label}</h2>;
  }

  function inputDescreiption(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescreiption(description)}
      </>
    );
  }

  const savePlace = async (e) => {
    e.preventDefault();
    if(id){
      const formData = new FormData();
    formData.append('title', title);
    formData.append('address', address);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('extraInfo', extraInfo);
    formData.append('checkIn', checkIn);
    formData.append('checkOut', checkOut);
    formData.append('maxGuests', maxGuests);
    formData.append('perks', perks.join(','));

    Array.from(existingPhotos).forEach((file) => {
      formData.append('photos', file);
    });

    // console.log(existingPhotos);

    try {
      await axios.put('/place/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setRedirect(true) 
      // console.log(formData);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    }else{
      const formData = new FormData();
    formData.append('title', title);
    formData.append('address', address);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('extraInfo', extraInfo);
    formData.append('checkIn', checkIn);
    formData.append('checkOut', checkOut);
    formData.append('maxGuests', maxGuests);
    formData.append('perks', perks.join(','));

    Array.from(existingPhotos).forEach((file) => {
      formData.append('photos', file);
    });

    // console.log(existingPhotos);

    try {
      await axios.post('/place/addNewPlace', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setRedirect(true) 
      // console.log(formData);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    }
    
  };

 if(redirect){
    return <Navigate to={'/account/places'}/>
 }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput('Title', 'Title for your place should be short and catchy as in advertisement')}
        <input
          type="text"
          name="title"
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title, ex:- My Lovely Apt"
        />

        {preInput('Address', 'Address for this place')}
        <input
          type="text"
          name="address"
          value={address || ''}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />

        {preInput('Photos', 'More = better')}
        <div className="flex gap-2">
          <input
            type="file"
            onChange={(e) => {
              // Convert FileList to an array
              const filesArray = Array.from(e.target.files);
              // console.log(filesArray);
              setExistingPhotos(filesArray);
            }}
            multiple
          />
        </div>

        {preInput('Description', 'Description of the place')}
        <textarea value={description || ''} onChange={(e) => setDescription(e.target.value)} />

        {preInput('Perks', 'Select all the perks for your places')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks || ''} onChange={setPerks} />
        </div>

        {preInput('Extra info', 'House rules, etc')}
        <textarea value={extraInfo || ''} onChange={(e) => setExtraInfo(e.target.value)} />

        {preInput('Check-In & Check-Out Time', 'Add check-in and check-out time')}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-2">Check-in time</h3>
            <input
              type="number"
              value={checkIn || ''}
              onChange={(e) => setCheckInTime(e.target.value)}
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-2">Check-out time</h3>
            <input
              type="number"
              value={checkOut || ''}
              onChange={(e) => setCheckOutTime(e.target.value)}
              placeholder="11:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-2">Max no. Guests</h3>
            <input
              type="number"
              value={maxGuests || ''}
              onChange={(e) => setMaxGuests(e.target.value)}
              placeholder="No. of guests"
            />
          </div>
        </div>

        <button className="primary my-4" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
