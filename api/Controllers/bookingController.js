import bookingModle from '../Models/bookingModle'

export const addBookingDetails = async (req, res) =>{
    try {
         
        const userID = req.auth.id;
        const {place, price, name, number, checkIn, checkOut, maxGuests, user} = req.body;

        const addBookingDetails = new bookingModle({
            name,
            number,
            checkIn,
            checkOut,
            maxGuests,
            place,
            price,
            user: userID,
        })

        await addBookingDetails.save();

        if(addBookingDetails){
            return res.status(201).json({Data: addBookingDetails,Message: "Booking Data Added Sucessfully"})
        }
    } catch (error) {
        return res.status(500).json({Message: error.Message})
    }
}

export const getBookingDetails = async (req, res) => {
    try {
        const ownerID = req.auth.id;
        
        const getAllBookings = await bookingModle.find({ user: ownerID }).populate('place');
        
        if (getAllBookings.length > 0) {
            return res.status(200).json({ Data: getAllBookings, Message: "All Booking Fetch Successfully" });
        } else {
            return res.status(404).json({ Message: "No bookings found for this user" });
        }
    } catch (error) {
        return res.status(500).json({ Message: error.message });
    }
}

export const singleBooking = async (req, res) => {
    try {
        // const ownerID = req.auth.id;
        
        // const getAllBookings = await bookingModle.find({ user: ownerID }).populate('place');
        
        // if (getAllBookings.length > 0) {
        //     return res.status(200).json({ Data: getAllBookings, Message: "All Booking Fetch Successfully" });
        // } else {
        //     return res.status(404).json({ Message: "No bookings found for this user" });
        // }

        const id = req.params.id;

        const getBooking = await bookingModle.findOne({_id: id})

        if(getBooking.length > 0){
            return res.status(200).json({Data: getBooking, Message: "Single Booking Fetch Sucessfully"})
        }


    } catch (error) {
        return res.status(500).json({ Message: error.message });
    }
}




