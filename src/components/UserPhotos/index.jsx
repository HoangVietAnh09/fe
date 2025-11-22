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
        setPhotos(photosResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch photos:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]); 

  const formatDateTime = (dt) => {
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
            
            {photo.comments && photo.comments.length > 0 ? (
              <Box sx={{ mt: 2 }}>
                {photo.comments.map((comment, index) => (
                  <Box 
                    key={comment._id} 
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
                        Comment #{index + 1} | ID: {comment._id.slice(-6)}
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
                        {formatDateTime(comment.date_time)}
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
                ))}
              </Box>
            ) : (
              <Alert severity="info" sx={{ mt: 2 }}>
                No comments yet. Be the first to comment!
              </Alert>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;