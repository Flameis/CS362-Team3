import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/general.css'; // Import the general CSS file
import '../styles/plantdetails.css'; // Corrected import statement

function PlantDetails() {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [userRating, setUserRating] = useState(null);
  const [avgRating, setAvgRating] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportDescription, setReportDescription] = useState('');
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const plantResponse = await fetch(`/api/plants/${plantId}`);
        const plantData = await plantResponse.json();
        setPlant(plantData.data[0]);
        setAvgRating(plantData.data[0].avg_rating);
        const commentsResponse = await fetch(`/api/comments/plant/${plantId}`);
        const commentsData = await commentsResponse.json();
        setComments(commentsData.data);

        const imagesResponse = await fetch(`/api/images?plant_id=${plantId}`);
        const imagesData = await imagesResponse.json();
        setPlant(prevPlant => ({
          ...prevPlant,
          images: Array.isArray(imagesData.data) ? imagesData.data : []
        }));

        const res = await fetch(`/api/auth/me`);
        if (res.ok) {
          const data = await res.json();
          setLoggedIn(true);
          setUserId(data.data.id);
          setIsAdmin(data.data.role === 'admin');
          const response = await fetch(`/api/ratings/plant/${plantId}/user`);
          const ratingData = await response.json();
          setUserRating(ratingData.data.rating);
        }
      } catch (err) {
        console.error('Error fetching plant details or comments:', err);
      }
    };
    fetchPlantData();
  }, [plantId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError('Comment cannot be empty');
      return;
    }
    try {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plant_id: plantId, comment: newComment })
      });
      if (!response.ok) {
        throw new Error('Failed to post comment');
      }
      const comment = await response.json();
      setComments([...comments, comment.data]);
      setNewComment('');
      setError('');
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };


  const handleRating = async (event) => {
    // console.debug(event)
    const rating = Number(event.target.getAttribute('value'));
    let url = '/api/ratings'
    const parms = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ plant_id: plantId, rating: rating})
    }
    if (userRating !== null) {
      url += `/plant/${plantId}/user`;
      parms.method = 'PUT';
      parms.body = JSON.stringify({ rating: rating});
    }
    const response = await fetch(url, parms);
    if (!response.ok) {
      throw new Error('Failed to set rating');
    }
    const data = await response.json();
    setUserRating(rating);
    setAvgRating(data.new_avg);
  }

  const handleReport = async () => {
    if (reportSubmitted) {
      alert('You have already reported this plant.');
      return;
    }
    try {
      const currentTime = new Date().toISOString();
      const response = await fetch(`/api/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plant_id: plantId, user_id: userId, description: reportDescription, date_reported: currentTime })
      });
      if (!response.ok) {
        throw new Error('Failed to submit report');
      }
      setReportSubmitted(true);
      alert('Report submitted successfully.');
    } catch (err) {
      console.error('Error submitting report:', err);
    }
  };

  const handleVerify = async () => {
    try {
      const response = await fetch(`/api/plants/${plantId}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to verify plant');
      }
      setPlant(prevPlant => ({
        ...prevPlant,
        verified: true
      }));
    } catch (err) {
      console.error('Error verifying plant:', err);
    }
  };

  return (
    <div className="plant-details-container">
      {plant ? (
        <div className="plant-details">
          <h1>{plant.common_name || 'Unknown'} {plant.verified && <span className="verified-badge">✔️</span>}</h1>
          <p>{plant.description || 'No description'}</p>
          <p>Location: {plant.location || 'Unknown'}</p>
          <p>Season: {plant.season || 'Unknown'}</p>
          <p>Posted by: {plant.user || 'Anonymous'}</p>
          <p>Average Rating: <span className="rating">
              <span className={`fa fa-star ${Math.round(avgRating) >= 1 ? 'checked' : null}`}/>
              <span className={`fa fa-star ${Math.round(avgRating) >= 2 ? 'checked' : null}`}/>
              <span className={`fa fa-star ${Math.round(avgRating) >= 3 ? 'checked' : null}`}/>
              <span className={`fa fa-star ${Math.round(avgRating) >= 4 ? 'checked' : null}`}/>
              <span className={`fa fa-star ${Math.round(avgRating) >= 5 ? 'checked' : null}`}/>
              <span className="rating-number">&nbsp;{avgRating || 'N/A'}</span>
            </span>
          </p>
          {loggedIn ? (
            <>
              <p>Your Rating: <span className="rating user-rating" onClick={handleRating}>
                <span id='rating1' value='1' className={`fa fa-star ${Math.round(userRating) >= 1 ? 'checked' : null}`}/>
                <span id='rating2' value='2' className={`fa fa-star ${Math.round(userRating) >= 2 ? 'checked' : null}`}/>
                <span id='rating3' value='3' className={`fa fa-star ${Math.round(userRating) >= 3 ? 'checked' : null}`}/>
                <span id='rating4' value='4' className={`fa fa-star ${Math.round(userRating) >= 4 ? 'checked' : null}`}/>
                <span id='rating5' value='5' className={`fa fa-star ${Math.round(userRating) >= 5 ? 'checked' : null}`}/>
              </span></p>
              <p>
              <textarea
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Describe the issue"
              />
              </p>
              <button onClick={handleReport} disabled={reportSubmitted} className="report-button">Report Plant</button>
            </>
          ) : (
            <p className='login-to-messages'>login to rate and report</p>
          )}
          {isAdmin && !plant.verified && (
            <button onClick={handleVerify} className="verify-button">Verify Plant</button>
          )}
          <div className="plant-images">
            {Array.isArray(plant.images) && plant.images.length > 0 ? (
              plant.images.map((image, index) => (
                <img key={index} src={image.image_url} alt={`Plant ${index + 1}`} />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="comments">
            <h2>Comments</h2>
            <ul>
              {comments.map(comment => (
                <li key={comment.comment_id}><span className={comment.role=='admin' ? 'comment comment-user user-admin' : 'comment comment-user user-normal'}>{comment.username}:</span>&nbsp;{comment.comment}</li>
              ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button type="submit">Submit</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PlantDetails;
