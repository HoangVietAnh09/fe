import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, CircularProgress, Alert } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetchModel(`/api/user/${userId}`);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch user detail:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [userId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading user: {error.statusText || error.message || 'User not found'}
      </Alert>
    );
  }

  if (!user) {
    return (
      <Alert severity="warning" sx={{ m: 2 }}>
        User not found
      </Alert>
    );
  }

  return (
    <Card sx={{ m: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>
        
        {user.location && (
          <Typography variant="body1">
            <strong>Location:</strong> {user.location}
          </Typography>
        )}
        
        {user.occupation && (
          <Typography variant="body1">
            <strong>Occupation:</strong> {user.occupation}
          </Typography>
        )}
        
        {user.description && (
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Description:</strong> {user.description}
          </Typography>
        )}
        
        <Typography
          variant="body1"
          sx={{ mt: 2 }}
          component={Link}
          to={`/photos/${user._id}`}
          style={{
            display: "inline-block",
            color: "#1976d2",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          View Photos of {user.first_name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserDetail;