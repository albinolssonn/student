import React, { useState } from 'react'
import { db } from '../Server/firebase-config'; 
import { addDoc, collection, doc } from 'firebase/firestore'; 
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import '../Functions/ProfileModal.css'

function ProfileEducationModal({ closeModal, getEducation }) {
    const { id } = useParams(); 
    const [newProgramme, setNewProgramme] = useState(""); 
    const [newUniversity, setNewUniversity] = useState(""); 
    const [newGPA, setNewGPA] = useState(""); 
    const [newEduType, setNewEduType] = useState(""); 


    const setNewEducation = async () => {
        await addDoc(collection(db, "students", id, "education"), {
            programme: newProgramme,
            university: newUniversity,
            edutype: newEduType,
            gpa: newGPA
            })
            .then(() => {
                console.log ("Successful Profile Registration") // Ta bort senare
                closeModal(false)
                getEducation()
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
                        <h2>Lägg till utbildning</h2>
                        <input placeholder="Programm eller kurs" type="text" required onChange={(event) => {setNewProgramme(event.target.value)}}/> 
                        <input placeholder="Universitet" type="text" required onChange={(event) => {setNewUniversity(event.target.value)}}/>
                        <input placeholder="Typ av utbildning" type="text" required onChange={(event) => {setNewEduType(event.target.value)}}/>
                        <input placeholder="GPA" type="text" onChange={(event) => {setNewGPA(event.target.value)}}/>
                    </div>
                    <div className="addBtnDiv">
                        <button id="addBtn" onClick={setNewEducation}>Lägg till</button>
                    </div>
                    
                </div>
            </div>

        </div>
    </div>
  )
}

export default ProfileEducationModal