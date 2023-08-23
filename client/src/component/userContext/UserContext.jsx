import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    if(!user){
      const {data} =  axios.get('/user/profile');
      setUser(data)
    }
  },[user])
  return (
    <>
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
    </>
    
  );
};