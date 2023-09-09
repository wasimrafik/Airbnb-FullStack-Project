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

// export const getBookingDetails = async (req, res) => {
//     try {
//         const ownerID = req.auth.id;
        
//         // Find bookings associated with the ownerID
//         const getAllBookings = await bookingModle.find({ user: ownerID }).populate('places');
//         console.log(getAllBookings);
        
//         if (getAllBookings.length > 0) {
//             return res.status(200).json({ Data: getAllBookings, Message: "All Booking Fetch Successfully" });
//         } else {
//             return res.status(404).json({ Message: "No bookings found for this user" });
//         }
//     } catch (error) {
//         return res.status(500).json({ Message: error.message });
//     }
// }

export const getBookingDetails = async (req, res) => {
    try {
        const ownerID = req.auth.id;
        
        // Find bookings associated with the ownerID and populate the 'place' field
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





