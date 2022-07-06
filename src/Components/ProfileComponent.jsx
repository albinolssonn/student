import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../Server/firebase-config';
import ProfileEducationComponent from './ProfileEducationComponent';
import ProfileUserInfoComponent from './ProfileUserInfoComponent';
import ProfileWorkComponent from './ProfileWorkComponent';
import ProfileSkillComponent from './ProfileSkillComponent';

const ProfileComponent = () => {
    const [user, setUser] = useState({})
    
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser); 
    }); 

  return (
    <div>
      <div className="profileGrid" style={{maxWidth:"1000px", margin:"auto", padding:"20px 0px", display:"grid", gridTemplateColumns:"2fr 5fr"}}>
        <div className="leftWidget" style={{marginRight:"10px"}}>
          <ProfileUserInfoComponent />
          <ProfileSkillComponent />
          
        </div>

        <div className="widgetRight" style={{marginLeft:"10px"}}>
          <ProfileEducationComponent />
          <ProfileWorkComponent />

        </div>
      </div>
        

    </div>
  )
}

export default ProfileComponent