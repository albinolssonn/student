import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../Server/firebase-config';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutBannerComponent = () => {
    const [user, setUser] = useState({});  
    const navigate = useNavigate(); 
  
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    }); 
  
    const logout = async () => {
      await signOut(auth)
      navigate('/')
      localStorage.clear(); 
   };
  return (
    <div className='profileBanner' style={{background:"#2f4050"}}>
        <div className="bannerDiv" style={{maxWidth:"1000px",margin:"auto"}}>
            <div className="bannerGrid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",padding:"10px 0px"}}>
                <div className="pageTitle">
                    {/* <h3>Hitta kandidater</h3> */}
                </div>

                <div className="logout" style={{textAlign:"right",color:"white"}}>
                    <p style={{display:"inline-block",marginRight:"10px"}}>{user.email}</p> 
                    <p id="logoutIcon"><LogoutIcon onClick={logout}/></p>
                </div>
            </div>

        </div>
        
    </div>
  )
}

export default LogoutBannerComponent