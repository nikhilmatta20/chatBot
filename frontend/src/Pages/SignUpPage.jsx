import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../config';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!termsAccepted) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    try {
     

      const response = await axios.post(`${apiUrl}/api/auth/register`, {
        firstName,
        lastName,
        username: userName,
        email,
        password,
        confirmPassword,
        role: "member"  // You can set the role to member by default or based on your logic
      });

      alert(response.data.message); // Success message from backend
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      console.error(error);
      alert("Registration failed! Please try again.");
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <img src="./logo.png" alt="" style={{ margin: 50 }} />
        <form onSubmit={handleSubmit} style={{ marginLeft: 200 }}>
          <h2>Create an account</h2>

          <label>First name</label><br />
          <input
            type="text"
            name="FirstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{
              width: '85%',
              borderRadius: 5,
              height: 30,
              border: '1px solid lightgrey',
              marginTop: 10,
            }}
          /><br /><br />

          <label>Last name</label><br />
          <input
            type="text"
            name="LastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{
              width: '85%',
              borderRadius: 5,
              height: 30,
              border: '1px solid lightgrey',
              marginTop: 10,
              marginBottom: 10,
            }}
          /><br />

          <label>Username</label><br />
          <input
            type="text"
            name="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              width: '85%',
              borderRadius: 5,
              height: 30,
              border: '1px solid lightgrey',
              marginTop: 10,
              marginBottom: 10,
            }}
          /><br />

          <label>Email</label><br />
          <input
            type="email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '85%',
              borderRadius: 5,
              height: 30,
              border: '1px solid lightgrey',
              marginTop: 10,
            }}
          /><br /><br />

          <label>Password</label><br />
          <input
            type="password"
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '85%',
              borderRadius: 5,
              height: 30,
              border: '1px solid lightgrey',
              marginTop: 10,
              marginBottom: 10,
            }}
          /><br />

          <label>Confirm Password</label><br />
          <input
            type="password"
            name="ConfirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: '85%',
              borderRadius: 5,
              height: 30,
              border: '1px solid lightgrey',
              marginTop: 10,
            }}
          /><br /><br />

          <div style={{ display: 'flex' }}>
            <input
              type="checkbox"
              name="TermsAndConditions"
              onChange={() => setTermsAccepted(!termsAccepted)}
              style={{ cursor: 'pointer' }}
            />
            <p style={{ marginLeft: 10, marginTop: 20 }}>
              By creating an account, I agree to our
              <a href=""> Terms of use </a> and Privacy Policy
            </p>
          </div>

          <button
            type="submit"
            style={{
              width: '85%',
              borderRadius: 20,
              height: 35,
              border: 'none',
              marginTop: 50,
              color: 'white',
              backgroundColor: 'lightgrey',
              fontWeight: 'bold',
              marginBottom: 30,
              fontSize: 20,
              cursor: 'pointer',
            }}
          >
            Create an account
          </button>
        </form>
      </div>
      <div style={{ width: '50%' }}>
        <img
          src="./ManImg.png"
          alt=""
          style={{
            height: '100vh',
            width: '100%',
            marginLeft: 417,
            marginTop: -10,
            marginRight: -20,
          }}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
