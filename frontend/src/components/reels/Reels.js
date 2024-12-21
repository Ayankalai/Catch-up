import React, { useContext, useEffect, useState } from 'react';
import Footer from '../Main_page/Footer';
import UserContext from '../../context/UserContext';

const Reels = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const token = user?.AccessToken;
    
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/v1/video/getAllVideos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        console.log("Fetched videos:", data);

        if (data && Array.isArray(data.data)) {
          setVideos(data.data);  // Assuming the videos are inside 'data' property
        } else {
          setError("No videos found.");
        }

      } catch (err) {
        setError(`Error: ${err.message}`);
        console.error(err);  // Log error to the console for debugging
      }
    };

    fetchVideos();
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div>
        {videos.length > 0 ? (
          videos.map(video => (
            <div key={video._id}>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <video width="320" height="240" controls>
                <source src={video.videoFile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {video.thumbnail && (
                <img src={video.thumbnail} alt={video.title} width="200" />
              )}
            </div>
          ))
        ) : (
          <div>No videos available</div>
        )}
      </div>

      <footer style={{
        width: "100%",
        position: 'fixed',
        bottom: 0,
        left: 0,
      }}>
        <Footer />
      </footer>
    </div>
  );
};

export default Reels;
