import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
        setPlant(plantData.data);

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
          <h1>{plant.common_name}</h1>
          <p>{plant.description}</p>
          <p>Location: {plant.location}</p>
          <p>Season: {plant.season}</p>
          <p>Posted by: {plant.user}</p>
          <h2>Comments</h2>
          <ul>
            {comments.map(comment => (
              <li key={comment.comment_id}>{comment.comment}</li>
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
