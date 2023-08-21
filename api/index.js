const express = require('express');
const cors = require("cors");
const { default: mongoose } = require('mongoose');
const userModel = require('./Models/userModel')
const bcrypt = require("bcrypt")



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

app.post('/register', async (req,res)=>{
    const {name,email,password} = req.body;
    
    try {
        const userDoc = await userModel.create({name,email,password:bcrypt.hashSync(password, bcryptSalt)});
        res.json(userDoc);
    } catch (error) {
        return res.status(500).json({Message: error.Message})
    }
    
    
})

app.post('/login', async (req,res)=>{
    const {email, password}= req.body;
    const userDoc = await userModel.findOne({email:email});
    if(userDoc){
        res.json('found')
    }else{
        res.json('not Fount')
    }
})
app.listen(4000)

