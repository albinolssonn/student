import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../Utils/logo.png';
import { NavData } from '../Utils/NavData';
import { useParams } from 'react-router-dom';


const VerticalNav = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  
      const navigateProfile = () => {
        navigate(`/profile/s/${id}`); 
        console.log(id)
      }

    
  return (
    <div className='navbar' style={{background:"#2f4050",height:"100vh",width:"250px",position:"fixed"}}>
      
      <div className="logo__container" style={{padding:"20px 20px 50px 20px",textAlign:"center"}}>
        <img src={logo} style={{width:"180px"}} alt="" />
      </div>

      <ul className='navbarList' style={{height:"auto",width:"100%"}}>
        {NavData.map((val, key) => {
          return <li key={key} 
          className="navRow" 
          id={window.location.pathname == "/" + val.link ? "active" : ""}
          onClick={navigateProfile}> 
            <div id="icon" style={{flex:"30%",display:"grid",placeItems:"center"}}>{val.icon}</div> 
            <div id="title" style={{flex:"70%"}}>{val.title}</div>
          </li>;
        })}

      </ul>
      

        
        
    </div>
  )
}

export default VerticalNav