import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import { Col, Row, Card, Spinner } from 'react-bootstrap';

const DisplayVideos = () => {
  const [videos, setVideos] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserVideos = async () => {
      const token = user?.AccessToken;

      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:7000/api/v1/video/getuservideos", {
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
        console.log(data)

        if (data?.data && Array.isArray(data.data)) {
          setVideos(data.data);
        } else {
          setVideos([]);
        }
      } catch (err) {
        console.error("Error while fetching the videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserVideos();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading videos...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>User Videos</h2>
      <Row>
        {videos.length > 0 ? (
          videos.map((video) => (
            <Col sm={4} md={6} lg={4} key={video._id} className="mb-4">
              <Card>
                {/* <Card.Img variant="top" src={video.thumbnail} alt={video.title} /> */}
                <Card.Body>
                  <Card.Title>{video.title}</Card.Title>
                  <Card.Text>
                    <strong>Duration:</strong> {video.duration} <br />
                    <strong>Description:</strong> {video.description}
                  </Card.Text>
                  <video width="100%" height="240" controls>
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col sm={12}>
            <p>No videos available.</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default DisplayVideos;
