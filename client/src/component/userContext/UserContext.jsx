import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {


    if (!user) {
      axios.get('/user/profile')
        .then(response => {
          setUser(response.data.user);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
