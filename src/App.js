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
import Search from './components/Search';

const RequireAuth = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


const Upload = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const {name, files} = event.target;
    setForm((prevForm) => ({...prevForm, [name]: files[0]}));
  }
  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('photo', form.photo);

      const response = await fetch('http://localhost:8081/api/upload/photos/new', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })
      .then(res => res.json());

      if(response.status === 200) {
        alert('File uploaded successfully');
        navigate("/")
        return;
      }else{
        alert('File upload failed: ' + response.message);
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  }

  return (
    <div>
      <h2>Upload Page</h2>
      <form onSubmit={handleUpload}>
          <input type="file" name="photo" accept="image/*" required onChange={handleChange}/>
          <button type="submit">Upload</button>
      </form>
    </div>
  )
}


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({username: "", password: "", retype_password: "", first_name: "", last_name: "", location: "", description: "", occupation: ""});
  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/admin/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json());

      if(response.status === 201) {
        alert('Registration successful');
        navigate('/login');
        return;
      }else{
        alert('Registration failed: ' + response.message);
      }
      
    }catch (error) {
      console.error('Error during registration:', error);
    }
  }

  return (
    <div className="register-container">
    <h1>Register</h1>
    <form className="register-form" onSubmit={handleSubmit}>
    <label>Username</label>
    <input type="text" name="username" value={formData.username} onChange={handleChange} />

    <label>Password</label>
    <input type="password" name="password" value={formData.password} onChange={handleChange} />

    <label>Retype Password</label>
    <input type="password" name="retype_password" value={formData.retype_password} onChange={handleChange} />

    <label>First name</label>
    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />

    <label>Last name</label>
    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />

    <label>Location</label>
    <input type="text" name="location" value={formData.location} onChange={handleChange} />

    <label>Description</label>
    <input type="text" name="description" value={formData.description} onChange={handleChange} />

    <label>Occupation</label>
    <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />

    <button type="submit">Submit</button>
    <br />
    <Link to="/login">Already have an account? Login here.</Link>
  </form>
</div>

  )
};
  


const Stats = ({user, onLogout}) => {
  console.log('Stats user:', user);
  
  if(!user){
    return (<Navigate to="/login" />);
  }
  

  return (
    <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar onLogout={onLogout} />
          </Grid>
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
      },
      credentials: 'include'
    })
    .then(res => res.json());
    localStorage.setItem('user', JSON.stringify(response.user));
    
    if(response.status === 200) {
      onLogin && onLogin(response.user);
      alert('Login successful');
      navigate(`/users/${response.user.id}`);
    }else{
      alert('Login failed: ' + response.message);
    }
    console.log('response', response);


 
  }

  
  return (
    <div className="login-container">
    <h1>Login</h1>

    <div className="login-form">
      <label>Username</label>
      <input
        type="text"
        placeholder="Enter username"
        onChange={(e) =>
          setCreds({ ...creds, username: e.target.value })
        }
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) =>
          setCreds({ ...creds, password: e.target.value })
        }
      />

      <button onClick={handleLogin}>Login</button>

      <br />
      <div>
        <Link to="/register">Don't have an account? Register here.</Link>
      </div>
    </div>
  </div>

  );
}


const AppLayout = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();
  async function logout() {
    try {
      const response = await fetch(`http://localhost:8081/api/user/logout`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      }).then(res => res.json())
    }catch (err){
      console.log(err);
    }

    setUser(null);
    localStorage.removeItem("user");
    navigate('/login');
  }
  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={setUser}/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={
        <RequireAuth user={user}>
          <Search />
        </RequireAuth>
      }/>

      <Route path="upload" element={
        <RequireAuth user={user}>
          <Upload />
        </RequireAuth>
        }/>
      <Route path="/*" element={
        <RequireAuth user={user}>
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
      </RequireAuth>
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