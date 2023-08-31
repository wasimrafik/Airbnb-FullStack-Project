import express from 'express';
import { addPlaces, deletePlaces, getAllPlaces, updatePlaces } from '../Controllers/placesController';

const placeRouter = express.Router();

placeRouter.post('/addNewPlace', addPlaces )
// placeRouter.post('/newPlace', updatePlaces )
// placeRouter.post('/newPlace', getAllPlaces )
// placeRouter.post('/newPlace', deletePlaces )



export default placeRouter;