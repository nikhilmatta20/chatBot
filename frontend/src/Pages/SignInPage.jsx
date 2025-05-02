import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../config';


const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // For navigation after login

const handleLogin = async (e) => {
  e.preventDefault();

  try {
   

    const response = await axios.post(`${apiUrl}/api/auth/login`, {
      username,
      password
    });

   if (response.data.token) {
      // Store the user data and token in localStorage
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    }
  } catch (error) {
    console.error(error);
    alert("Invalid username or password");
  }
};

  return (
    <div style={{display:'flex'}}>
      <div style={{width:'50%'}}>
        <img src="./logo.png" alt="" style={{margin:50}}/>
        <div>
            <form action="" method="post" onSubmit={handleLogin}>
            <h2 style={{marginLeft:200}}>Sign in to your Plexify</h2>
            <label htmlFor="" style={{marginLeft:200}}>Username</label><br />
            <input type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
             style={{marginLeft:200, width:'85%', borderRadius:5, height:25, border:'1px solid lightgrey',marginTop:10}}/><br /><br />
            <label htmlFor="" style={{marginLeft:200, }}>Password</label><br />
            <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
             style={{marginLeft:200,width:'85%', borderRadius:5,height:25,border:'1px solid lightgrey',marginTop:10}}/>
            <button type="submit" style={{marginLeft:200,width:'85%', borderRadius:20,height:35,border:'none',marginTop:50, color:'white', backgroundColor:'lightgrey', fontWeight:'bold', marginBottom:30,cursor:'pointer'}}>Log in</button>
            <a href="" style={{marginLeft:400}}>Forgot password?</a>
            <p style={{marginLeft:350, marginTop:20}}>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </form>
        </div>
        
      </div>
      <div style={{width:'50%'}}>
      <img src="./ManImg.png" alt="" style={{height:'100vh', width:'100%', marginLeft:417,marginTop:-10,marginRight:-20}}/>
      </div>
    </div>
  )
}

export default SignInPage
