const express = require('express');
const cors = require("cors");
const  mongoose = require('mongoose');
const bcrypt = require("bcrypt");
import cookieParser from 'cookie-parser'
import  userRouter from './Router/UserRouter';
import placeRouter from './Router/placeRouter';
import bookingRouter from './Router/bookingRouter';



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname));

const bcryptSalt = bcrypt.genSaltSync(10)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("PORT is connected at" + PORT);
  });


app.use(cors({
    credentials: true,
    origin:'http://localhost:5173',
}))

mongoose
  .connect("mongodb://127.0.0.1:27017/Airbnb")
  .then(() => console.log("DB is COnnected "));

app.use('/user', userRouter);
app.use('/place', placeRouter);
app.use('/booking', bookingRouter)