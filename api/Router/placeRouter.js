import express from 'express';
import auth from '../middleware/auth.middleware'
import { addPlace, addPlacesPhotos, deletePlaces, getAllPlaces, updatePlaces } from '../Controllers/placesController';

const placeRouter = express.Router();

placeRouter.post('/addNewPlace', auth, addPlace )
// placeRouter.post('/addNewPlacePhoto', addPlacesPhotos )
// placeRouter.post('/newPlace', updatePlaces )
placeRouter.get('/places',auth, getAllPlaces )
// placeRouter.post('/newPlace', deletePlaces )



export default placeRouter;