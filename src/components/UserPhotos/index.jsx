import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Box,
  Link as MuiLink,
  CircularProgress,
  Alert,
  Chip,
  TextField,
  Button
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState({});
  const [submitting, setSubmitting] = useState({});

  const handleCommentChange = (photoId, value) => {
    setComment({
      ...comment,
      [photoId]: value
    });
  };

  const handleSubmitComment = async (photoId) => {
    const commentText = comment[photoId];
    if (!commentText || commentText.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }

    const user = localStorage.getItem('user');
    console.log("User from localStorage:", user);
    console.log("Submitting comment for photo:", photoId);

    try {
      setSubmitting({ ...submitting, [photoId]: true });
      
      const response = await fetch(`http://localhost:8081/commentsOfPhoto/${photoId}`, {
        method: 'POST',
        body: JSON.stringify({ comment: commentText }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      console.log("Submit comment response status:", response.status);
      
      if (response.status === 401) {
        alert("You must be logged in to comment. Please log in first.");
        localStorage.removeItem('user');
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit comment');
      }

      const result = await response.json();
      console.log("Comment response data:", result);
      
      const normalizedComment = {
      comment:
        typeof result.comment?.comment === "string"
          ? result.comment.comment
          : "",
      date: result.comment?.date || new Date(),
      user_id: result.comment?.user_id,
    };

    setPhotos(prevPhotos =>
      prevPhotos.map(photo =>
        photo._id === photoId
          ? {
              ...photo,
              comments: [...(photo.comments || []), normalizedComment],
            }
          : photo
      )
    );

      setComment((prev) => ({
        ...prev,
        [photoId]: ""
      }));

      alert("Comment posted successfully!");
    } catch (err) {
      console.error("Error submitting comment:", err);
      alert(`Failed to post comment: ${err.message}`);
    } finally {
      setSubmitting({ ...submitting, [photoId]: false });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [userResponse, photosResponse] = await Promise.all([
          fetchModel(`/api/user/${userId}`),
          fetchModel(`/api/photo/${userId}`)
        ]);

        setUser(userResponse.data);
        
        const photosData = photosResponse.data;
        console.log("Fetched photos:", photosData);
        
        if (Array.isArray(photosData)) {
          const validatedPhotos = photosData.map(photo => {
            console.log("Photo comments:", photo.comments);
            return {
              ...photo,
              comments: Array.isArray(photo.comments) ? photo.comments : []
            };
          });
          setPhotos(validatedPhotos);
        } else {
          console.error('Photos data is not an array:', photosData);
          setPhotos([]);
        }
      } catch (err) {
        console.error("Failed to fetch photos:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const formatDateTime = (dt) => {
    if (!dt) return 'Unknown date';
    const date = new Date(dt);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading photos: {error.statusText || error.message || 'Unknown error'}
      </Alert>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <Typography variant="h6" sx={{ m: 2 }}>
        {user ? `${user.first_name} ${user.last_name}` : 'This user'} has no photos.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Photos of {user ? `${user.first_name} ${user.last_name}` : 'User'}
      </Typography>
      
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent sx={{ pb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" fontWeight="bold">
                {photo.file_name}
              </Typography>
              <Chip 
                label={`Photo ID: ${photo._id.slice(-6)}`} 
                size="small" 
                color="primary"
                variant="outlined"
              />
            </Box>
          </CardContent>
          
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}
            alt={photo.file_name}
            sx={{ 
              width: "100%", 
              maxWidth: "600px",
              height: "auto",
              margin: "0 auto",
              display: "block"
            }}
          />
          
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Uploaded: {formatDateTime(photo.date_time)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              User ID: {photo.user_id}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Comments
              </Typography>
              <Chip 
                label={`${photo.comments ? photo.comments.length : 0} comments`}
                size="small"
                color="success"
              />
            </Box>
            
            {photo.comments && Array.isArray(photo.comments) && photo.comments.length > 0 ? (
              <Box sx={{ mt: 2 }}>
                {photo.comments.map((comment, index) => {
                  if (!comment || typeof comment !== 'object') {
                    console.warn('Invalid comment:', comment);
                    return null;
                  }
                  
                  return (
                    <Box 
                      key={comment._id || `comment-${index}`} 
                      sx={{ 
                        mb: 2, 
                        p: 2,
                        bgcolor: '#f5f5f5',
                        borderRadius: 2,
                        borderLeft: "4px solid #1976d2",
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: '#e3f2fd',
                          transform: 'translateX(4px)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Comment #{index + 1}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <MuiLink
                          component={Link}
                          to={`/users/${comment.user_id}`}
                          underline="hover"
                          sx={{ 
                            fontWeight: 'bold',
                            color: '#1976d2',
                            '&:hover': { color: '#1565c0' }
                          }}
                        >
                          {comment.user ? 
                            `${comment.user.first_name} ${comment.user.last_name}` : 
                            'Unknown User'
                          }
                        </MuiLink>
                        {" • "}
                        <span style={{ color: "gray", fontSize: '0.875rem' }}>
                          {comment.date_time ? formatDateTime(comment.date_time) : 
                           comment.date ? formatDateTime(comment.date) : 'Unknown date'}
                        </span>
                      </Typography>
                      
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mt: 1,
                          pl: 1,
                          fontStyle: 'italic',
                          color: '#333'
                        }}
                      >
                        "{comment.comment}"
                      </Typography>
                      
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        Commenter ID: {comment.user_id}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Alert severity="info" sx={{ mt: 2 }}>
                No comments yet. Be the first to comment!
              </Alert>
            )}
            
            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" fontWeight="bold">
              Add a comment
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Write a comment..."
                value={comment[photo._id] || ""}
                onChange={(e) =>
                  handleCommentChange(photo._id, e.target.value)
                }
                disabled={submitting[photo._id]}
              />

              <Button
                variant="contained"
                onClick={() => handleSubmitComment(photo._id)}
                disabled={submitting[photo._id]}
              >
                {submitting[photo._id] ? "Posting..." : "Post"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;