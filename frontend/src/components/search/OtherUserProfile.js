import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import UserContext from '../../context/UserContext';

const OtherUserProfile = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { otherUserId } = location.state || {};
  const [userData, setUserData] = useState('');
  

  useEffect(() => {
   

    if (!otherUserId) {
      console.log("User ID not found");
      
      return;
    }

    const fetchOtherUser = async () => {
        try {
          const response = await fetch(`http://localhost:7000/api/v1/search/getUser/${otherUserId}`, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${user.AccessToken}`,
            },
          });
      
          if (!response.ok) {
            throw new Error('Error while fetching the user');
          }
      
          const data = await response.json();
      
          console.log('Fetched user data:', data);
          setUserData(data);
          console.log(data.data.username)
      
        } catch (error) {
          console.error('Error fetching user data:', error);
      
        } 
      };
      

    fetchOtherUser();
  }, [user, otherUserId]);

  

  return (
    <div>
        {
            userData.length === 0? (
                <div></div>
            ):(
                <div>
                    <img src={userData.data.avatar} alt="" />
                    <h1>User name: {userData.data.username}</h1>
                    <p>Email: {userData.data.email}</p>
                </div>
            )
        }
    </div>
  );
};

export default OtherUserProfile;
