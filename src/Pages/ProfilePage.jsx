import React, { useEffect, useState } from 'react'
import LogoutBannerComponent from '../Components/LogoutBannerComponent';
import ProfileComponent from '../Components/ProfileComponent';
import NoUserComponent from '../Components/NoUserComponent';
import { collection, documentId, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../Server/firebase-config';
import VerticalNav from '../Layouts/VerticalNav'



const ProfilePage = () => {
  const { id } = useParams();
  const [userExists, setUserExists] = useState("")

  const tmpQ = query(collection(db, "students"), where(documentId(), "==", id));

  useEffect(() => {
    executeQuery()
  }, []); 

  const executeQuery = async () => {
    const querySnapshot = await getDocs(tmpQ);
    if(querySnapshot.docs.length > 0){
      setUserExists(1); 
    }
    else{
      setUserExists(0); 
    }
  }  
    if(userExists == 0){
      return (
        <div style={{display:"grid",gridTemplateColumns:"250px 1fr"}}>
          <div className="navbar">
            <VerticalNav />
          </div>

          <div className="mainContent">
            <LogoutBannerComponent />
            <NoUserComponent />


          </div>
          
        </div>
        )

    }
    else{
      return (
        <div style={{display:"grid",gridTemplateColumns:"250px 1fr"}}>
          <div className="navbar">
            <VerticalNav />
          </div>

          <div className="mainContent" style={{overFlow:"scroll"}}>
            <LogoutBannerComponent />
            <ProfileComponent />

          </div>
          
        </div>
        )
    }
    }
    
  


export default ProfilePage