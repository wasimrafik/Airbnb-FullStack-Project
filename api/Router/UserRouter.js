import express from 'express';
import  { addUser, getUser, getUserProfile, logout } from'../Controllers/User.Controller';
import auth from '../middleware/auth.middleware'; 


const userRouter = express.Router();


userRouter.post('/register', addUser)
userRouter.post('/login', getUser)
userRouter.get('/profile', auth, getUserProfile)
userRouter.post('/logout', logout)

export default userRouter;