import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuItem, Box, Avatar, Typography, Icon } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const gatewayUrl = "http://k8s-default-gateway-9a160cbbd6-1416826963.ap-northeast-2.elb.amazonaws.com";

export default function Navbar() {
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [profile, setProfile] = useState(null);

    // 테스트 코드
    // const [profile, setProfile] = useState({
    //     "userid": "jae",
    //     "email": "jae@naver.com",
    //     "org": "seller",
    //     "name": "jae",
    //     "detail": "",
    //     "businessRegistration": "https://pnu-studyhub.s3.ap-northeast-2.amazonaws.com/2023-10-10_jae",
    //     "reportHistory": null
    // // });
    // const userid = 'jae1';
    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImphZSIsIm5hbWUiOiJqYWUiLCJjZXJ0IjoiXCItLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS1cXG5NSUlDbGpDQ0FqeWdBd0lCQWdJVUhoSiswVnBpcC85cXlRRDY2YzQ3TXNndEpiMHdDZ1lJS29aSXpqMEVBd0l3XFxuYURFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRS1xcbkV3dEllWEJsY214bFpHZGxjakVQTUEwR0ExVUVDeE1HUm1GaWNtbGpNUmt3RndZRFZRUURFeEJtWVdKeWFXTXRcXG5ZMkV0YzJWeWRtVnlNQjRYRFRJek1UQXdPREV3TWpBd01Gb1hEVEkwTVRBd09ERTJNemt3TUZvd1d6RUxNQWtHXFxuQTFVRUJoTUNWVk14RnpBVkJnTlZCQWdURGs1dmNuUm9JRU5oY205c2FXNWhNUlF3RWdZRFZRUUtFd3RJZVhCbFxcbmNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1kyeHBaVzUwTVF3d0NnWURWUVFERXdOcVlXVXdXVEFUQmdjcWhrak9cXG5QUUlCQmdncWhrak9QUU1CQndOQ0FBVG9Fd1pvZDVsKzdsajdieXlzK3UvbXBCT24xeWc3ZlpONk12WXZjNUpJXFxudVlJcm82c0ZQaWZHVUlCNXg5ZUwySm5rZG1VZC9uY1lRdmprZ1FSdUlEMkhvNEhRTUlITk1BNEdBMVVkRHdFQlxcbi93UUVBd0lIZ0RBTUJnTlZIUk1CQWY4RUFqQUFNQjBHQTFVZERnUVdCQlFGS3NpOE0zaFJ3QmREUkt6cnp0TFNcXG56L0xKQmpBZkJnTlZIU01FR0RBV2dCVHVhNWp0aDFJOUhUdExkZFhKRno1Z3I5SjFUakFWQmdOVkhSRUVEakFNXFxuZ2dwaWJHOWphMk5vWVdsdU1GWUdDQ29EQkFVR0J3Z0JCRXA3SW1GMGRISnpJanA3SW1obUxrRm1abWxzYVdGMFxcbmFXOXVJam9pSWl3aWFHWXVSVzV5YjJ4c2JXVnVkRWxFSWpvaWFtRmxJaXdpYUdZdVZIbHdaU0k2SW1Oc2FXVnVcXG5kQ0o5ZlRBS0JnZ3Foa2pPUFFRREFnTklBREJGQWlFQThsL1ZzVjhzODlWV29LUEFpSlRuSTg2VmtVRXVwUGdxXFxuRGl6dkp1b3BiRWNDSURhODdER2tlRi9RRzNDWXB5RXFTZGVLN0w2MkltMERISUx0U3VMSVZvWjZcXG4tLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tXFxuXCIiLCJvcmciOiJzZWxsZXIiLCJpYXQiOjE2OTY4ODUzNjQsImV4cCI6MTY5Njg4ODk2NH0.CC4JCRyiX0ap_vMO0G7JxISA05qOqcVCPk9F1KumGEk';
    const userid = localStorage.getItem('UserId');
    const token = localStorage.getItem('Authorization');
    
    const url = `${gatewayUrl}/auth/get-profile/?userid=${userid}`;

    useEffect(() => {
        const fetchProfile = async () => {
            if (userid && token) {
                try {
                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': token,
                        }
                    });
                    const json = await response.json();

                    if (json.result === 'SUCCESS') {
                        setProfile(json.data);
                    } else {
                        setProfile(null);
                    }
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching profile:", error);
                    setProfile(null);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userid, token, url]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="navbarContainer">
            {!loading && (
                <Box display="flex" justifyContent="flex-end" alignItems="center">
                    {profile && profile.org && (
                        <Typography variant="caption" style={{ marginRight: '20px', fontSize: '1rem', color: 'grey' }}>
                            org: {profile.org}
                        </Typography>
                    )}
                    {profile ? (
                        <Avatar 
                            onClick={handleClick} 
                            sx={{ 
                                cursor: 'pointer', 
                                backgroundColor: 'primary.main',
                                width: 50, 
                                height: 50 
                            }}
                        >
                            {profile.name}
                        </Avatar>
                    ) : (
                        <Icon onClick={handleClick} sx={{padding:'8px'}}>
                            <AccountCircleIcon fontSize='large'/>
                        </Icon>
                    )}
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {profile ? (
                            <>
                                <MenuItem onClick={handleClose} component={Link} to="/profile">
                                    <Typography variant="body1">내 프로필</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to="/logout">
                                    <Typography variant="body1">로그아웃</Typography>
                                </MenuItem>
                            </>
                        ) : (
                            <MenuItem onClick={handleClose} component={Link} to="/login">
                                <Typography variant="body1">로그인</Typography>
                            </MenuItem>
                        )}
                    </Menu>
                </Box>
            )}
        </div>
    );
}