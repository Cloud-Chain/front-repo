import React, { useState, useEffect } from 'react';
import CircularIndeterminate from "./../../components/Progress/CircularIndeterminate";
import Mypage from "./Mypage";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const defaultTheme = createTheme();

function Profile() {
    useEffect(() => {
        getProfile();
    }, []);

    const [loading, setLoading] = useState(true);

    const [profile, setProfile] = useState(null);

    const getProfile = async () => {
        const userid = localStorage.getItem('UserId');
        const token = localStorage.getItem('Authorization');
        const url = `http://localhost:8000/auth/get-profile/?userid=${userid}`;
        if (userid != undefined && token != undefined) {
            const json = await (
                await fetch(url, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `${token}`,
                    }
                    })
                ).json();
            console.log(json);
            if (json.result == 'SUCCESS') {
                setProfile(json.data);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    return (
        (loading) ? (
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                        < CircularIndeterminate /> 
                    </Box>
                </Container>
            </ThemeProvider>
             ) : ( < Mypage profile={profile} getProfile={getProfile} /> )
        // (loading) ? ( <  Mypage data={profile} /> ) : ( < CircularIndeterminate /> )
    );
}

export default Profile;