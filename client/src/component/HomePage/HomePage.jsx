import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/place/getAllPlacesForHomePage')
      .then((res) => {
        setPlaces(res.data.Data);
      })
      .catch((error) => {
        console.error('Error fetching places data:', error);
      });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 object-cover">
      {places?.length > 0 &&
        places.map((place, ind) => {
          return (
            <Link to={'/place/'+place._id} key={ind} className=" object-cover">
              <div className="bg-gray-500 mb-2 rounded-2xl">
                {place.photos?.[0] && (
                  <img
                  className='rounded-2xl object-cover aspect-square'
                  
                    src={'http://localhost:4000/Uploads/places/' + place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <div>
                <h2 className='font-bold'>{place.address}</h2>
                <h3 className='text-sm text-gray-500'>{place.title}</h3>
                <div className='mt-1'>
                  <span className='font-bold'>${place.price} per night</span>
                </div>
                {/* Add other details as needed */}
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default HomePage;
