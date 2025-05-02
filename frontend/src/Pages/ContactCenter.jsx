
import React from 'react';
import { useState,useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../config';

const ContactCenter = () => {
  const [username, setUsername] = useState('');
 const [showTeammates, setShowTeammates] = useState(false);
  const [showTicketStatus, setShowTicketStatus] = useState(false);
  const [showResolvedBox, setShowResolvedBox] = useState(false);
  const [showAssignBox, setShowAssignBox] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [members, setMembers] = useState([]);
  const [showChatBox, setShowChatBox] = useState(false);
  const [showAssignChatBox, setShowAssignChatBox] = useState(false);
  

  const [selectedTeammate, setSelectedTeammate] = useState(null); // stores clicked teammate

  const [ticket, setTicket] = useState({
  messages: [] // Initialize messages as an empty array
});

  const [adminReply, setAdminReply] = useState('');
  const { ticketId } = useParams(); // Get the ticketId from the URL

  useEffect(() => {
  const fetchTicket = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/landinguser/tickets/${ticketId}`);
      setSelectedTicket(res.data); 
    } catch (err) {
      console.error('Failed to fetch ticket', err);
    }
  };

  fetchTicket();
}, [ticketId]);

  const messagesEndRef = React.useRef(null);

useEffect(() => {
    // Retrieve the user object from localStorage
    const userFromStorage = localStorage.getItem('user');

    if (userFromStorage) {
      // Parse the user object
      const parsedUser = JSON.parse(userFromStorage);
      
      // Extract and set the username
      setUsername(parsedUser.username);
    }
  }, []);



  useEffect(() => {
    // Fetch the members data when the component mounts
    axios.get(`${apiUrl}/api/auth/members`)
      .then(response => {
        setMembers(response.data);  // Set the members data
      })
      .catch(error => {
        console.error('Error fetching members:', error);
      });
  }, []);


  useEffect(() => {
  const fetchTickets = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      let url = '';

      if (user?.role === 'admin') {
        url = `${apiUrl}/api/landinguser/tickets`;
      } else {
        url = `${apiUrl}/api/auth/tickets/assigned-to`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTickets(response.data); // Set the tickets
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  fetchTickets();
}, []);


  // Fetch ticket details when ticketId changes
 useEffect(() => {
    // Fetch tickets and members when the component mounts
    axios.get(`${apiUrl}/api/landinguser/tickets`)
      .then(response => setTickets(response.data))
      .catch(error => console.error("Error fetching tickets:", error));

    axios.get(`${apiUrl}/api/auth/members`)
      .then(response => setMembers(response.data))
      .catch(error => console.error("Error fetching members:", error));
  }, []);

  // Auto scroll to the latest message when ticket updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ticket]);
``
const handleTicketClick = (ticket) => {
  setShowAssignChatBox(false);
  setShowChatBox(false);
  setSelectedTicket(ticket); // Set the clicked ticket to selectedTicket
  setTicket(ticket);
  console.log(selectedTicket);
};


  
 const sendAdminMessage = async () => {
    if (!adminReply) {
      alert("Please type a message before sending.");
      return;
    }

    // Check if selectedTicket is null or undefined
    if (!selectedTicket) {
      alert("No ticket selected.");
      return;
    }

    const newMessage = {
      sender: "admin", // Admin message
      text: adminReply,
      timestamp: new Date().toISOString(),
    };

    try {
      // Add new admin message to the ticket's state
      updateTicketMessages(newMessage);

      // Send message to the backend
      await axios.post(
        `${apiUrl}/api/landinguser/reply/${selectedTicket._id}`, // Ensure selectedTicket is not null
        { text: adminReply }
      );

      // Fetch updated messages for the selected ticket
      const response = await axios.get(
        `${apiUrl}/api/landinguser/messages?email=${selectedTicket.email}&phone=${selectedTicket.phone}`
      );

      // Update the UI with the new messages
      // setMessages(response.data.messages);
      console.log("Updated messages:", response.data.messages); 

      // Clear the admin reply input
      setAdminReply("");
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending admin message:", error);
      alert("Failed to send message.");
    }
};

const handleConfirmResolve = async () => {
  try {
    if (!ticket) {
      console.error("Ticket not found!");
      return;
    }

    await axios.put(`${apiUrl}/api/landinguser/update-status/${ticket._id}`, {
      status: 'resolved'
    });

    // Update UI state
    setTicket(prev => ({ ...prev, status: 'resolved' }));
    setShowChatBox(true);
    setShowTicketStatus(false);
    setShowResolvedBox(false);
  } catch (err) {
    console.error("Error updating status:", err);
  }
};



  const handleConfirmAssign = async () => {
     try {
    if (!ticket) {
      console.error("Ticket not found!");
      return;
    }

    await axios.put(`${apiUrl}/api/landinguser/assign/${ticket._id}`, {
       memberId: selectedTeammate._id 
    });
    alert(`Assigned to ${selectedTeammate.username}`);
    setShowAssignChatBox(true);
    setShowAssignBox(false);
    setSelectedTeammate(null);
  } catch (err) {
    console.error("Error Assigning ticket:", err);
  }
};;

// The function for updating ticket messages in the state
const updateTicketMessages = (newMessage) => {
  setTicket(prevTicket => ({
    ...prevTicket,
    messages: [...prevTicket.messages, newMessage]  // Add the new message to the messages array
  }));
};



  if (!ticket) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ display: 'flex', width: '98.5vw', height: '93vh', overflow: 'visible' }}>

      {/* NavBar - 100px */}
    <div>
        <div className='NavBar' style={{ display:'flex', flexDirection:'column', width:'8%', alignItems:'center', gap:20, height:985,borderRight:'1px solid lightgrey',backgroundColor:'#FAFBFC',width:90}}>
            <img src="/cloud.png" alt="" style={{ marginLeft:20, marginTop:10}}/>
            <button style={{ marginLeft:20, marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}><img src="/home.png" alt="" style={{height:25, width:25, marginLeft:-6}}/></button>
            <button onClick={() => navigate('/contact-center')} style={{ marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}>
                <img src="/contactCenter2.png" alt="" style={{height:45, width:80}} />
            </button>
            <button onClick={() => navigate('/chart')} style={{ marginLeft:20, marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}>
                <img src="/analytics.png" alt="" style={{height:20, width:20}} />
            </button>
            <button onClick={() => navigate('/chatbot')} style={{marginLeft:20, marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}>
                <img src="/chatRobot.png" alt="" style={{height:20, width:20}} />
            </button>
            <button onClick={() => navigate('/teams')} style={{ marginLeft:20, marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}>
                <img src="/team.png" alt="" style={{height:20, width:20}} />
            </button>
            <button style={{ marginLeft:20, marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}>
                <img src="/settings.png" alt="" style={{height:20, width:20}} />
            </button>
            <img src="/profile.png" alt="" style={{height:25, width:25, marginLeft:20, marginTop:400}}/>
        </div>
      </div>

      {/* First chat panel - 300px */}
      <div className='Chats' style={{ width: 300, borderRight: '1px solid lightgrey', height: 980, backgroundColor: '#FAFBFC', marginTop: -10 }}>
        <h3 style={{color:'#6A6B70', paddingLeft:20}}>Contact Center</h3>
        <h5 style={{color:'#6A6B70', marginTop:100,paddingLeft:10}}>Chats</h5>
        <hr style={{marginTop:-20, border:'1px solid lightgrey'}}/>
    {tickets.map((ticket, index) => (
  <div key={index} className='ChatsArray'>
    <div
      className='chatBox'
      onClick={() => handleTicketClick(ticket, index + 1)}
      style={{
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        padding: 20,
        backgroundColor:  '#EFEFEF',
        borderRadius: 30,
        height: 10,
        margin: 10,
      }}
    >
      <img
        className='ProfileImg'
        src="/ManImg1.png"
        alt=""
        style={{ height: 30, width: 30 }}
      />
      <div>
        <div className='PersonName' style={{ fontSize: 15 }}>
          Chat {index + 1}
        </div>
        <div className='ChatText' style={{ fontSize: 10, paddingTop: 5 }}>
          {ticket.message}
        </div>
      </div>
    </div>
  </div>
))}

      </div>
    
      {/* Remaining space split between two panels */}
      <div style={{ display: 'flex', flex: 1, height: 900 }}>
        <div className='ChatTab' style={{ flex: 1, borderLeft: '1px solid lightgrey', borderRight: '1px solid lightgrey', marginTop: -10 }}>
          <div style={{display:'flex', gap:20, alignItems:'center', justifyContent:'space-between'}}>
            <h3 style={{color:'#6A6B70', paddingLeft:20}}>Ticket# {ticket.ticketNumber}</h3>
            <Link to="/dashboard"><button style={{ height: 50, width: 50, marginLeft: 20, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
                <img src="/home.png" alt="" style={{ height: 25, width: 25, marginLeft: -5 }} />
            </button></Link>
          </div>
          <hr />
            

          {showChatBox  ? (
            <>
            <div style={{ display: 'flex', position: 'relative', top: 700 }}>
                <hr style={{ width: 200 }} />
                March 7, 2025
                <hr style={{ width: 200 }} />
              </div>
            <div style={{ textAlign: 'center', color: 'grey', marginTop: 20,position:'absolute',bottom:40,left:'35%',fontSize:20 }}>
              This chat has been closed
            </div>
            </>
            
          ): showAssignChatBox  ? (
            <>
            <div style={{ display: 'flex', position: 'relative', top: 700 }}>
                <hr style={{ width: 200 }} />
                March 7, 2025
                <hr style={{ width: 200 }} />
              </div>
            <div style={{ textAlign: 'center', color: 'grey', marginTop: 20,position:'absolute',bottom:40,left:'28%',fontSize:15 }}>
              This chat is assigned to new team member. you no longer have access 
            </div>
            </>
          ) : (
             <>
             <div style={{ display: 'flex', position: 'relative', top: 400 }}>
                <hr style={{ width: 200 }} />
                March 7, 2025
                <hr style={{ width: 200 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column',position:'relative',top:400 }}>
              <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
                <div>
                    {selectedTicket ? (
                        <>
                        <div className='chatBox' style={{ display: 'flex', gap: 20, alignItems: 'center', padding: 20, height: 10, margin: 10 }}>
                          <img className='ProfileImg' src="/ManImg1.png" alt="" style={{ height: 30, width: 30 }} />
                          <div>
                            <div className='PersonName' style={{ fontSize: 15 }}>Chat</div>
                            <div className='ChatText' style={{ fontSize: 12, paddingTop: 5 }}></div>
                          </div>
                        </div>
                      </>
                        ) : (
                    <>
                    <div className='chatBox' style={{ display: 'flex', gap: 20, alignItems: 'center', padding: 20, height: 10, margin: 10 }}>
                      <img className='ProfileImg' src="/profile.png" alt="" style={{ height: 30, width: 30 }} />
                      <div>
                        <div className='PersonName' style={{ fontSize: 15 }}>Chat 1</div>
                        <div className='ChatText' style={{ fontSize: 12, paddingTop: 5 }}></div>
                    </div>
                    </div>
                    </>
                        )}
                        </div>

                    <div style={{ maxHeight: '500px', overflowY: 'auto', marginBottom: '20px', padding: '10px' }}>
                    {ticket?.messages?.map((message, index) => (
                      
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: message.sender === 'admin' ? 'flex-end' : 'flex-start',
                        marginBottom: '10px'
                      }}>
                        <div style={{
                          background: message.sender === 'admin' ? '#5E9BD5' : '#E7E7E7',
                          color: message.sender === 'admin' ? 'white' : 'black',
                          padding: '10px 15px',
                          borderRadius: '20px',
                          maxWidth: '60%',
                          fontSize: '14px'
                        }}>
                          {message.text}
                        </div>
                      </div>
                    ))}
      {/* Scroll to the bottom of the messages */}
                <div ref={messagesEndRef} />
              </div>

              </div>

          {/* Admin reply box */}
          <div style={{ position: 'fixed', bottom: -12, width: '37.5%' }}>
              <textarea
                value={adminReply}
                onChange={(e) => setAdminReply(e.target.value)}
                style={{
                  width: '96%',
                  height: 80,
                  borderRadius: 10,
                  border: '1px solid lightgrey',
                  marginBottom: 10,
                  padding: 10,
                  resize: 'none',
                  fontSize: 14
                }}
                  placeholder="Type your message..."
                ></textarea>

                {/* Send Button */}
                <img
                  onClick={sendAdminMessage}
                  src="/SendText.png"
                  alt="Send"
                  style={{ height: 25, width: 25, position: 'absolute', bottom: 55, left: 590, cursor: 'pointer' }}
                />
                          </div>
                        </div>
             </>
             
               )}
        </div>

        <div className='ProfileTab' style={{ flex: 1, borderRight: '1px solid lightgrey', backgroundColor: '#FAFBFC', marginTop: -10,paddingLeft:20,height:980 }}>
          <div className='chatBox' style={{ display: 'flex', gap: 20, alignItems: 'center', borderRadius: 30, height: 50 }}>
            <img className='ProfileImg' src="/ManImg1.png" alt="" style={{ height: 30, width: 30 }} />
            <div>
            <div className='PersonName' style={{ fontSize: 15 }}>Chat 2</div>
            </div>
        </div>
            <h5 style={{color:'#184E7F'}}>Details</h5>
   <div>
    {selectedTicket ? (
        <>
            <div style={{display:'flex', gap:30, alignItems:'center', borderRadius:15, height:20, padding:10, backgroundColor:'whitesmoke', marginBottom:5, width:'92%'}}>
                <img src="/contactImg.png" alt="" style={{ height: 20, width: 20, marginRight: 10 }} />
                <div style={{color:'#808080'}}>{selectedTicket.name} </div>
            </div>
            <div style={{display:'flex', gap:30, alignItems:'center', borderRadius:15, height:20, padding:10, backgroundColor:'whitesmoke', marginBottom:5, width:'92%'}}>
                <img src="/callImg.png" alt="" style={{ height: 15, width: 15, marginRight: 10 }} />
                <div style={{color:'#808080'}}>{selectedTicket.phone}</div>
            </div>
            <div style={{display:'flex', gap:30, alignItems:'center', borderRadius:15, height:20, padding:10, backgroundColor:'whitesmoke', marginBottom:5, width:'92%'}}>
                <img src="/lets-icons_message-light.png" alt="" style={{ height: 20, width: 20, marginRight: 10 }} />
                <div style={{color:'#808080'}}>{selectedTicket.email}</div>
            </div>
        </>
    ) : (
        <>
            <div style={{display:'flex', gap:30, alignItems:'center', borderRadius:15, height:20, padding:10, backgroundColor:'whitesmoke', marginBottom:5, width:'92%'}}>
                <img src="/contactImg.png" alt="" style={{ height: 20, width: 20, marginRight: 10 }} />
                <div style={{color:'#808080'}}>-select a ticket-</div>
            </div>
            <div style={{display:'flex', gap:30, alignItems:'center', borderRadius:15, height:20, padding:10, backgroundColor:'whitesmoke', marginBottom:5, width:'92%'}}>
                <img src="/callImg.png" alt="" style={{ height: 15, width: 15, marginRight: 10 }} />
                <div style={{color:'#808080'}}>-select a ticket-</div>
            </div>
            <div style={{display:'flex', gap:30, alignItems:'center', borderRadius:15, height:20, padding:10, backgroundColor:'whitesmoke', marginBottom:5, width:'92%'}}>
                <img src="/lets-icons_message-light.png" alt="" style={{ height: 20, width: 20, marginRight: 10 }} />
                <div style={{color:'#808080'}}>-select a ticket-</div>
            </div>
        </>
    )}
</div>



            <h5 style={{color:'#184E7F'}}>Teammates</h5>
            <div style={{display:'flex', gap:20, alignItems:'center', gap:20,borderRadius:15, height:20, padding:10, backgroundColor:'whitesmoke',marginBottom:10,width:'92%',position:'relative'}}>
                <img src="/ManImg2.png" alt="" style={{ height: 20, width: 20, marginRight: 10 }} />
                <div style={{color:'#808080'}}>{username}</div>
                <img src="/downArrow.png" alt="" onClick={() => setShowTeammates(!showTeammates)} style={{height: 10,width: 15,position: 'absolute',top: 15,right: 15,cursor: 'pointer'}}/>

            </div>
            {/* Assign Teammates */}
        
{/* Teammates List */}
{showTeammates && (
  <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 30, overflow: 'hidden', backgroundColor: 'whitesmoke', width: '92%', marginTop: 20 }}>
    {members.map(member => (
      <div 
        key={member._id}
        onClick={() => {
          setSelectedTeammate(member); // Set selected teammate
          setShowAssignBox(true); // Show the Assign Box
          setShowTeammates(false); // Optionally hide teammates list
        }}
        className='Teammates' 
        style={{ display: 'flex', gap: 20, alignItems: 'center', padding: 10, borderBottom: '1px solid lightgrey' }}
      >
        <img src="/profile.png" alt="" style={{ height: 20, width: 20, marginRight: 10 }} />
        <div style={{ color: '#808080' }}>{member.username}</div>
      </div>
    ))}
  </div>
)}

{/* Assign Box */}
{showAssignBox && (
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
    <div style={{ marginBottom: 20, fontSize: 14 }}>
      Chat would be assigned to <strong>{selectedTeammate?.username}</strong>?
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
      <button
        onClick={() => setShowAssignBox(false)}
        style={{ flex: 1, height: 30, borderRadius: 10, border: '1px solid lightgrey', backgroundColor: 'white', cursor: 'pointer', marginTop: 80, width: 50 }}
      >
        Cancel
      </button>
      <button
        onClick={handleConfirmAssign}
        style={{ flex: 1, height: 30, borderRadius: 10, border: 'none', backgroundColor: '#184E7F', color: 'white', cursor: 'pointer', marginTop: 80, width: 50 }}
      >
        Confirm
      </button>
    </div>
  </div>
)}
            <div style={{display:'flex', gap:20, alignItems:'center', gap:30,borderRadius:15, height:20, padding:10, backgroundColor:'whitesmoke',marginBottom:5,width:'92%',position:'relative',marginTop:10}}>    
                <img src="/TicketConf.png" alt="" style={{ height: 15, width: 15, marginRight: 10 }} />
                <div style={{color:'#808080'}}>Ticket Status</div>
                <img src="/downArrow.png" alt="" onClick={() => setShowTicketStatus(!showTicketStatus)} style={{ height: 10, width: 15, position: 'absolute', top: 15, right: 15, cursor: 'pointer' }}/>
            </div>

            {showTicketStatus && (
        <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 30, overflow: 'hidden', backgroundColor: 'whitesmoke', width: '92%', marginTop: 20 }}>
          
          <div
            className='TicketFinalStatus'
            style={{ display: 'flex', padding: 10, borderBottom: '1px solid lightgrey', cursor: 'pointer' }}
            onClick={() => setShowResolvedBox(true)}
          >
            <div style={{ color: '#808080', paddingLeft: 20 }}>Resolved</div>
          </div>

          <div
            className='TicketFinalStatus'
            style={{ display: 'flex', padding: 10, cursor: 'pointer' }}
            onClick={() => setShowResolvedBox(true)}
          >
            <div style={{ color: '#808080', paddingLeft: 20 }}>Unresolved</div>
          </div>
        </div>
      )}
     
      {showResolvedBox && (
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
          <div style={{ marginBottom: 20, fontSize: 14 }}>
            Chat will be closed
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <button
              onClick={() => setShowResolvedBox(false)}
              style={{ flex: 1, height: 30, borderRadius: 10, border: '1px solid lightgrey', backgroundColor: 'white', cursor: 'pointer', marginTop: 80 }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmResolve}
              style={{ flex: 1, height: 30, borderRadius: 10, border: 'none', backgroundColor: '#184E7F', color: 'white', cursor: 'pointer', marginTop: 80 }}
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

export default ContactCenter;
