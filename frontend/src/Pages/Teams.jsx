import React, { useState,useEffect } from 'react';
import axios from 'axios';
const token = localStorage.getItem('token');
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../config';


const Teams = () => {
  
  const [showAddTeammate, setShowAddTeammate] = useState(false);
  const [reload, setReload] = useState(false);
  
  const [showDeleteTeammate, setShowDeleteTeammate] = useState(false);
  const [members, setMembers] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();
  
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'member',
    password:''
  });

  useEffect(() => {
    // Fetch the members data when the component mounts
    axios.get(`${apiUrl}/api/auth/team`)
      .then(response => {
        setMembers(response.data);  // Set the members data
      })
      .catch(error => {
        console.error('Error fetching members:', error);
      });

      const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      setCurrentUserRole(currentUser.role); // Set the role of the logged-in user
    }
  }, [reload]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSave = async (e) => {
  e.preventDefault();

  // Check if the current user is an admin
  if (currentUserRole !== 'admin') {
    alert('Only admins can add teammates');
    return;
  }

   try {
      // Make the API request to add a teammate
      const response = await axios.post(
        `${apiUrl}/api/auth/add-teammate`,
        formData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Add token in Authorization header
          }
        }
      );

      // If the request is successful, update the state with the new teammate
      
        setMembers((prevMembers) => [...prevMembers, response.data]);  // Add the new teammate to members

        // Reset the form fields
        setFormData({ username: '', email: '', role: 'member',password:'' });
        
        // Close the modal if any
        setShowAddTeammate(false);
        setReload(prev => !prev);

        
      
    } catch (error) {
    console.error('Error adding teammate:', error);
    alert('There was an error adding the teammate.');
  }
};


  const handleCancel = () => {
    setFormData({ username: '', email: '', role: 'member',password:'' });
    setShowAddTeammate(false); // Close the modal on cancel
  };


  const deleteTeammate = async (userId) => {
    if (!userId || userId === 'undefined') {
    console.error("Invalid userId:", userId);
    return;
  }

  // Check if the current user is an admin
  if (currentUserRole !== 'admin') {
    alert('Only admins can delete teammates');
    return;
  }

  try {
    // Make the API request to delete the teammate
    const response = await axios.delete(
      `${apiUrl}/api/auth/delete/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Add token in Authorization header
        },
      }
    );

    if (response.status === 200) {
        setMembers(members.filter((member) => member._id !== userId));
        alert('User deleted successfully');
      }
      setShowDeleteTeammate(false);
  } catch (error) {
    console.error('Error deleting teammate:', error);
    alert('There was an error deleting the teammate.');
  }
};
  const openDeleteModal = (userId) => {
    setCurrentUserId(userId);  // Set the current user ID to the ID of the user to be deleted
    setShowDeleteTeammate(true);  // Show the modal
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setShowDeleteTeammate(false);  // Close the modal
    setCurrentUserId(null);  // Reset the current user ID
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div>
        <div className='NavBar' style={{ display:'flex', flexDirection:'column', width:'8%', alignItems:'center', gap:20, height:985,borderRight:'1px solid lightgrey',backgroundColor:'#FAFBFC',width:90}}>
            <img src="./cloud.png" alt="" style={{ marginLeft:20, marginTop:10}}/>
            <button onClick={() => navigate('/dashboard')} style={{ marginLeft:20, marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}>
                <img src="./home.png" alt="" style={{height:25, width:25, marginLeft:-6}}/>
            </button>
            <button style={{ marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}>
                <img src="./messages.png" alt="" style={{height:30, width:50,marginLeft:-10}} />
            </button>
            <button onClick={() => navigate('/chart')} style={{ marginLeft:20, marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}>
                <img src="./analytics.png" alt="" style={{height:20, width:20}} />
            </button>
            <button onClick={() => navigate('/chatbot')} style={{marginLeft:20, marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}>
                <img src="./chatRobot.png" alt="" style={{height:20, width:20}} />
            </button>
            <button onClick={() => navigate('/teams')} style={{ marginLeft:20, marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}>
                <img src="./team.png" alt="" style={{height:20, width:20}} />
            </button>
            <button style={{ marginLeft:20, marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}>
                <img src="./settings.png" alt="" style={{height:20, width:20}} />
            </button>
            <img src="./profile.png" alt="" style={{height:25, width:25, marginLeft:20, marginTop:400}}/>
        </div>
      </div>

      <div>
        <h3 style={{ color: '#6A6B70', paddingLeft: 30 }}>Team</h3>

        {/* Team Members */}
      <table style={{ width: '93vw', borderCollapse: 'collapse', color: '#6A6B70' }}>
        <thead>
          <tr style={{  height: 40, borderTop: '1px solid lightgrey', borderBottom: '1px solid lightgrey' }}>
            <th style={{ paddingLeft: 20, textAlign: 'left' }}>Profile</th>
            <th style={{ textAlign: 'left' }}>Username</th>
            <th style={{ textAlign: 'left' }}>Phone</th>
            <th style={{ textAlign: 'left' }}>Email</th>
            <th style={{ textAlign: 'left' }}>Role</th>
            <th style={{ textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id} style={{ height: 50, borderBottom: '0.5px solid lightgrey' }}>
              <td style={{ paddingLeft: 20 }}>
                <img src="./ManImg1.png" alt="" style={{ height: 20, width: 20 }} />
              </td>
              <td style={{ paddingLeft: 20, }}>{member.username}</td>
              <td>9109876543</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
              <td>
                
                  <img     
                  onClick={() => navigate(`/settings/${member._id}`)}              
                    src="./editImg.png"
                    alt="Edit"
                    style={{ height: 20, width: 20, cursor: 'pointer',backgroundColor:'none',border:'none' }}
                  />
            
                <img
                  onClick={() => openDeleteModal(member._id)}
                  src="./deleteImg.png"
                  alt="Delete"
                  style={{ height: 20, width: 20, marginLeft: 10, cursor: 'pointer' }}
                />
              </td>

            </tr>
            
          ))}
        </tbody>
      </table>


        {/* Add Team Member Button */}
        <div>
          <button
            onClick={() => setShowAddTeammate(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              backgroundColor: '#184E7F',
              color: 'white',
              padding: 10,
              position: 'relative',
              left: '88%',
              borderRadius: 10,
              top:40,
              cursor: 'pointer',
            }}
          >
            <img src="./circle-plus.png" alt="" />
            <span>Add Team Member</span>
          </button>

          {/* Modal Form */}
          {showAddTeammate && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '44%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 20,
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                width: 800,
                height: 540,
                textAlign: 'center',
                zIndex: 10,
              }}
            >
              <div>
                <h1 style={{ color: '#6A6B70', textAlign: 'left', fontSize: 30, padding: 10 }}>
                  Add Team members
                </h1>
                <p style={{ textAlign: 'left', fontSize: 13, padding: 10 }}>
                  Talk with colleagues in a group chat. Messages in this group are only visible to it's
                  participants. New <br /> teammates may only be invited by the administrators.
                </p>
                <form onSubmit={handleSave} style={{ textAlign: 'left', padding: 10 }}>
                  <label>User name</label>
                  <br />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    style={{
                      width: '98%',
                      borderRadius: 5,
                      height: 30,
                      border: '1px solid lightgrey',
                      marginTop: 10,
                      paddingLeft: 10,
                    }}
                  />
                  <br />
                  <br />
                  <label>Email ID</label>
                  <br />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email ID"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      width: '98%',
                      borderRadius: 5,
                      height: 30,
                      border: '1px solid lightgrey',
                      marginTop: 10,
                      paddingLeft: 10,
                    }}
                  />
                  <br />
                  <br />
                  <label>Designation</label>
                  <br />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    style={{
                      width: '98%',
                      borderRadius: 5,
                      height: 35,
                      border: '1px solid lightgrey',
                      marginTop: 10,
                      paddingLeft: 10,
                    }}
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                  <br /><br />
                  <label>Password</label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{
                      width: '98%',
                      borderRadius: 5,
                      height: 30,
                      border: '1px solid lightgrey',
                      marginTop: 10,
                      paddingLeft: 10,
                    }}
                  />
                  <br />
                  <br />
                  <div style={{ display: 'flex', gap: 10, float: 'right' }}>
                    <button
                      type="button"
                      onClick={handleCancel}
                      style={{
                        color: '#AFAFAF',
                        backgroundColor: '#F6F8FA',
                        padding: 10,
                        border: 'none',
                        width: 150,
                        borderRadius: 15,
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{
                        color: 'white',
                        backgroundColor: '#184E7F',
                        padding: 10,
                        border: 'none',
                        width: 150,
                        borderRadius: 15,
                        cursor: 'pointer',
                      }}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <div>
        {showDeleteTeammate && (
            <div style={{
            position: 'absolute',
            left: '80%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 20,
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            width: 500,
            height: 150,
            textAlign: 'center',
            zIndex: 10
        }}>
          <div style={{ marginBottom: 20, fontSize: 14 ,float:'left'}}>
            this teammate will be deleted
          </div>

                     <div style={{ display: 'flex', gap: 10,marginTop:100,marginLeft:200 }}>
                    <button
                     onClick={closeDeleteModal}
                      style={{
                        color: '#AFAFAF',
                        backgroundColor: '#F6F8FA',
                        padding: 10,
                        border: 'none',
                        width: 150,
                        borderRadius: 15,
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={deleteTeammate(currentUserId)}
                      style={{
                        color: 'white',
                        backgroundColor: '#184E7F',
                        padding: 10,
                        border: 'none',
                        width: 150,
                        borderRadius: 15,
                        cursor: 'pointer',
                      }}
                    >
                      Confirm
                    </button>
                  </div>
        </div>
        )}
        </div>
        
      </div>
    </div>
  );
};

export default Teams;
