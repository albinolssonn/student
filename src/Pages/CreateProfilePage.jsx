import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../Server/firebase-config';
import LogoutBannerComponent from '../Components/LogoutBannerComponent';
import UserInfoComponent from '../Components/UserInfoComponent';

const CreateProfilePage = () => {

  return (
    <div>
        <LogoutBannerComponent />
        <UserInfoComponent />


    </div>
  )
}

export default CreateProfilePage