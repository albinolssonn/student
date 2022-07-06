import React, { useEffect, useState } from 'react'
import ProfileWorkModal from '../Functions/ProfileWorkModal';
import { useParams } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../Server/firebase-config';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ProfileWorkComponent = () => {
    const { id } = useParams(); 
    const [workExperience, setWorkExperience] = useState([])
    const [modalStatus, setModalStatus] = useState(false); 
    const eduColRef = collection(db, "students", id, "workexperience"); 

    useEffect(() => {
        getWorkExperience()
    }, [])


    const getWorkExperience = async () =>{
        const data = await getDocs(eduColRef); 
        setWorkExperience(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); 
    }; 

    const removeWorkExperience = async (eduID) => {
        await deleteDoc(doc(db, "students", id, "workexperience", eduID));
        getWorkExperience(); 
    }

    
  return (
    <div className='educationDiv'>
        <div className="background" style={{background:"#d2d2d2",borderRadius:"8px"}}>
            <div className="titleDiv" style={{padding:"15px"}}>
                <h3>Arbetserfarenhet</h3>
                {workExperience.map((work, key) => {
                    return(
                        <div key={key} className='eduInfoCard' style={{padding:"10px 0px",display:"grid", gridTemplateColumns:"5fr 1fr"}}>
                            <div className="eduContent">
                                <p style={{fontSize:"1.1rem",fontWeight:"bold"}}>{work.role}</p>
                                <p>{work.company}</p>
                                <p>{work.startdate} - {work.enddate}</p>
                                <p>{work.description}</p>

                            </div>
                            <div className="removeBtn" style={{textAlign:"right"}}>
                                <p onClick={()=>{removeWorkExperience(work.id)}}><DeleteForeverIcon /></p>

                            </div>
                            
                        </div>
                    )
                })}
            </div>

        </div>
        <div className="addEduBtnDiv" style={{textAlign:"center",margin:"5px 0px"}}>
            <AddCircleIcon id="openModalBtn" onClick={() => {setModalStatus(true)}}/>
        </div>
            
        {modalStatus && <ProfileWorkModal closeModal={setModalStatus} getWork={getWorkExperience}/>}

    </div>
  )
}

export default ProfileWorkComponent