import React, { useState } from 'react'
import { db } from '../Server/firebase-config'; 
import { addDoc, collection, doc } from 'firebase/firestore'; 
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import '../Functions/ProfileModal.css'

function ProfileWorkModal({ closeModal, getWork }) {
    const { id } = useParams(); 
    const [newWorkRole, setNewWorkRole] = useState(""); 
    const [newCompany, setNewCompany] = useState(""); 
    const [newStartDate, setNewStartDate] = useState(""); 
    const [newEndDate, setNewEndDate] = useState(""); 
    const [newdescription, setNewDescription] = useState(""); 

    const setNewWorkExperience = async () => {
        await addDoc(collection(db, "students", id, "workexperience"), {
            role: newWorkRole,
            company: newCompany,
            startdate: newStartDate,
            enddate: newEndDate,
            description: newdescription
            })
            .then(() => {
                console.log ("Successful Profile Registration") // Ta bort senare
                closeModal(false); 
                getWork(); 
            })
            .catch((error) => {
                console.error("Error writing document: ", error)
            })
    }


  return (
    <div className='educationModal'>
        <div className="modalBackground">
            <div className="frame">
                <div className="content">
                    <div className="closeBtnDiv">
                        <CloseIcon id="closeBtn" onClick={() => {closeModal(false)}}/>
                    </div>
                    <div className="inputDiv">
                        <h2>Lägg till arbetserfarenhet</h2>
                        <input placeholder="Roll" type="text" required onChange={(event) => {setNewWorkRole(event.target.value)}}/> 
                        <input placeholder="Företag" type="text" required onChange={(event) => {setNewCompany(event.target.value)}}/>
                        <input placeholder="Startdatum" type="text" required onChange={(event) => {setNewStartDate(event.target.value)}}/>
                        <input placeholder="Slutdatum" type="text" onChange={(event) => {setNewEndDate(event.target.value)}}/>
                        <input placeholder="Beskrivning" type="text" onChange={(event) => {setNewDescription(event.target.value)}}/>

                    </div>
                    <div className="addBtnDiv">
                        <button id="addBtn" onClick={setNewWorkExperience}>Lägg till</button>
                    </div>
                    
                </div>
            </div>

        </div>
    </div>
  )
}

export default ProfileWorkModal