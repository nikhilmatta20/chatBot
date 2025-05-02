import React, { useContext } from 'react'
import ChatBotWidget from '../components/ChatBotWidget';
import TimerInsideDiv from '../components/ChatTimer';
import { ColorContext } from '../context/ColorContext';
import WelcomeMessage from '../components/WelcomeMessage';
import { useNavigate } from 'react-router-dom';

    
const ChatBot = () => {

  const { color, setColor } = useContext(ColorContext); 
  const { colorOfChat, setColorOfChat } = useContext(ColorContext);
  const { welcomeText1, setWelcomeText1, welcomeText2, setWelcomeText2,welcomeText3, setWelcomeText3 } = useContext(ColorContext);
  const navigate = useNavigate();

  return (
    <>
        <div style={{ display: 'flex', width: '90vw', height: '100vh',gap:30 }}>
            <div
            className="navBar"
            id='navBar'
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
            <img src="./cloud.png" alt="" style={{ height: 50, width: 50, marginLeft: 20, marginTop: 10 }} />
            <button onClick={() => navigate('/dashboard')} style={{ height: 50, width: 50, marginLeft: 20, marginTop: 10, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
            <img src="./home.png" alt="" style={{ height: 25, width: 25, marginLeft: -5 }} />
            </button>
            <button style={{ height: 50, width: 50, marginTop: 10, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
            <img src="./messages.png" alt="" style={{ height: 30, width: 60, marginLeft: -14 }} />
            </button>
            <button onClick={() => navigate('/chart')} style={{ height: 30, width: 30, marginLeft: 20, marginTop: 10, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
            <img src="./analytics.png" alt="" style={{ height: 20, width: 20 }} />
            </button>
            <button style={{ height: 30, width: 30, marginLeft: 20, marginTop: 10, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
            <img src="./chatBot.png" alt="" style={{ height: 30, width: 40,marginLeft:-6 }} /> 
            </button>
            <button onClick={() => navigate('/teams')} style={{ height: 30, width: 30, marginLeft: 20, marginTop: 10, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
            <img src="./team.png" alt="" style={{ height: 20, width: 20 }} />
            </button>
            <button style={{ height: 30, width: 30, marginLeft: 20, marginTop: 10, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
            <img src="./settings.png" alt="" style={{ height: 20, width: 20 }} />
            </button>
            <img src="./profile.png" alt="" style={{ height: 30, width: 30, marginLeft: 20, marginTop: 520 }} />
        </div>
        <div>
          <h3 style={{ color: '#6A6B70', paddingLeft: 20 }}>Chat Bot</h3>
          
          {/* Wrap the ChatBotWidget with CustomizationProvider */}
            
            <ChatBotWidget />
            
              
              <div className='welcometext' style={{marginLeft:300,marginTop:100,boxShadow:'0px 0px 5px #000000'}}>
                <WelcomeMessage />
              </div>
              
        </div>
        <div style={{marginLeft:200}} className='right-side'>
            <div className='chatHeaderColor' style={{height:160,width:300,marginTop:50,marginLeft:200,boxShadow:'0px 0px 10px #000000',borderRadius:25}}>
                <h6 style={{paddingLeft:20,paddingTop:20}}>Header Color</h6>
                <div style={{display:'flex',gap:10,marginLeft:20}}>
                    <div onClick={() => setColor('whitesmoke')} style={{backgroundColor:'#F6F7F5',height:30,width:30,borderRadius:50}}
                    ></div>
                    <div onClick={() => setColor('black')} style={{backgroundColor:'black',height:30,width:30,borderRadius:50}}
                    ></div>
                    <div onClick={() => setColor('#33475B')} style={{backgroundColor:'#33475B',height:30,width:30,borderRadius:50}}
                    ></div>
                </div>
                <div style={{display:'flex',gap:10,marginLeft:20,alignItems:'center',marginTop:20}}>
                    <div style={{backgroundColor:color,height:30,width:30,borderRadius:5}}></div>
                    <div style={{backgroundColor:'lightgrey',height:30,width:110,borderRadius:5,fontSize:8,paddingTop:8,paddingLeft:5}}>#33475B</div>
                </div>
            </div>


             <div style={{ height:160,width:300,marginTop:50,marginLeft:200,boxShadow:'0px 0px 10px #000000',borderRadius:25}}>
                <h6 style={{paddingLeft:20,paddingTop:20}}>Custom background Color</h6>
                <div style={{display:'flex',gap:10,marginLeft:20}}>
                    <div onClick={() => setColorOfChat('#FFFFFF')} style={{backgroundColor:'#FFFFFF',height:30,width:30,borderRadius:50}}></div>
                    <div onClick={() => setColorOfChat('black')} style={{backgroundColor:'black',height:30,width:30,borderRadius:50}}></div>
                    <div onClick={() => setColorOfChat('#EEEEEE')} style={{backgroundColor:'#EEEEEE',height:30,width:30,borderRadius:50}}></div>
                </div>
                <div style={{display:'flex',gap:10,marginLeft:20,alignItems:'center',marginTop:20}}>
                    <div style={{backgroundColor:colorOfChat,height:30,width:30,borderRadius:5}}></div>
                    <div style={{backgroundColor:'lightgrey',height:30,width:110,borderRadius:5,fontSize:8,paddingTop:8,paddingLeft:5}}>#EEEEEE</div>
                </div>
            </div>
           <div className='CustomiseWelcomeMessage' style={{backgroundColor:'#FFFFFF',height:160,width:300,marginTop:50,marginLeft:200,boxShadow:'0px 0px 10px #000000',borderRadius:25}}>
                <h6 style={{paddingLeft:20,paddingTop:20}}>Customize Welcome Message</h6>            
                <input
                type="text"
                value={welcomeText1}
                onChange={(e) => setWelcomeText1(e.target.value)}
                placeholder="Type welcome message"
                style={{
                    height: 30,
                    width: 200,
                    marginLeft: 10,
                    marginTop: 10,
                    backgroundColor: '#EEEEEE',
                    borderRadius: 5,
                    fontSize: 10,
                    paddingTop: 5,
                    paddingLeft: 10,
                    position: 'relative',
                    border: 'none',
                }}
                />

                <img src="./editPencil.png" alt="" style={{height:10,width:10,marginLeft:20,marginTop:20,cursor:'pointer',position:'absolute',bottom:420,right:450}}/>            
                <input
                type="text"
                value={welcomeText2}
                onChange={(e) => setWelcomeText2(e.target.value)}
                placeholder="Type welcome message"
                style={{
                    height: 30,
                    width: 200,
                    marginLeft: 8,
                    marginTop: 8,
                    backgroundColor: '#EEEEEE',
                    borderRadius: 5,
                    fontSize: 10,
                    paddingTop: 5,
                    paddingLeft: 10,
                    position: 'relative',
                    border: 'none',
                }}
                />

                <img src="./editPencil.png" alt="" style={{height:10,width:10,marginLeft:20,marginTop:20,cursor:'pointer',position:'absolute',bottom:368,right:450}}/>
            </div>
            <div style={{backgroundColor:'white',borderRadius:10, padding:10, width:190, height:210,width:280, marginTop:30,marginLeft:200,fontSize:10,boxShadow:'0px 0px 10px #000000'}}>
                    <p>Introduction Yourself</p>
                    <form action="" method="post">
                    <label htmlFor="" style={{color:'#C3C3C3',fontSize:8}}>Your Name</label><br /> <br/>
                    <input type="text" name="" id="" placeholder='Your name' style={{border:'none',fontSize:10}}/>
                    <hr style={{marginTop:-0.4, marginBottom:10}}/>
                    <label htmlFor="" style={{color:'#C3C3C3',fontSize:8}}>Your Phone</label><br /> <br/>
                    <input type='number' name="" id="" placeholder='+91 987654321' style={{border:'none',fontSize:10}}/>
                    <hr style={{ marginBottom:10}}/>
                    <label htmlFor="" style={{color:'#C3C3C3',fontSize:8}}>Your Email</label><br /> <br/>
                    <input type='email' name="" id="" placeholder='example@gmail.com' style={{border:'none',fontSize:10}}/>
                    <hr style={{ marginBottom:10}}/>
                    </form>
                    <button style={{backgroundColor:'#184E7F', color:'white', border:'none', borderRadius:5, width:250,marginLeft:10,height:20,fontSize:10,cursor:'pointer'}}>Thank You!</button>
                </div>
            <div style={{backgroundColor:'#FFFFFF',height:150,width:320,marginTop:50,marginLeft:200,boxShadow:'0px 0px 10px #000000',borderRadius:25}}>
                <h6 style={{paddingLeft:20,paddingTop:20}}>Welcome Message</h6>            
                    <textarea
                value={welcomeText3}
                onChange={(e) => setWelcomeText3(e.target.value)}
                placeholder="Type your welcome message..."
                style={{
                    height: 70,
                    width: 270,
                    marginLeft: 10,
                    marginTop: -10,
                    backgroundColor: '#EEEEEE',
                    borderRadius: 25,
                    fontSize: 10,
                    paddingTop: 15,
                    paddingLeft: 10,
                    resize: 'none',
                    border: 'none',
                    outline: 'none',
                }}
                />

                <img src="./editPencil.png" alt="" style={{height:10,width:10,marginLeft:20,marginTop:20,cursor:'pointer',position:'absolute',bottom:-60,right:380}}/>            
            </div>
           <div style={{backgroundColor:'#FFFFFF',height:170,width:300,marginTop:50,marginLeft:200,boxShadow:'0px 0px 10px #000000',borderRadius:25}}>
                <h6 style={{paddingLeft:20,paddingTop:20}}>Missed Chat timer</h6> 
                <TimerInsideDiv />
            </div> 
        </div>
        
        </div>
    </>
    )
    }

export default ChatBot
