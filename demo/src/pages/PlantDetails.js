import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/general.css'; // Import the general CSS file

function PlantDetails() {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

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

  return (
    <div>
      {plant ? (
        <div>
          <h1>{plant.common_name || 'Unknown'}</h1>
          <p>{plant.description || 'No description'}</p>
          <p>Location: {plant.location || 'Unknown'}</p>
          <p>Season: {plant.season || 'Unknown'}</p>
          <p>Posted by: {plant.user || 'Anonymous'}</p>
          <h2>Comments</h2>
          <ul>
            {comments.map(comment => (
              <li key={comment.comment_id}><b className='comment user-admin'>{comment.username}:</b>&nbsp;{comment.comment}</li>
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PlantDetails;
