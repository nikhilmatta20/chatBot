
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../config';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const Chart = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

 
   useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/auth/missed-chats/daily`);  // Update API endpoint for daily stats
        const stats = await res.json();

        const formatted = stats.map(item => {
          const label = `${item._id.year}-${item._id.month}-${item._id.day}`;
          return {
            label,
            totalTickets: item.totalTickets,
            resolvedPercentage: item.resolvedPercentage,
            avgReplyTime: item.avgReplyTime,
            day: item._id.day,
            month: item._id.month,
            year: item._id.year
          };
        });

        setData(formatted);
        if (formatted.length > 0) setSelected(formatted[0]);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    fetchStats();
  }, []);

  const formatTime = (ms) => {
    if (ms < 0) return "N/A"; // Handle negative values
    const hrs = Math.floor(ms / 3600000);
    const mins = Math.floor((ms % 3600000) / 60000);
    return `${hrs}h ${mins}m`;
  };
  const handleClick = (data, index) => {
    setSelected(data.activePayload[0].payload);
  };

  return (
    <div style={{ display: 'flex', gap: 30 }}>
      <div>
        <div className='NavBar' style={{ display:'flex', flexDirection:'column', width:'8%', alignItems:'center', gap:20, height:985,borderRight:'1px solid lightgrey',backgroundColor:'#FAFBFC',width:90}}>
            <img src="./cloud.png" alt="" style={{ marginLeft:20, marginTop:10}}/>
            <button onClick={() => navigate('/dashboard')} style={{ marginLeft:20, marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}><img src="./home.png" alt="" style={{height:25, width:25, marginLeft:-6}}/></button>
            <button  style={{ marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}>
                <img src="./messages.png" alt="" style={{height:30, width:50,marginLeft:-10}} />
            </button>
            <button  style={{ marginLeft:20, marginTop:10, padding:0, border:'none', background:'none', cursor:'pointer'}}>
                <img src="./chart.png" alt="" style={{height:35, width:35}} />
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
      <h3>Analytics</h3>
      <h3>Missed Chats</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          onClick={handleClick}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis/>
          <Tooltip />
          <Line type="monotone" dataKey="totalTickets" stroke="#00D907" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      {selected && (
        <div style={{ marginTop: '20px', padding: '15px',width:1000 }}>
        <div style={{display: 'flex', alignItems:'center',justifyContent:'space-between'}}>
            <h2 style={{color:'#00D907'}}>Average Reply Time</h2>  
            <h1 style={{color:'#00D907'}}><strong></strong>  {formatTime(selected.avgReplyTime)}</h1>
          </div>
          <p style={{marginTop:-5}}>This metric Shows the total number of chats for all Channels for the selected the selected period </p>
          
          <div style={{display: 'flex', alignItems:'center',justifyContent:'space-between'}}>
            <h2 style={{color:'#00D907'}}>Resolved Tickets</h2>  
            <div style={{color:'#00D907'}}>{selected.resolvedPercentage.toFixed(2)}%</div>
          </div>
          <p style={{marginTop:-5}}>This metric Shows the total number of chats for all Channels for the selected the selected period </p>
        
          <div style={{display: 'flex', alignItems:'center',justifyContent:'space-between'}}>
            <h2 style={{color:'#00D907'}}>Total Chats</h2>  
            <h1 style={{color:'#00D907'}}><strong></strong> {selected.totalTickets} Chats</h1>
          </div>
          <p style={{marginTop:-5}}>This metric Shows the total number of chats for all Channels for the selected the selected period </p>
        </div>
      )}</div>
    </div>
  );
};

export default Chart;
