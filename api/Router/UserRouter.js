import express from 'express';
import  { addUser, getUser, getUserProfile } from'../Controllers/User.Controller';



const Router = express.Router();


Router.post('/register', addUser)
Router.post('/login', getUser)
Router.get('/profile', getUserProfile)

export default Router;