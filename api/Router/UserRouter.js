import express from 'express';
import  { addUser, getUser } from'../Controllers/User.Controller';



const Router = express.Router();


Router.post('/addUser', addUser)
Router.get('/getUser', getUser)


export default Router;