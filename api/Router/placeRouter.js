import express from 'express';
import auth from '../middleware/auth.middleware'
import { addPlace, addPlacesPhotos, deletePlaces, getAllPlaces, getSingleUser, updatePlaces } from '../Controllers/placesController';

const placeRouter = express.Router();

placeRouter.post('/addNewPlace', auth, addPlace )
placeRouter.get('/places', auth, getAllPlaces )
placeRouter.get('/places/:id', getSingleUser )
// placeRouter.post('/newPlace', updatePlaces )

// placeRouter.post('/newPlace', deletePlaces )
 


export default placeRouter;