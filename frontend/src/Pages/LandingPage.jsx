
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
      <div style={{display:'flex'}}>
        <img src="./Frame3.png" alt="" style={{marginLeft:150,marginTop:200, height:270}} />
        <img src="./GroupFrame.png" alt="" style={{marginLeft:150,marginTop:100,height:595, position:'relative'}} />
        <img src="./Frame1.png" alt="" style={{marginLeft:150,marginTop:100,height:130, position:'absolute',top:450,right:100}} />
        <img src="./Frame4.png" alt="" style={{marginLeft:150,marginTop:100,height:80, position:'absolute',top:50,right:100}}/>
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
        <div style={{
          width: 300,
          height: 400,
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
          borderRadius: 10,
          marginBottom: 10,
        
          overflow: 'hidden'
        }}>
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
        outline: 'none',  // removes default button outline
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

    <div className='Frame-3 main-content'>
      <img src="./Frame5.png" alt="" style={{width:1250,height:700, marginTop:100,marginLeft:200}} />
    </div>

    <div className='Frame-4 main-content'>
      <img src="./Frame6.png" alt="" style={{width:1300, height:800, marginLeft:200, marginTop:100}} />
    </div>
    
    <div className='Farme-5 main-content'>
      <img src="./Frame7.png" alt="" style={{height:600,marginLeft:200,marginTop:100, position:'relative', width:1350}}/>
      <img src="./logo.png" alt="" style={{height:50,position:'absolute', left:250, bottom:-1950}}/>
    </div>
    </>
  );
};


export default LandingPage;
