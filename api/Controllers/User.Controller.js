import userModel from '../Models/userModel'
import jwt from "jsonwebtoken";
// import bcrypt from 'bcrypt'

export const addUser = async (req,res) =>{
    try {
        
        const {name, email, password} = req.body;

        const getUser = await userModel.findOne({email: email});

        if(getUser){
            return res.status(404).json({
                Message: 'User Already Exist'
            })
        }
        
        const createNewUser = new userModel({
            name,
            email,
            password,
        })
        
        await createNewUser.save();

        if(createNewUser){
            return res.status(200).json({Data: createNewUser, Message: "New User Created "})
        }
    } catch (error) {
        return res.status(500).json({Message: error.Message})
    }
}

export const getUser = async (req, res) =>{
    try {

        const {email, password} = req.body;
        const getUser = await userModel.findOne({email:email});
        
    if(!getUser){
        // const passwordCompare = 
        return res.status(422).json({
            Data: getUser,
            Message: "Please Check Your Email Address"
        })
    }
    const token = jwt.sign(
        {
        id: getUser._id,
        email: getUser.email,
        name: getUser.name,
        },
        "secrectKey",
        {
            expiresIn: "1h",
        }
    );
    
    return res.cookie("secrectKey",token).json({
        Data: getUser,
        token: token,
        Message: "LogIn Sucessfull"
    })
    } catch (error) {
        return res.status(500).json({Message: error.Message})
    }
}

export const getUserProfile = async (req, res) =>{
    try {

        console.log(req.auth);

         const {email, name, _id} = await userModel.findById(req.auth.id);

          return res.json({email, name, _id})
        
    } catch (error) {
        return res.status(500).json({Message: error.Message})   
    }
}

export const logout = async (req, res) =>{
    try {
        console.log(req.cookie);
         res.cookie('secrectKey', '').json(true);
    } catch (error) {
        return res.status(500).json({Message: error.Message})   
    }
}

