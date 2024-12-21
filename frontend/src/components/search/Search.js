import React, { useContext, useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import Footer from '../Main_page/Footer';
import "./search.css";
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router';

const Search = () => {

  const [search, setSearch] = useState('');
  const { user } = useContext(UserContext);
  const [allUserData, setallUserData] = useState([]);
  const [userNotFound, setuserNotFound] = useState('');
  const navigate = useNavigate();

  const token = user?.AccessToken;

  const handleSearch = async () => {
   

    if (!search.trim()) {
      console.log("Please enter a search query");
      setuserNotFound("please enter a search query")
      setallUserData('')
      return;
    }

    const searchQuery = encodeURIComponent(search);

    try {
      const response = await fetch(`http://localhost:7000/api/v1/search/searchallusers?query=${searchQuery}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setallUserData('')
        setuserNotFound("User not found")
        setSearch('')
        throw new Error('Search failed');
      }

      const matchUserData = await response.json();
      // console.log(matchUserData.data[0]);

      const data = matchUserData.data
      console.log(data)
      
      setallUserData(data)
      
      setSearch('')
      setuserNotFound('')
     
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImage = (_id) => {
    console.log("======",_id)
    navigate("/otherUserProfile",{state:{otherUserId:_id}})

    
  }

  return (
    <div>
      <div className='m-2 '>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            className="rounded"
            style={{
              padding: "4px",
              marginRight: "2px",
              border: "1px solid #ccc",
              width: "85%",  
            }}
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="rounded"
            style={{
              padding: "2px 4px", 
              border: "1px solid #ccc",
              backgroundColor: "#007bff", 
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width:"15%"
            }}
            type="submit"
            onClick={handleSearch}
          >
            <IoSearchOutline size={30} />
          </button>
        </div>



        <div>
        {
          allUserData.length > 0 ? (
            allUserData.map((user, index) => (
              <div key={user._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px',marginTop:"1rem" ,border: "1px solid #ccc", padding:"6px 12px",borderRadius: "8px"}}>
                <div>
                  <img src={user.avatar} alt="" style={{ height: "40px", width: "40px", borderRadius: "50%" }} onClick={(e) => {handleImage(user._id)}}/>
                </div>
                <div style={{ marginLeft: '30px' }}>
                  <span>{user.username}</span>
                </div>
                <span style={{ marginLeft: 'auto' }}>
                  <button
                    className="bg-primary text-white rounded"
                    style={{
                      border: "none",
                      padding: "4px",
                      position: "relative",
                      right: "0",
                      marginLeft: 'auto', 
                      paddingRight:"8px", 
                      paddingLeft:"8px" 
                    }}
                  >
                    Follow
                  </button>
                </span>
              </div>
            ))
          ) : (
            <div></div>
          )
        }
      </div>

      <div className="text-center mt-5">
        {userNotFound}
      </div>


      

      <footer
        style={{
          width: "100%",
          position: 'fixed',
          bottom: 0,
          left: 0,
        }}
      >
        <Footer />
      </footer>
    </div>
    </div>
  );
};

export default Search;
