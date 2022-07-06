import React from 'react'; 
import { useState, useEffect } from 'react'; 
import { auth, db } from '../Server/firebase-config'; 
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import createProfileInputDesign from '../Assets/createProfileInputDesign';
import { doc, setDoc } from 'firebase/firestore';

const NoUserComponent = () => {
    const { id } = useParams(); 
    const [user, setUser] = useState({})
    const [newFirstname, setNewFirstname] = useState(""); 
    const [newLastname, setNewLastname] = useState(""); 
    const [newPhoneNbr, setNewPhoneNbr] = useState(""); 
    const [newLocation, setNewLocation] = useState(""); 
    const [newBA, setNewBA] = useState(""); 
    const [newDescription, setNewDescription] = useState(""); 
    const navigate = useNavigate(); 

    useEffect(() => {

        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); 
        }); 
    }, []); 

    const setUserInfo = async () => {
        await setDoc(doc(db, "students", id), {
            firstname: newFirstname,
            lastname: newLastname,
            email: user.email,
            phonenbr: newPhoneNbr,
            businessarea: newBA, 
            location: newLocation, 
            description: newDescription
            })
            .then(() => {
                console.log ("Successful Profile Registration")
                navigate(`/profile/s/${id}`); 
            })
            .catch((error) => {
                console.error("Error writing document: ", error)
            })
    }


    
  return (
    <div>
        <h2>Sätt Upp din profil</h2>

        <div className="userInfoContent" style={{padding:"10px 0px"}}>
                    <input style={createProfileInputDesign} placeholder={"Förnamn"} type="text" onChange={(event) => {{setNewFirstname(event.target.value)}}}/>
                    <input style={createProfileInputDesign} placeholder={"Efternamn"} type="text" onChange={(event) => {setNewLastname(event.target.value)}}/>
                    <input style={createProfileInputDesign} placeholder={user.email} type="text" readOnly/>
                    <input style={createProfileInputDesign} placeholder={"Telefonnummer"} type="text" onChange={(event) => {{setNewPhoneNbr(event.target.value)}}}/>
                    <input style={createProfileInputDesign} placeholder={"Stad"} type="text" onChange={(event) => {setNewLocation(event.target.value)}}/>
                    <input style={createProfileInputDesign} placeholder={"Affärsområde"} type="text" onChange={(event) => {setNewBA(event.target.value)}}/>
                    <input style={createProfileInputDesign} placeholder={"Beskrivning"} type="text"  onChange={(event) => {setNewDescription(event.target.value)}}/> <br />
                    <button onClick={setUserInfo}>Skapa profil</button>
                </div>

    </div>
  )
}

export default NoUserComponent