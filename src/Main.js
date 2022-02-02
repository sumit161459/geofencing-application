import React,{useState} from 'react';
import Login from './Login';
import Home from './Home';

const Main = () => {
    const [isLoggedIn,setLoggedIn]=useState(false);
  return (<>
    <div style={{marginTop:'40px',display:'flex',justifyContent:'center'}} >
        <h1>Welcome to geofence</h1>
    </div>
    <Home isLoggedIn={isLoggedIn}></Home>
    <Login setLoggedIn={setLoggedIn}></Login>
  </>)
};

export default Main;

