import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const EditImage = () => {
    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { imageId } = location.state || {};
    const { user } = useContext(UserContext);
    console.log("++++++++", imageId, "++++++++++++")


    useEffect(() => {
        const fetchImageDetails = async () => {
            if (imageId) {
                console.log(imageId)
                const token = await user.AccessToken;
                const response = await fetch(`http://localhost:7000/api/v1/image/userImageId/${imageId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                console.log(data)
                // console.log("======",data.data.caption)
                console.log("======",data.data)

                setCaption(data.data.caption)
                setImage(data.data)
                
            }
        };

        fetchImageDetails();
    }, [imageId, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('caption', caption);
        
        try {
            const token = user.AccessToken;
            console.log(token)
            console.log(imageId)
            console.log(formData)
            const response = await fetch(`http://localhost:7000/api/v1/image/updateUserImage/${imageId}`, {
                method: 'PATCH',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json()
            console.log(data)
            navigate('/profile')

        } catch (error) {
            console.error('Error updating image:', error);
            alert('An error occurred while updating the image');
        }
    };
    const handleDelete = (id) => {
        navigate("/deleteImage",{state:{imageId: id}})
    }

    return (
        <div className="container">
            <h1 className="my-4">Edit Image</h1>
               

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Upload Image</label>

                    <div>
                     <img src={image.image} alt="" />
                    </div>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        className="form-control mt-2"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
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

                <button type="submit" className="btn btn-primary" disabled={!image && !caption}>
                    Update Image
                </button>
            </form>
            <button className="btn btn-danger mt-2" onClick={(e) => handleDelete(image._id)}>
                Delete Image</button>
        </div>
    );
};

export default EditImage;
