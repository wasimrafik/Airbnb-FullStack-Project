import express from 'express';
import { addBookingDetails, getBookingDetails, singleBooking } from '../Controllers/bookingController';
import auth from '../middleware/auth.middleware'
const bookingRouter = express.Router();


bookingRouter.post('/addBooking', auth, addBookingDetails);
bookingRouter.get('/getAllBookings', auth, getBookingDetails);
bookingRouter.get('/booking/:id', singleBooking);





export default bookingRouter;