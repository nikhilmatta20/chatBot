import React, { useContext } from 'react';
 import { ColorContext } from '../context/ColorContext';

const WelcomeMessage = () => {
const { welcomeText3 } = useContext(ColorContext);

  return (
   <div style={{ position: 'relative', height: 86, width: 160, marginLeft: 10, backgroundColor: 'white', paddingTop: 15, paddingLeft: 10 }}>
  
    <div style={{padding:'16px 24px 16px 16px', fontSize:9.5}}>
        {welcomeText3}
    </div>

    <img src="./IconStatus.png" alt="" style={{ position: 'absolute', left: '50%', top: '5%', transform: 'translate(-50%, -50%)', height: 30, width: 30 }} />
    <img src="./Close.png" alt="" style={{ position: 'absolute', top: 3, right: 5, height: 18, width: 18, cursor: 'pointer' }} />
</div>

  )
}

export default WelcomeMessage
