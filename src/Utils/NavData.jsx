import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import GroupIcon from '@mui/icons-material/Group';
import InsightsIcon from '@mui/icons-material/Insights';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Server/firebase-config';

export const NavData = [
    {
        title: 'Insikter',
        icon: <InsightsIcon/>,
        link: ""
    }, 
    {
        title: 'Rekrytera',
        icon: <GroupIcon/>,
        link: "students"
    }, 
    {
        title: 'Önskelista',
        icon: <PlaylistAddCheckIcon/>,
        link: "profile"
    },
    {
        title: 'Profil',
        icon: <PersonIcon/>,
        link: "profile/s/:id"
    }
]
