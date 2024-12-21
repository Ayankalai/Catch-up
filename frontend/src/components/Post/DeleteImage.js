import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const DeleteImage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { imageId } = location.state || {}; 
    const {user} = useContext(UserContext)

    const token = user.AccessToken
    const handleCancel = () => {
        navigate("/editImage");
    }

    const handleDelete = async () => {

        console.log(token)
        console.log(imageId)
        
            try {
                const token = user.AccessToken
                const response = await fetch(`http://localhost:7000/api/v1/image/deleteUserImage/${imageId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete the image');
                }

                const data = await response.json();

                navigate('/profile')
                
            } catch (error) {
                console.error('Error deleting image:', error);
                alert('An error occurred while deleting the image');
            }
        
    }

    return (
        <div>
            <h5>Aru sure you want to delete</h5>
            <div className="btn btn-danger" onClick={(e) => handleDelete(imageId._id)}>
                Delete Image
            </div>
            <div className="btn btn-secondary" onClick={handleCancel}>
                Back to Edit
            </div>
        </div>
    );
}

export default DeleteImage;
