import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'; 
import { Link ,useNavigate} from 'react-router-dom'; 
import * as jwt_decode from 'jwt-decode';
const token = localStorage.getItem('token');
import { apiUrl } from '../config';



const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');

  if (token) {
  try {
    const decodedToken = jwt_decode(token); 
    console.log(decodedToken); 
    const username = decodedToken.username; 
    console.log(username); 
  } catch (error) {
    console.error("Error decoding token:", error);
  }
}

 
  useEffect(() => {
  const fetchTickets = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      let url = '';

      if (user.role === 'admin') {
        if (selectedFilter === 'resolved') {
          url = `${apiUrl}/api/landinguser/tickets/resolved`;
        } else if (selectedFilter === 'unresolved') {
          url =  `${apiUrl}/api/landinguser/tickets/unresolved`;
        } else {
          url = `${apiUrl}/api/landinguser/tickets`;
        }
      } else {
        // Member should only see assigned tickets
        url = `${apiUrl}/api/auth/tickets/assigned-to`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  fetchTickets();
}, [selectedFilter]);


  const handleFilterClick = (type) => {
    setSelectedFilter(type);
  };

  const searchTickets = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/landinguser/tickets?search=${searchTerm}`);
      setTickets(response.data);  // Update the tickets with the filtered data
    } catch (error) {
      console.error("Error searching tickets:", error);
    }
  };


  return (
    <div style={{ display: 'flex', gap: 30 }}>
    <div className='NavBar' style={{ display:'flex', flexDirection:'column', width:'8%', alignItems:'center', gap:30, height:985,marginTop:-10,marginLeft:-10,borderRight:'1px solid lightgrey',backgroundColor:'#FAFBFC'}}>
            <img src="./cloud.png" alt="" style={{ marginLeft:20, marginTop:10}}/>
            <button style={{ marginLeft:20, marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}><img src="./dashboard.png" alt="" style={{height:35, width:45, marginLeft:-8}}/></button>
            <button  onClick={() => navigate('/contact-center')} style={{ marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}>
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

      <div style={{width:'80%'}}>
        <h1 style={{ color: '#6A6B70' }}>Dashboard</h1>
        <div style={{ display: 'flex', gap: 20 }}>
          <input
            type="text"
            placeholder='Search for ticket'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: 300, height: 40, borderRadius: 5, border: '1px solid lightgrey', marginTop: 20, marginBottom: 20, position: 'relative', paddingLeft: 50, backgroundColor: '#E7E7E7', letterSpacing: 1
            }} />
          <img src="./search.svg" alt="" 
          onClick={searchTickets}
          style={{ height: 15, width: 15, marginLeft: 20, marginTop: 20, borderColor: 'grey', position: 'absolute', top: 104,cursor:'pointer' }} />
        </div>

        <div style={{display:'flex', gap:20, marginTop:20, alignItems:'center'}}>
                <button onClick={() => handleFilterClick('all')} style={{ padding:0, border:'none', background:'none', cursor:'pointer'}}>
                    <img src="./AllTickets.png" alt="" style={{}} />
                </button>
                <button onClick={() => handleFilterClick('resolved')} style={{border:'none', background:'none',color:'#888888', fontSize:15,cursor:'pointer'}}>Resolved</button>
                <button onClick={() => handleFilterClick('unresolved')} style={{border:'none', background:'none',color:'#888888',fontSize:15,cursor:'pointer'}}>Unresolved</button>
            </div>

        <hr style={{ width: 1300, marginTop: 20, marginBottom: 20, border: '1px solid lightgrey' }} />

       {tickets.map((ticket, index) => (
          <div key={index} style={{ border: '1px solid lightgrey', borderRadius: 5, marginTop: 20, paddingLeft: 20, height: 300,width:1500 }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <div className='color-box' style={{
                backgroundColor: '#F8A534', height: 30, width: 30, borderRadius: '50%', marginTop: 20, marginBottom: 20
              }}></div>
              
              {/* Show the custom ticket number */}
              <div style={{fontSize:14,fontWeight:'bolder',textWrap:'nowrap'}}>Ticket# {ticket.ticketNumber}</div>
              <div className='Time' style={{ paddingRight: 50, color: '#888888', fontSize: 10,paddingLeft: 1120,textWrap:'nowrap' }}>
                {/* Use moment.js to format the createdAt value */}
                posted at {moment(ticket.createdAt).format('hh:mm A')}
              </div>
            </div>

            <div style={{ gap: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 80 }}>
              <div className='chatText' style={{ paddingLeft: 50 }}>{ticket.message}</div>
              <div className='TimeAgo' style={{ paddingRight: 80 }}>10:00</div>
            </div>

            <hr style={{ marginTop: 20, marginBottom: 20,marginLeft:'-10px', border: '1px solid lightgrey' }} />

            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <img src="./ManImg1.png" alt="" style={{ height: 30, width: 30, marginTop: 20, marginBottom: 20 }} />
              <div style={{ lineHeight: '14px',position:'relative' }}>
                <p style={{ fontSize: 12, margin: 0,color:'#6A6B70' }}>{ticket.name}</p>
                <p style={{ fontSize: 10, margin: 0,color:'#6A6B70' }}>{ticket.email}</p>
                <p style={{ fontSize: 10, margin: 0,color:'#6A6B70' }}>{ticket.phone}</p>
              </div>
              <Link 
                to={`/contact-center/${ticket._id}`} 
                style={{ fontSize: 13, position: 'absolute', right: 120, textDecoration: 'none' }}
              >
                Open Ticket
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Dashboard;
 