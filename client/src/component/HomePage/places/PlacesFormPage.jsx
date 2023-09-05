import { useEffect, useState } from 'react';
import Perks from './Perks';
import axios from 'axios';
import AccountNav from './AccountNav';
import { useParams } from 'react-router-dom';

const PlacesFormPage = () => {

  const {id} = useParams();
  console.log(id);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckInTime] = useState('');
  const [checkOut, setCheckOutTime] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  useEffect(()=>{
    if(!id){
      return;
    }
    axios.get('/places/'+id)
  },[id])


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

  const addNewPlace = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('location', address);
    formData.append('description', description);
    formData.append('checkIn', checkIn);
    formData.append('checkOut', checkOut);
    formData.append('maxGuests', maxGuests);

    // Append each selected file to the formData
    Array.from(existingPhotos).forEach((file) => {
      formData.append('photos', file);
    });

    console.log(existingPhotos);

    try {
      const response = await axios.post('/place/addNewPlace', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(formData);
      console.log(response.data);
      // Handle redirection or other actions upon successful submission
    } catch (error) {
      console.error(error);
    }
  };

 

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {preInput('Title', 'Title for your place should be short and catchy as in advertisement')}
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title, ex:- My Lovely Apt"
        />

        {preInput('Address', 'Address for this place')}
        <input
          type="text"
          name="address"
          value={address}
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
              console.log(filesArray);
              setExistingPhotos(filesArray);
            }}
            multiple
          />
        </div>

        {preInput('Description', 'Description of the place')}
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        {preInput('Perks', 'Select all the perks for your places')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput('Extra info', 'House rules, etc')}
        <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />

        {preInput('Check-In & Check-Out Time', 'Add check-in and check-out time')}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-2">Check-in time</h3>
            <input
              type="number"
              value={checkIn}
              onChange={(e) => setCheckInTime(e.target.value)}
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-2">Check-out time</h3>
            <input
              type="number"
              value={checkOut}
              onChange={(e) => setCheckOutTime(e.target.value)}
              placeholder="11:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-2">Max no. Guests</h3>
            <input
              type="number"
              value={maxGuests}
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
