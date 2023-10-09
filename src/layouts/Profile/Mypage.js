import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import SignIn from './SignIn'

function Mypage({profile, getProfile}) {
    const [data, setData] = useState(profile);
    useEffect(() => {
        setData(profile);
    }, [profile]);
    const navigate = useNavigate()

    const nav = (url) => {
        console.log("check for nav");
        navigate(url)
    }
    useEffect(() => {
        console.log("check in mypage ",data);
    }, []);
    return ( (data != null) ? (<h1>MYpage</h1>) : <SignIn /> );
}

export default Mypage;