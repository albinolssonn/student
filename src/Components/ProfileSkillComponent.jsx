import React, { useEffect, useState } from 'react'
import ProfileSkillModal from '../Functions/ProfileSkillModal';
import { useParams } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../Server/firebase-config';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ProfileSkillComponent = () => {
    const { id } = useParams(); 
    const [studentSkills, setStudentSkills] = useState([])
    const [modalStatus, setModalStatus] = useState(false); 
    const studentSkillRef = collection(db, "students", id, "skills"); 

    useEffect(() => {
        getStudentSkills()
    }, [])


    const getStudentSkills = async () =>{
        const tmpSkills = await getDocs(studentSkillRef); 
        setStudentSkills(tmpSkills.docs.map((doc) => ({...doc.data(), id: doc.id}))); 
    }; 

    const removeSkill = async (eduID) => {
        await deleteDoc(doc(db, "students", id, "skills", eduID));
        getStudentSkills(); 
    }

    
  return (
    <div className='skillDiv' style={{marginTop:"33px"}}>
        <div className="background" style={{background:"#d2d2d2",borderRadius:"8px"}}>
            <div className="titleDiv" style={{padding:"15px"}}>
                <h3>Skills</h3>
                {studentSkills.map((studSkill, key) => {
                    return(
                        <div key={key} className='eduInfoCard' style={{padding:"10px 0px",display:"grid", gridTemplateColumns:"5fr 1fr"}}>
                            <div className="eduContent">
                                <p style={{fontSize:"1.1rem",fontWeight:"bold"}}>{studSkill.skill}</p>
                            </div>
                            <div className="removeBtn" style={{textAlign:"right"}}>
                                <p onClick={()=>{removeSkill(studSkill.id)}}><DeleteForeverIcon /></p>
                            </div>
                            
                        </div>
                    )
                })}
            </div>

        </div>
        <div className="addEduBtnDiv" style={{textAlign:"center",margin:"5px 0px"}}>
            <AddCircleIcon id="openModalBtn" onClick={() => {setModalStatus(true)}}/>
        </div>
            
        {modalStatus && <ProfileSkillModal closeModal={setModalStatus} getSkill={getStudentSkills}/>}

    </div>
  )
}

export default ProfileSkillComponent