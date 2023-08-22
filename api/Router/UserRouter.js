import express from 'express';
import  { addUser, getUser } from'../Controllers/User.Controller';



const Router = express.Router();


Router.post('/register', addUser)
Router.post('/login', getUser)


export default Router;