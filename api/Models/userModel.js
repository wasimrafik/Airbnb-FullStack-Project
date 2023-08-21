import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const user = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,

    },
});

export default mongoose.model("user", user);
