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

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const plantResponse = await fetch(`/api/plants/${plantId}`);
        const plantData = await plantResponse.json();
        setPlant(plantData.data[0]);

        const commentsResponse = await fetch(`/api/comments/plant/${plantId}`);
        const commentsData = await commentsResponse.json();
        setComments(commentsData.data);
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

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const response = await fetch(`/api/ratings/plant/${plantId}/user`);
        const data = await response.json();
        console.log(data)
        setUserRating(data.data.rating);
      } catch (err) {
        console.error('Error fetching user rating:', err);
      }
    };

    fetchUserRating();
  }, [plantId]);


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
    // const data = await response.json();
    setUserRating(rating);
  }

  return (
    <div className="plant-details-container">
      {plant ? (
        <div className="plant-details">
          <h1>{plant.common_name || 'Unknown'}</h1>
          <p>{plant.description || 'No description'}</p>
          <p>Location: {plant.location || 'Unknown'}</p>
          <p>Season: {plant.season || 'Unknown'}</p>
          <p>Posted by: {plant.user || 'Anonymous'}</p>
          <p>Average Rating: <span class="rating">
              <span className={`fa fa-star ${Math.round(plant.avg_rating) >= 1 ? 'checked' : null}`}/>
              <span className={`fa fa-star ${Math.round(plant.avg_rating) >= 2 ? 'checked' : null}`}/>
              <span className={`fa fa-star ${Math.round(plant.avg_rating) >= 3 ? 'checked' : null}`}/>
              <span className={`fa fa-star ${Math.round(plant.avg_rating) >= 4 ? 'checked' : null}`}/>
              <span className={`fa fa-star ${Math.round(plant.avg_rating) >= 5 ? 'checked' : null}`}/>
              <span class="number">&nbsp;{plant.avg_rating || 'N/A'}</span>
            </span>
          </p>
          <p>Your Rating: <span class="rating user-rating" onClick={handleRating}>
              <span id='rating1' value='1' className={`fa fa-star ${Math.round(userRating) >= 1 ? 'checked' : null}`}/>
              <span id='rating2' value='2' className={`fa fa-star ${Math.round(userRating) >= 2 ? 'checked' : null}`}/>
              <span id='rating3' value='3' className={`fa fa-star ${Math.round(userRating) >= 3 ? 'checked' : null}`}/>
              <span id='rating4' value='4' className={`fa fa-star ${Math.round(userRating) >= 4 ? 'checked' : null}`}/>
              <span id='rating5' value='5' className={`fa fa-star ${Math.round(userRating) >= 5 ? 'checked' : null}`}/>
            </span>
          </p>

          <div className="plant-images">
            {plant.image_urls && plant.image_urls.length > 0 ? (
              plant.image_urls.map((url, index) => (
                <img key={index} src={`${process.env.FTP_BASE_URL}${url}`} alt={`Plant ${index + 1}`} />
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
