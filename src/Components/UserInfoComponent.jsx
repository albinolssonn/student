import React from 'react'; 
import { useState, useEffect } from 'react'; 
import { auth, db } from '../Server/firebase-config'; 
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'; 
import { useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import createProfileInputDesign from '../Assets/createProfileInputDesign';

const UserInfoComponent = () => {
    const [student, setStudent] = useState([]); 
    const { id } = useParams(); 
    const studentColRef = doc(db, "students", id); 
    const [user, setUser] = useState({})

    const [newPhoneNbr, setNewPhoneNbr] = useState(""); 
    const [newLocation, setNewLocation] = useState(""); 
    const [newBA, setNewBA] = useState(""); 
    const [newDescription, setNewDescription] = useState(""); 


    const getStudent = async () => {
        const returnData = await getDoc(studentColRef)
        .then((doc) => {
            setStudent(doc.data(), doc.id);
        })
    }; 

    const setUserInfo = async () => {
        await updateDoc(doc(db, "students", id), {
            firstname: (student.firstname),
            lastname: student.lastname,
            email: user.email,
            phonenbr: newPhoneNbr,
            businessarea: newBA, 
            location: newLocation, 
            description: newDescription
            })
            .then(() => {
                console.log ("Successful Profile Registration")
            })
            .catch((error) => {
                console.error("Error writing document: ", error)
            })
    }

    useEffect(() => {
        getStudent()

        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); 
        }); 
    }, []); 

  return (
    <div className='userInfoComponent' > 
        <div className="userInfoContainer" style={{textAlign:"center"}}>
            <div className="userInfoIntro" style={{maxWidth:"700px", margin:"auto",margin:"30px auto"}}> {/* Denna sektion ska ligga i egen komponent sen*/}
                <div style={{width:"150px",height:"150px",background:"#B9D9EB",margin:"auto",borderRadius:"50%"}}></div>
                <h2>{student.firstname} {student.lastname}</h2>
            </div>
            <div className="userInfoBanner" style={{maxWidth:"700px", margin:"auto",background:"#B9D9EB",borderRadius:"8px"}}>
                <div className="userInfoContent" style={{padding:"10px 0px"}}>
                    <input style={createProfileInputDesign} type="text" placeholder={user.email} readOnly/>
                    <input style={createProfileInputDesign} type="text" placeholder={student.phonenbr} onChange={(event) => {if((event.target.value)===null){setNewPhoneNbr(student.phonenbr)}else{setNewPhoneNbr(event.target.value)}}}/>
                    <input style={createProfileInputDesign} type="text" placeholder={student.location} onChange={(event) => {setNewLocation(event.target.value)}}/>
                    <input style={createProfileInputDesign} type="text" placeholder={student.businessarea} onChange={(event) => {setNewBA(event.target.value)}}/>
                    <input style={createProfileInputDesign} type="text" placeholder={student.description} onChange={(event) => {setNewDescription(event.target.value)}}/> <br />
                </div>
            </div>
            <button onClick={setUserInfo} id="userInfoBtn">Uppdatera Profil</button>
        </div>
    </div>
  )
}

export default UserInfoComponent