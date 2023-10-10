import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { Box, Button, Card, CardContent, Typography, Grid, Link, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignIn from './SignIn'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function Mypage({profile, setProfile}) {
    const [data, setData] = useState(null);
    const [profileData, setProfileData] = useState([]);
    useEffect(() => {
        setData(profile);
        console.log("In mypage 1 ", data);
        console.log("In mypage 2 ", profile);
        // setProfile();
    }, [profile]);
    const navigate = useNavigate()

    const nav = (url) => {
        console.log("check for nav");
        navigate(url)
    }
    useEffect(() => {
        if (data !== null) {
            setPairData();
            console.log("In mypage 3 ", profileData);
        }
    }, [data]);

    const containerStyles = {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };
    const subheadingStyles = {
        fontWeight: 'bold',
        marginTop: '16px',
    };
    const labelMap = {
        'userid': 'User ID',
        'org': '사용자 구분',
        'name': '사용자 이름',
        'email': '사용자 이메일',
        'detail': '설명',
    };
    const setPairData = () => {
        const pairStrings = Object.entries(data).map(([key, value]) => {
            // console.log("check modikey ",labelMap[key]);
            if (labelMap[key] !== undefined) {
                const modifiedKey = labelMap[key];
                return `${modifiedKey}: ${value}`;
            } else { return null; }
        }).filter(pair => pair !== null);
        setProfileData(pairStrings);
        console.log("In mypage 4 ", profileData);
    };

    return (
        (data != null) ? (
            <div style={containerStyles}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={4} style={{ padding: '16px' }}>
                        <Box sx={{ maxWidth: '100%', margin: '0 auto', border: '2px solid', borderRadius: '10px', height:'100%', borderColor:'grey.300' }}>
                            <Card style={{height:'100%'}}>
                                <CardContent>
                                    <Avatar alt="Profile Image" src="/static/images/avatar/1.jpg" />
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} style={{ padding: '16px' }}>
                        <Box sx={{ maxWidth: '100%', margin: '0 auto', border: '2px solid', borderRadius: '10px', height:'100%', borderColor:'grey.300' }}>
                            <Card style={{height:'100%'}}>
                                <CardContent>
                                    <Typography variant="h6" sx={subheadingStyles}>
                                        판매자 정보
                                    </Typography>
                                    {profileData.map((pairString, index) => {
                                    const [key, value] = pairString.split(': ');
                                    return (
                                        <Typography key={index} sx={{ marginTop: '8px' }}>
                                            <span style={{ color: 'grey', fontWeight: 'bold' }}>{key}</span>: <span>{value}</span>
                                        </Typography>
                                    )
                                    })}
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        )
        : ( <SignIn /> )
    );
};
export default Mypage;