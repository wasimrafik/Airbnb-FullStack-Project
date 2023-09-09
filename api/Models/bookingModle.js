import mongoose from "mongoose";

const Schema = mongoose.Schema;

const booking = new Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "places" // Updated to match the model name
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    maxGuests: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});

export default mongoose.model('booking', booking);
