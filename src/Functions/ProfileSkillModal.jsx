import React, { useState } from 'react'
import { db } from '../Server/firebase-config'; 
import { addDoc, collection, doc } from 'firebase/firestore'; 
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import '../Functions/ProfileModal.css'

function ProfileSkillModal({ closeModal, getSkill }) {
    const { id } = useParams(); 
    const [newSkill, setNewSkill] = useState(""); 

    const setNewStudentSkill = async () => {
        await addDoc(collection(db, "students", id, "skills"), {
            skill: newSkill,
            })
            .then(() => {
                console.log ("Successful Profile Registration") // Ta bort senare
                closeModal(false); 
                getSkill(); 
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
                        <input placeholder="Skill" type="text" required onChange={(event) => {setNewSkill(event.target.value)}}/> 

                    </div>
                    <div className="addBtnDiv">
                        <button id="addBtn" onClick={setNewStudentSkill}>Lägg till</button>
                    </div>
                    
                </div>
            </div>

        </div>
    </div>
  )
}

export default ProfileSkillModal