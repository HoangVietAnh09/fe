import './App.css';
import React from "react";
import { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import fetchModel from './lib/fetchModelData';
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import { Link } from 'react-router-dom';
import useEffect from 'react';

const Register = () => {
  
}

const Stats = ({user, onLogout}) => {
  
  
  if(!user){
    return (<Navigate to="/login" />);
  }
  

  return (
    <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar onLogout={onLogout} />
          </Grid>
          
          {/* <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>
         
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/photos/:userId" element={<UserPhotos />} />
                <Route path="/users" element={<UserList />} />
              </Routes>
            </Paper>
          </Grid>  */}
        </Grid>
      </div>
      
  )
}

const Login = ({onLogin})  => {
  const [creds, setCreds] = useState({});
  
  const navigate = useNavigate();
  async function handleLogin() {
    const response = await fetch('http://localhost:8081/admin/login', {
      method: 'POST',
      body: JSON.stringify({username: creds.username, password: creds.password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json());
    // const response = await fetchModel('/admin/login', {
    //   method: 'POST',
    //   body: JSON.stringify({username: creds.username, password: creds.password}),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })

    if(response.status === 200) {
      onLogin && onLogin({username: creds.username});
      alert('Login successful');
      navigate(`/users/${response.user.id}`);
    }else{
      alert('Login failed: ' + response.message);
    }
    console.log('response', response);


  // if(creds.username === 'admin' && creds.password === '123') {
  //   onLogin && onLogin({username: creds.username});
  //     alert('Login successful');
  //     navigate('/stats');
  //   }
  }

  
  return (
    <div style={{ padding: 10 }}> <br/>
    <span>Username:</span><br/>
    <input type="text" onChange={(e) => setCreds({...creds, username: e.target.value})}/><br/>
    <span>Password:</span><br/>
    <input type="password" onChange={(e) => setCreds({...creds, password: e.target.value})}/><br/><br/>
    <button onClick={handleLogin}>Login</button> </div>
  );
}

const AppLayout = (onLogout) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  function logout() {
    setUser(null);
    navigate('/login');
  }
  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={setUser}/>} />
      <Route path="/user-detail" element={<Stats user={user} onLogout={logout}/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={
        <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar onLogout={logout} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/photos/:userId" element={<UserPhotos />} />
                <Route path="/users" element={<UserList />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
      } />
    </Routes>
  );
}

const App = (props) => {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
} 

export default App;