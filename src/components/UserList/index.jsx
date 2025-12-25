import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import fetchModel from '../../lib/fetchModelData';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = useParams();
  const [friend, setFriend] = useState([])
  const [name, setName] = useState([])
  const [trigger, setTrigger] = useState(0)


  // const handleAddFriend = async () => {
  //   try {
  //     const friendId = id["*"].split("/")[1]
  //     console.log(friendId)
  //     const user = JSON.parse(localStorage.getItem("user"))
  //     console.log(user.id)

  //     const res = await fetch(`http://localhost:8081/api/user/addfriend/${user.id}/${friendId}`).then(res => res.json())
  //     console.log(res)
  //     setTrigger((prev) => (prev + 1))

      
  //   }catch(err){

  //   }
  // }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const priv = JSON.parse(localStorage.getItem("user"))
        // const re = await fetch(`http://localhost:8081/api/user/${priv.id}`).then(res => res.json())
        // setFriend(re.friend)

        // const arr = []

        // friend.map(async (f) => {
        //   const r = await fetch(`http://localhost:8081/api/user/${f}`).then(res => res.json())
        //   arr.push(`${r.first_name} ${r.last_name}`)
        // })
        // setName(arr)
        // console.log(friend)
        


        const response = await fetchModel('/api/user/list');
        setUsers(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [trigger]);

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
        There are {users.length} users in the system.
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem 
              component={Link} 
              to={`/users/${item._id}`}
            >
            <ListItemText primary={`${item.first_name} ${item.last_name}`} /> 
            {/* <Button onClick={handleAddFriend}>Add friend</Button> */}

            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Typography variant="body1">This is end of list</Typography>
      {/* <Typography variant="body1">You have: {friend.friendCount}</Typography>
      <Typography variant="body1">List Friend</Typography>
      {name && name.map((f) => {
        return <h2>{f}</h2>
      })} */}
      
      
    </div>
  );
}

export default UserList;