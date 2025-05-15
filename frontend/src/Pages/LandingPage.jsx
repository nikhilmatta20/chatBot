
import React from 'react';
import WelcomeMessage from '../components/WelcomeMessage';
import LandingPageChatWidget from '../components/LandingPageChatWidget';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'



const LandingPage = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    
    <div className='Frame1 main-content'>
      <div className='Header' style={{ display: 'flex',marginLeft:150,alignItems:'center'}}>
        <img src="./logo.png" alt="logo" />
        <div className='Login-Signup-Buttons' style={{ display: 'flex'}}>
         <Link to="/login"><button style={{ backgroundColor: 'white', color: '#184E7F', border:'none', marginLeft:1020,alignItems: 'center', justifyContent: 'center',borderRadius:5, width:80,fontSize:15,cursor:'pointer',marginTop:10}}>Login</button></Link>
          <Link to="/signup"><button style={{backgroundColor:'#244779', color:'white', border:'none', borderRadius:5, width:80,marginLeft:40,padding:10,height:40,cursor:'pointer'}}>Sign up</button></Link>
        </div>
      </div>

      <br />
      <div style={{display:'flex',height:700}}>
        <div style={{marginLeft:150,marginTop:200, height:270}}>
          <h1 style={{fontSize:50}}>Grow Your Business Faster <br />with Hubly CRM</h1>
          <p>Manage leads, automate workflows, and close deals effortlessly—all in one powerful <br />platform.</p>
          <button style={{color:'white', backgroundColor:"#244779", border:'none',borderRadius:5,padding:10,width:100}}>Get started</button>
          <button style={{background:'none', border:'none'}}><img src="./watchvideo.png" alt="" style={{width:100,marginLeft:20}}/></button>
        </div>
        <div>
          <img src="./GroupFrame.png" alt="" style={{marginTop:100,height:595, position:'relative',left:250}} />
        <img src="./Frame1.png" alt="" style={{marginLeft:150,marginTop:100,height:130, position:'absolute',top:450,right:100}} />
        <img src="./Frame4.png" alt="" style={{marginLeft:150,marginTop:100,height:80, position:'absolute',top:50,right:100}}/>
        </div>
      </div>
      <br />

      <div className='Frame-2'>
        <img src="./Frame2.png" alt="" style={{width:1680, height:120,marginTop:22, position:'relative'}} />
        <div className='mobile-visible' style={{position:'absolute', right:80,bottom:100}}>
          <WelcomeMessage />
        </div>
        <div style={{ position: 'fixed', bottom: 80, right: 30 }}>
      {/* ChatBot Widget */}
      {isOpen && (
        <div>
          <LandingPageChatWidget />
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChatbot}
        style={{
          position: 'fixed', bottom: 10, right: 20,
              backgroundImage: isOpen
      ? 'url(/FloatCancelBtn.png)'   
      : 'url(./FloatingButton.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        border: 'none',
        outline: 'none', 
        borderRadius: '50%',
        width: 60,
        height: 60,
        cursor: 'pointer',
        padding: 0,
        margin: 0,
        }}
      >
      </button>
    </div>
        
      </div>
    </div>

    <div className='Frame-3 main-content' style={{width:1250,height:700, marginTop:100,marginLeft:200}} >
      <div>
         <div style={{textAlign:'center'}}>
          <h1 style={{letterSpacing:1}}>At its core, Hubly is a robust CRM <br />solution.</h1>
          <p>Hubly helps businesses streamline customer interactions, track leads, and automate tasks— <br />saving you time and maximizing revenue. Whether you’re a startup or an enterprise, Hubly <br /> adapts to your needs, giving you the tools to scale efficiently.</p>
        </div>
      </div>
      <div style={{width:1000, height:580, marginLeft:150, marginTop:40,boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.5)',borderRadius:10,display:'flex',gap:40}}>
        <div style={{paddingLeft:10,width:400}}>
          <h2 style={{paddingTop:80}}>MULTIPLE PLATFORMS TOGETHER!</h2>
          <p>Email communication is a breeze with our fully integrated, drag & drop email builder.</p><br />
           <h2>CLOSE</h2>
          <p>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</p><br />
           <h2>NURTURE</h2>
          <p>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</p><br />
        </div>
        <div style={{width:200}}>
          <img src="./layout1.png" alt="" style={{position:'relative',top:100,left:150}} />
          <img src="./layout.png" alt="" style={{position:'absolute',right:400,top:1350}} />
        </div>
      </div>
    </div>

    <div className='Frame-4 main-content'>
      <div style={{width:1300, height:800, marginLeft:200, marginTop:100}}>
        <div style={{textAlign:'center'}}>
          <h1 style={{letterSpacing:1}}>We have plans for everyone!</h1>
          <p>We started with a strong foundation, then simply built all of the sales and <br /> marketing tools ALL businesses need under one platform.</p>
        </div>
        <div style={{display:'flex', gap:40}}>
          <div style={{paddingLeft:20,height:550, width:500, marginLeft:100, marginTop:100,boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.5)',borderRadius:10}}>
            <h2>STARTER</h2>
            <p>Best for local businesses needing to improve their online <br /> reputation.</p>
            <h1 style={{color:'#2F5F8B'}}>$199 <span>/monthy</span></h1>
            <h4>Whats included</h4>
            <ul style={{padding:10}}>
              <li>Unlimited users</li>
              <li style={{paddingTop:10}}>GMB Mesaging</li>
              <li style={{paddingTop:10}}>Reputation Management</li>
              <li style={{paddingTop:10}}>GMB Call Tracking</li>
              <li style={{paddingTop:10,paddingBottom:80}}>24/7 Award Winninng Support</li>
              </ul>
              <button style={{color:'#2F5F8B',background:'none',border:"1px solid black",borderRadius:15,padding:10,width:'90%'}}>SIGN  FOR STARTER</button>
          </div>
          <div style={{paddingLeft:20,height:550, width:500, marginTop:100,boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.5)',borderRadius:10}}>
           <h2>GROW</h2>
            <p>Best for all businesses that want to take full control of their <br />marketing automation and track their leads, click to close.</p>
            <h1 style={{color:'#2F5F8B'}}>$399 <span>/monthy</span></h1>
            <h4>Whats included</h4>
            <ul style={{padding:10}}>
              <li>Unlimited users</li>
              <li style={{paddingTop:10}}>Pipleline Management</li>
              <li style={{paddingTop:10}}>Marketing Automation Campaigns</li>
              <li style={{paddingTop:10}}>Live Call Transfer</li>
              <li style={{paddingTop:10}}>GMB messaging</li>
              <li style={{paddingTop:10}}>Embed-able Form builder</li>
              <li style={{paddingTop:10}}>Reputation Management</li>
              <li style={{paddingTop:10}}>24/7 Award winning support</li>
              </ul>
              <button style={{color:'#2F5F8B',background:'none',border:"1px solid black",borderRadius:15,padding:10,width:'90%'}}>SIGN  FOR STARTER</button>
          </div>
        </div>
      </div>
    </div>
    
    <div className='Farme-5 main-content'>
      <div style={{marginLeft:500,textWrap:'nowrap'}}>
        <div style={{display:'flex', gap:150}}>
          <div>
            <ul style={{listStyleType:'none' }}>
            <li style={{fontWeight:'bold'}}>Product</li>
            <li style={{paddingTop:20}}>Universal checkout</li>
            <li style={{paddingTop:15}}>Payment workflows</li>
            <li style={{paddingTop:15}}>Observability</li>
            <li style={{paddingTop:15}}>UpliftAI</li>
            <li style={{paddingTop:15}}>Apps & Integrations</li>
            </ul>
          </div>
          <div>
            <ul style={{listStyleType:'none' }}>
            <li style={{fontWeight:'bold'}}>Why Primer</li>
            <li style={{paddingTop:20}}>Expand to new markets</li>
            <li style={{paddingTop:15}}>Boost payment success</li>
            <li style={{paddingTop:15}}>imrpove customer rates</li>
            <li style={{paddingTop:15}}>Reduced payment frauds</li>
            <li style={{paddingTop:15}}>recover revenue</li>
            </ul>
          </div>
          <div>
          <ul style={{listStyleType:'none' }}>
            <li style={{fontWeight:'bold'}}>Developers</li>
            <li style={{paddingTop:20}}>Primer Docs</li>
            <li style={{paddingTop:15}}>API reference</li>
            <li style={{paddingTop:15}}>Payment method guide</li>
            <li style={{paddingTop:15}}>Service status</li>
            <li style={{paddingTop:15}}>Community</li>
            </ul>
        </div>
      </div>
     <div style={{display:'flex', gap:170}}>
       <div>
        <ul style={{listStyleType:'none' }}>
          <li style={{fontWeight:'bold'}}>Resources</li>
          <li style={{paddingTop:20}}>Blogs</li>
          <li style={{paddingTop:15}}>Success stories</li>
          <li style={{paddingTop:15}}>news Room</li>
          <li style={{paddingTop:15}}>Terms</li>
          <li style={{paddingTop:15}}>Privacy</li>
          </ul>
      </div>
      <div>
      <ul style={{listStyleType:'none' }}>
          <li style={{fontWeight:'bold'}}>Company</li>
          <li style={{paddingTop:20}}>Careers</li>          
          </ul>
      </div>
     </div>
      </div>
      <img src="./logo.png" alt="" style={{height:50,position:'absolute', left:250, bottom:-1750}}/>
      <img src="./socialmedia.png" alt="" style={{position:'absolute', left:1150, bottom:-2050}}/>
    </div>
    </>
  );
};


export default LandingPage;
