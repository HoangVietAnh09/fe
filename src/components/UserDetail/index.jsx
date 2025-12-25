import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, CircularProgress, Alert, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import UserUpdate from "./update.jsx";
// import ListFriend from "./ListFriend.jsx"
import "./styles.css";
import { Navigate, useNavigate } from "react-router-dom";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const [trigger, setTrigger] = useState(0);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setUser((prev) => ({...prev, [name]: value}))

  }

  const handleSubmit = async (event) => {
    event.preventDefault();

  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json());

      if(response.status === 200){
        alert('User deleted successfully');
        // window.location.href = '/';
        navigate("/")
      }
    }catch(error){
      alert(error)
    }
    
  }

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
        <br />
        {/* <Button type="submit" onClick={handleDelete}>Delete User</Button> */}
        <br />
        <Typography
          variant="body1"
          sx={{ mt: 2 }}
          component={Link}
          to={`/upload`}
          style={{
            display: "inline-block",
            color: "#1976d2",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Upload
        </Typography>

        {/* <div>
          <h1>Update data</h1>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" name="first_name" value={user.first_name} onChange={handleChange} />
            <input type="text" name="last_name" value={user.last_name} onChange={handleChange} />
            <input type="text" name="location" value={user.location} onChange={handleChange} />
            <input type="text" name="occupation" value={user.occupation} onChange={handleChange} />
            <textarea name="description" value={user.description} onChange={handleChange}></textarea>
            <button type="submit">Update User</button>
          </form>
        </div> */}

        {/* <UserUpdate /> */}
      </CardContent>
    </Card>
  );
}

export default UserDetail;