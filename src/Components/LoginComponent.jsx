import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Server/firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import inputDesign from '../Assets/inputDesign'

const LoginComponent = () => {
    const [loginEmail, setLoginEmail] = useState(""); 
    const [loginPassword, setLoginPassword] = useState(""); 
    const [user, setUser] = useState({})
    const [errorCode, setErrorCode] = useState("") 
    const navigate = useNavigate();

    const navigateRegister = () => {
        navigate('/register')
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); 
        }); 
    }, [])

    const signInWithEmail = async () => {
      try{
          const tmpUser = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
          navigate(`/profile/s/${tmpUser.user.uid}`)
        }catch (error){
          setErrorCode(error.message)
          console.log(errorCode); 
      }
  }; 

  return (
    <div className="login__content">
        <div className="header" style={{maxWidth:"1200px",margin:"10px auto"}}>
            <div className="header__content" style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
                <div className="logo">
                    <Link id="logo__text" to="/">SP</Link> 
                </div>

                <div className="btn" style={{textAlign:"right"}}>
                    <button id="swapRegLogBtn" onClick={navigateRegister}>Registrera dig</button>
                </div>
            </div>
        </div>

        <div className="login__container" style={{maxWidth:"1000px",padding:"50px 0",margin:"auto",backgroundColor:"#e6f3ff",textAlign:"center",borderRadius:"8px",marginTop:"6%"}}>

            <div className="login__grid" style={{display:"grid", gridTemplateColumns:"1fr 2fr"}}>
            <div className="login__widget" style={{borderRight:"1px solid #1d1d1d", padding:"0px 15px",textAlign:"center"}}>
                    <div className="login__form">
                        <h3>Logga in på SP</h3>

                            <input placeholder="Email..." style={inputDesign} onChange={(event) => {setLoginEmail(event.target.value)}}/>
                            <input type="password" style={inputDesign} placeholder="Lösenord..." onChange={(event) => {setLoginPassword(event.target.value)}}/>
                            <button onClick={signInWithEmail} id="loginBtn">Logga In</button>

                        <Link id="text__link" to="/register">Inget konto? Registrera dig här!</Link>

                    </div>

                    <div className="errorCode" style={{margin:"10px 0"}}>
                        <p style={{fontSize:"8pt",color:"red"}}>{errorCode}</p>
                    </div>
                    
                </div>

                <div className="login__visuals">

                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginComponent