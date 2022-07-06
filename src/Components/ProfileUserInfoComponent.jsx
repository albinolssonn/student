import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../Server/firebase-config';
import { useParams } from 'react-router-dom';

const ProfileUserInfoComponent = () => {
    const { id } = useParams()
    const [student, setStudent] = useState([])

    const studentColRef = doc(db, "students", id);

    useEffect(() => {
        getStudent()
    }, [])

    const getStudent = async () => {
        const data = await getDoc(studentColRef)
            .then((doc) => {
                setStudent(doc.data(), doc.id);
            })
    };


    return (
        <div className='userInfoDiv'>
            <div className="background" style={{ background: "#d2d2d2", borderRadius: "8px" }}>
                <div className="titleDiv" style={{ padding: "15px", textAlign: "center" }}>
                    <div className="profileImage" style={{ width: "120px", height: "120px", margin: "auto", borderRadius: "50%", background: "blue" }}></div>
                    <h2>{student.firstname} {student.lastname}</h2>
                    <p>{student.description}, {student.businessarea}</p>
                    <p>{student.location}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileUserInfoComponent