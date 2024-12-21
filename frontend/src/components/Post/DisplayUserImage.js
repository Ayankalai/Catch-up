import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router';

const DisplayUserImage = () => {
    const { user } = useContext(UserContext);
    const [userImages, setUserImages] = useState([]);

    useEffect(() => {
        const fetchUserImage = async () => {
            const token = user.AccessToken;
            const response = await fetch("http://localhost:7000/api/v1/image/getUserImage", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            const userImage = await response.json();
            const data = userImage.data;
            setUserImages(data);
            console.log(data);
        };
        fetchUserImage();
    }, [user]);

    const navigate = useNavigate();

    const handleImage = (id) => {
        navigate("/editImage", { state: { imageId: id } }); 
    };

    return (
        <div className="container">
            {/* <h1 className="my-4">User Images</h1> */}
            <div className="row">
                {userImages.map(image => (
                    <div key={image._id} className='col' onClick={() => handleImage(image._id)}>
                        <div className="d-flex m-2" style={{ height: '50px', width: '50px', justifyContent: 'center', alignItems: 'center' }}>
                            <img 
                                src={image.image} 
                                alt={`User image ${image._id}`} 
                                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }} 
                            />
                        </div>
                        {/* <h1>{image._id}</h1> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DisplayUserImage;
