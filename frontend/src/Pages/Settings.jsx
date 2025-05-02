import { useParams,useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const token = localStorage.getItem('token');
import { apiUrl } from '../config';


const Settings = () => {
    const [showAlertMessage, setShowAlertMessage] = useState(false);
    const navigate = useNavigate();
    const { userId } = useParams();
    const [currentUserRole, setCurrentUserRole] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);


      const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
      });
  const history = useNavigate();


   useEffect(() => {
  const fetchUser = async () => {

    try {
      const res = await axios.get(
        `${apiUrl}/api/auth/team/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { username, email, firstName, lastName } = res.data;
      setFormData({ username, email, firstName, lastName });
    } catch (err) {
      console.error("Error fetching user:", err.response?.data || err.message);
    }
  };
  const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      setCurrentUserRole(currentUser.role);
      setCurrentUserId(currentUser.id); 
    }

  fetchUser();
}, [userId]);


const handleSubmit = async (e) => {
  e.preventDefault();

  if (currentUserRole !== 'admin' && currentUserId !== userId) {
    alert('You are not allowed to edit this profile.');
    return;
  }


  if (formData.password && formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const payload = {
      username: formData.username,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName
    };

    if (formData.password) {
      payload.password = formData.password; 
    }

    await axios.put(
      `${apiUrl}/api/auth/edit/${userId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    history('/login'); 
    
  } catch (error) {
    console.error('Error updating teammate:', error);
    alert('There was an error updating the teammate.');
  }
};

    const mouseHoverEnter = () => {
        setShowAlertMessage(true);
    };

    const mouseHoverLeave = () => {
        setShowAlertMessage(false);
    };
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh',gap:30 }}>
            <div
        className="NavBar"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 100,
          alignItems: 'center',
          gap: 10,
          height: '100%',
          marginTop: -10,
          marginLeft: -10,
          borderRight: '1px solid lightgrey',
          backgroundColor: '#FAFBFC',
        }}
      >
        <img src="/cloud.png" alt="" style={{ height: 50, width: 50, marginLeft: 20, marginTop: 10 }} />
        <button onClick={() => navigate('/dashboard')} style={{ height: 50, width: 50, marginLeft: 20, marginTop: 10, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
          <img src="/home.png" alt="" style={{ height: 25, width: 25, marginLeft: -5 }} />
        </button>
        <button style={{ height: 50, width: 50, marginTop: 10, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
          <img src="/messages.png" alt="" style={{ height: 30, width: 60, marginLeft: -14 }} />
        </button>
        <button onClick={() => navigate('/chart')} style={{ height: 30, width: 30, marginLeft: 20, marginTop: 10, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
          <img src="/analytics.png" alt="" style={{ height: 20, width: 20 }} />
        </button>
        <button style={{ height: 30, width: 30, marginLeft: 20, marginTop: 10, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
          <img src="/chatRobot.png" alt="" style={{ height: 20, width: 20 }} />
        </button>
        <button onClick={() => navigate('/teams')} style={{ height: 30, width: 30, marginLeft: 20, marginTop: 10, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
          <img src="/team.png" alt="" style={{ height: 20, width: 20 }} />
        </button>
        <button style={{ height: 30, width: 30, marginLeft: 20, marginTop: 10, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
          <img src="/settings.png" alt="" style={{ height: 20, width: 20 }} />
        </button>
        <img src="/profile.png" alt="" style={{ height: 30, width: 30, marginLeft: 20, marginTop: 520 }} />
      </div>
      <div>
        <h3 style={{color:'#6A6B70', paddingLeft:20}}>Settings</h3>
        <div style={{backgroundColor:'#FAFBFC', height:'60vh',width:'90vw',marginTop:50, borderRadius:20}}>
            <h4 style={{ color: '#184E7F', paddingLeft: 60,paddingTop:20 }}>Edit Profile</h4>
            <div style={{ width: 80, height: '3px', backgroundColor: '#184E7F', marginLeft: 60 }} />
            <hr style={{ width: '85vw', border: '0.7px solid #737373', marginLeft: 60,marginTop:-1 }} />
            <form action="" method="post" onSubmit={handleSubmit} style={{ paddingLeft: 60, paddingTop: 20, color:'#5E5E5E', fontSize:12}}>
                <label htmlFor="">First Name</label><br />
                <input  value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} type="text" name="firstName" placeholder="First Name" style={{ width: '40%', height: 30, borderRadius: 10, border: '1px solid lightgrey', marginTop: 10,paddingLeft:10 }} /> <br /><br />
                <label htmlFor="">Last Name</label><br />
                <input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} type="text" name="lastName" placeholder="Last Name" style={{ width: '40%', height: 30, borderRadius: 10, border: '1px solid lightgrey', marginTop: 10,paddingLeft:10  }} /> <br /><br />
                <label htmlFor="">User Name</label><br />
                <input value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} type="text" name="userName" placeholder="User Name" style={{ width: '40%', height: 30, borderRadius: 10, border: '1px solid lightgrey', marginTop: 10,paddingLeft:10  }} /> <br /><br />
                <label htmlFor="">Email</label><br />
                <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="text" name="email" placeholder="Email" style={{ width: '40%', height: 30, borderRadius: 10, border: '1px solid lightgrey', marginTop: 10,paddingLeft:10  }} /> 
                <img 
                onMouseEnter={mouseHoverEnter}
                onMouseLeave={mouseHoverLeave}
                src="/infoRounded.png" alt="" style={{ height: 20, width: 20, marginLeft: 15, cursor: 'pointer', position:'relative' }} /> <br /><br />
                <label htmlFor="">Password</label><br />
                <input 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                type='password' name="password" placeholder="Password" style={{ width: '40%', height: 30, borderRadius: 10, border: '1px solid lightgrey', marginTop: 10,paddingLeft:10  }} /> 
                <img 
                onMouseEnter={mouseHoverEnter}
                onMouseLeave={mouseHoverLeave}
                src="/infoRounded.png" alt="" style={{ height: 20, width: 20, marginLeft: 15, cursor: 'pointer',position:'relative' }} /> <br /><br />
                <label htmlFor="">Confirm Password</label><br />
                <input
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                 type="password" name="Confirm-password" placeholder="Re-enter password" style={{ width: '40%', height: 30, borderRadius: 10, border: '1px solid lightgrey', marginTop: 10,paddingLeft:10  }} />
                <img 
                onMouseEnter={mouseHoverEnter}
                onMouseLeave={mouseHoverLeave}
                src="/infoRounded.png" alt="" style={{ height: 20, width: 20, marginLeft: 15, cursor: 'pointer',position:'relative' }} /> <br /><br />
                <button style={{ width: 140, height: 35, borderRadius: 5, border: 'none', backgroundColor: '#184E7F', color: 'white', marginTop: 10, cursor: 'pointer',float:'right',marginRight:100 }}>Save</button>
            </form>

        </div>
        {showAlertMessage && (
        <div
          style={{
            position: 'absolute',
            top: '52%',
            left: '48%',
            padding: '10px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '12px',
            color: '#727272',
            width: '180px',
            textWrap: 'nowrap'
          }}
        >
          User will be loged out imediately
        </div>
      )}

      </div>
    </div>
  )
}

export default Settings

