import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Server/firebase-config';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import LoginPage from './Pages/LoginPage';
import RegisterComponent from './Components/RegisterComponent';
import ProfilePage from './Pages/ProfilePage';
import ErrorPage from './Pages/ErrorPage';
import CreateProfilePage from './Pages/CreateProfilePage';

function App() {
  const [user, setUser] = useState({});  

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser); 
  }); 

  if (user){
    return(
      <Router>
        <div className="App">
        
          <Routes>
            {/* <Route path='/' element={<LoginPage />}/> Denna måste fixas, just nu bugg som visar errorpage innan login sidan komme, no bueno  */}
            <Route path='/profile/s/:id' element={<ProfilePage />}/>
            <Route path='/edit/profile/s/:id' element={<CreateProfilePage />}/>
            <Route path='*' element={<ErrorPage loggedInUser={user}/>}/>

          </Routes>

        </div>
      </Router>
    )
  }

  return (
    <Router>
      <div className="App">
          
        <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterComponent />}/>
          <Route path='*' element={<ErrorPage />}/>
        </Routes>

      </div>
    </Router>
  );

}

export default App;
