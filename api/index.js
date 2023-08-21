const express = require('express');
const cors = require("cors");
const  mongoose = require('mongoose');
const bcrypt = require("bcrypt");
import  userRouter from './Router/UserRouter';



const app = express();

const bcryptSalt = bcrypt.genSaltSync(10)


app.use(express.json())
app.use(cors({
    credentials: true,
    origin:'http://localhost:5173',
}))

mongoose
  .connect("mongodb://127.0.0.1:27017/Airbnb")
  .then(() => console.log("DB is COnnected "));

app.get('/test', (req,res)=>{
    res.json('test ok')
})

app.use('/user', userRouter);


// app.post('/login', async (req,res)=>{
//     const {email, password}= req.body;
//     const userDoc = await userModel.findOne({email:email});
//     if(userDoc){
//         res.json('found')
//     }else{
//         res.json('not Fount')
//     }
// })
app.listen(4000)

