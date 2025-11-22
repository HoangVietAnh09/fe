import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import fetchModel from '../../lib/fetchModelData';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchModel('/api/user/list');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading users: {error.statusText || error.message || 'Unknown error'}
      </Alert>
    );
  }

  return (
    <div>
      <Typography variant="body1">
        This is list user edited by Hoang Viet Anh - B22DCAT012
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem 
              component={Link} 
              to={`/users/${item._id}`}
              button
            >
              <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Typography variant="body1">This is end of list</Typography>
    </div>
  );
}

export default UserList;