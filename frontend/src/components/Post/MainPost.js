import React from 'react'
import Footer from '../Main_page/Footer'
import { useNavigate } from 'react-router'
const MainPost = () => {
  const navigate = useNavigate();

  const handlePost = () =>{
    navigate("/uploadImage")
  }
  
  const handleUploadVideo = () => {
    navigate("/uploadvideo");
  };
  return (
    <div>

      <h1>New Post</h1>

      <div className="d-flex justify-content-center mb-3 b-0"
      style={{
        width: "100%",
        position: 'fixed',
        bottom: 80,
        left: 0,
      }}
      >
        <button className="btn btn-primary mx-2" onClick={handlePost}>
        Post
        </button>
        <button className="btn btn-primary mx-2" onClick={handleUploadVideo}>Video</button>
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
  )
}

export default MainPost