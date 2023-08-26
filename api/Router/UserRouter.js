import express from 'express';
import  { addUser, getUser, getUserProfile, logout } from'../Controllers/User.Controller';
import auth from '../middleware/auth.middleware'; 


const Router = express.Router();


Router.post('/register', addUser)
Router.post('/login', getUser)
Router.get('/profile', auth, getUserProfile)
Router.post('/logout', logout)

export default Router;