import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../Server/firebase-config';

const ErrorPage = ({ loggedInUser }) => {
    const navigate = useNavigate()

    function onClickReturn(){
        navigate(`/profile/s/${loggedInUser.uid}`) // Denna ska bytas till orginaldomänen sen!
    }

    function onClickLogin(){
        navigate(`/`)
    }

    if (loggedInUser){
        return (
            <div className='errorPage'>
                <div className="errorModule" style={{width:"90vw",height:"90vh",margin:"auto",padding:"30px",position:"relative"}}>
                    <div className="errorContent" style={{textAlign:"center",position:"absolute",margin:"0",top:"50%",left:"25%",transform:"translateY(-50%)"}}>
                        <h2 className='error'>Ojdå...</h2>
                        <h4>Du hittade visst en av våra outforskade sidor... Se vad du kan hitta och återkom sen!</h4>
                        <button onClick={onClickReturn}>Tillbaka till profil</button>
                    </div>
                </div>
            </div>
          )
    }
    
    return (
        <div className='errorPage'>
            <div className="errorModule" style={{width:"90vw",height:"90vh",margin:"auto",padding:"30px",position:"relative"}}>
                <div className="errorContent" style={{textAlign:"center",position:"absolute",margin:"0",top:"50%",left:"25%",transform:"translateY(-50%)"}}>
                    <h2 className='error'>Ojdå...</h2>
                    <h4>Du hittade visst en av våra outforskade sidor... Se vad du kan hitta och återkom sen!</h4>
                    <button onClick={onClickLogin}>Tillbaka till hemsida</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage


