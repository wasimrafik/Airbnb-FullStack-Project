import express from 'express';
import { addBookingDetails, getBookingDetails } from '../Controllers/bookingController';
import auth from '../middleware/auth.middleware'
const bookingRouter = express.Router();


bookingRouter.post('/addBooking', auth, addBookingDetails);
bookingRouter.get('/getAllBookings', auth, getBookingDetails);



export default bookingRouter;