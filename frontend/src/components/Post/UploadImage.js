import React, { useContext, useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const handlePost = async(e) => {
        e.preventDefault()
        
        const token = user.AccessToken;

        const formData = new FormData();
        formData.append('image', image);
        formData.append('caption', caption);
        console.log(formData)

        try {
            const response = await fetch("http://localhost:7000/api/v1/image/uploadImage",{
                method:"POST",
                body:formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                  },
            })
            
            const result = await response.json();
            console.log(result);

            setCaption('')
            setImage('')
            navigate('/profile')
        } catch (error) {
            console.error("Error uploading image:", error);
        }
  }

  const handleBackToggle = () => {
    navigate("/post")
  }

  return (
    <div className="mb-3">
        <div onClick={handleBackToggle} style={{border:"none"}}>
                    <IoMdArrowRoundBack />
        
        </div>
      <div className='mt-4'>
      <form >
        <div className="mb-3">
            <h1 className="text-center">Post</h1>
          <label htmlFor="image" className="form-label">Upload Image</label>
          <input
            type="file"
            name="image"
            id="image"
            className="form-control d-none"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="image" className="btn btn-primary mt-2">
            Choose Image
          </label>
        </div>

        
        <div className="mb-3">
          <label htmlFor="caption" className="form-label">Caption</label>
          <input
            type="text"
            name="caption"
            id="caption"
            className="form-control"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success"
          disabled={!image || !caption}
          onClick={handlePost}
        >
          Post
        </button>
      </form>
      </div>
    </div>
  );
};

export default UploadImage;
