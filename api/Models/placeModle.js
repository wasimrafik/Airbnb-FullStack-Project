import mongoose, { Mongoose } from "mongoose";
import userModel from "./userModel";

const Schema = mongoose.Schema;

const places = new Schema({
    owner:{
        type: Schema.Types.ObjectId,
        ref: userModel,
    },
    title:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    address:{
        type: String,
        // required: true
    },
    photos:{
        type: [String],
        required: true
    },
    description:{
        type: String,
        required: true
    },
    perks:{
        type: [String],
        
    },
    extraInfo:{
        type: String,
        
    },
    checkIn:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    checkOut:{
        type: Number,
        required: true
    },
    maxGuests:{
        type: Number,
        required: true
    },
})

export default mongoose.model('places', places)