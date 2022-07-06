import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import { auth } from '../Server/firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import inputDesign from '../Assets/inputDesign'
import '../Assets/Buttons.css';

const RegisterComponent = () => {
    const [newEmail, setNewEmail] = useState(""); 
    const [newPassword, setNewPassword] = useState(""); 
    const [errorCode, setErrorCode] = useState(""); 
    const [user, setUser] = useState({}); 

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); 
            console.log(user.uid)
        }); 
    }, [])

    // Function to sign in via email
    const registerFunction = async () => {
        try{
            const tmpUser = await createUserWithEmailAndPassword(auth, newEmail, newPassword) 
            navigate(`/profile/s/${tmpUser.user.uid}`)

        } catch (error){
            setErrorCode(error.message)
            console.log(errorCode); 
        }
    }; 

    const navigateLogin = () => {
        navigate(`/user/s/${user.id}`)
    }

  return (
    <div className="register__content">
        <div className="header" style={{maxWidth:"1200px",margin:"10px auto"}}>
            <div className="header__content" style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
                <div className="logo">
                    <Link id="logo__text" to="/">SP</Link> 
                </div>

                <div className="btn" style={{textAlign:"right"}}>
                    <button id="swapRegLogBtn" onClick={navigateLogin} style={{width:"150px", padding:"8px 0", borderRadius:"5px", borderStyle:"none"}}>Logga in</button>
                </div>
            </div>
        </div>

        <div className='register__container' style={{maxWidth:"1000px",padding:"50px 0",margin:"auto",backgroundColor:"#e6f3ff",textAlign:"center",borderRadius:"8px",marginTop:"6%"}}>
            
            <div className="register__grid" style={{display:"grid", gridTemplateColumns:"1fr 2fr"}}>
                <div className="register__widget" style={{borderRight:"1px solid #1d1d1d", padding:"0px 15px"}}>
                    <div className="register__form">
                        <h3>Registrera dig för X</h3>

                        <div className="register__email">
                            
                            <input style={inputDesign} placeholder="Epostadress..." onChange={(event) => {setNewEmail(event.target.value)}}/>
                            <input style={inputDesign} placeholder="Lösenord..." type={"password"} onChange={(event) => {setNewPassword(event.target.value)}}/>
                            <button id='registerBtn' onClick={registerFunction} style={{marginBottom:"10px"}}>Registrera dig</button>
                        </div>
                    </div>
                    <Link id="text__link" to="/">Har du redan ett konto?</Link>

                    <div className="errorCode" style={{margin:"10px 0"}}>
                        <p style={{fontSize:"8pt",color:"red"}}>{errorCode}</p>
                    </div>
                </div>
                
                <div className="text__widget" style={{padding:"0px 15px"}}>
                    <h2>Ta del av framtidens medarbetare!</h2>
                </div>
            </div>
        </div>
    </div>

  )
}

export default RegisterComponent