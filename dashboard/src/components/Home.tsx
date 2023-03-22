import React from 'react';
import Navbar from './Navbar';


function Home() {
  return (
    <div className='HomePage'>
      <Navbar></Navbar><br/><br/>
      <h1>Welcome to Security Scan System</h1>
      <img src='scan.png' alt='scan logo'></img>
    </div>   
  );
}

export default Home;
