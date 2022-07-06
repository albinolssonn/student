import React, { useEffect, useState } from 'react'
import ProfileEducationModal from '../Functions/ProfileEducationModal'
import { useParams } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../Server/firebase-config';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ProfileEducationComponent = () => {
    const { id } = useParams(); 
    const [educations, setEducations] = useState([])
    const [modalStatus, setModalStatus] = useState(false); 
    const eduColRef = collection(db, "students", id, "education"); 

    useEffect(() => {
        getStudentEducation()
    }, [])


    const getStudentEducation = async () =>{
        const data = await getDocs(eduColRef); 
        setEducations(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); 
    }; 

    const removeEducation = async (eduID) => {
        await deleteDoc(doc(db, "students", id, "education", eduID));
        getStudentEducation(); 
    }

    
  return (
    <div className='educationDiv'>
        <div className="background" style={{background:"#d2d2d2",borderRadius:"8px"}}>
            <div className="titleDiv" style={{padding:"15px"}}>
                <h3>Utbildning</h3>
                {educations.map((edu, key) => {
                    return(
                        <div key={key} className='eduInfoCard' style={{padding:"10px 0px",display:"grid", gridTemplateColumns:"5fr 1fr"}}>
                            <div className="eduContent">
                                <p style={{fontSize:"1.1rem",fontWeight:"bold"}}>{edu.programme}</p>
                                <p>{edu.university}</p>
                                <p>{edu.edutype}</p>
                                <p>GPA: {edu.gpa}</p>

                            </div>
                            <div className="removeBtn" style={{textAlign:"right"}}>
                                <p onClick={()=>{removeEducation(edu.id)}}><DeleteForeverIcon /></p>

                            </div>
                            
                        </div>
                    )
                })}
            </div>

        </div>
        <div className="addEduBtnDiv" style={{textAlign:"center",margin:"5px 0px"}}>
            <AddCircleIcon id="openModalBtn" onClick={() => {setModalStatus(true)}}/>
        </div>
            
        {modalStatus && <ProfileEducationModal closeModal={setModalStatus} getEducation={getStudentEducation}/>}

    </div>
  )
}

export default ProfileEducationComponent