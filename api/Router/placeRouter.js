import express from 'express';
import auth from '../middleware/auth.middleware'
import { addPlace, getAllPlaces, getAllPlacesForHomePage, getSingleUser, updatePlaces } from '../Controllers/placesController';

const placeRouter = express.Router();

placeRouter.post('/addNewPlace', auth, addPlace )
placeRouter.get('/places', auth, getAllPlaces )
placeRouter.get('/places/:id', getSingleUser )
placeRouter.put('/updatePlaces/:id', auth, updatePlaces )
placeRouter.get('/getAllPlacesForHomePage', getAllPlacesForHomePage )


// placeRouter.post('/newPlace', deletePlaces )
 


export default placeRouter;