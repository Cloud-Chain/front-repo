import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuItem, Box, Avatar, Typography, Icon } from '@mui/material';
import { useAuth } from 'common/AuthContext';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const gatewayUrl = "http://k8s-default-gateway-9a160cbbd6-1416826963.ap-northeast-2.elb.amazonaws.com";

export default function Navbar() {
    const navigate = useNavigate()
    const {user, logout} = useAuth()
    const [anchorEl, setAnchorEl] = useState(null);
    console.log(user)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="navbarContainer">
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            {user && user.org && (
              <Typography variant="caption" style={{ marginRight: '20px', fontSize: '1rem', color: 'grey' }}>
                org: {user.org}
              </Typography>
            )}
            {user ? (
              <Avatar 
                onClick={handleClick} 
                sx={{ 
                  cursor: 'pointer', 
                  backgroundColor: 'primary.main',
                  width: 50, 
                  height: 50 
                }}
              >
                {user.name}
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
                    {user ? (
                        <>
                            <MenuItem onClick={handleClose} component={Link} to="/profile">
                                <Typography variant="body1">내 프로필</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/logout">
                                <Typography variant="body1">로그아웃</Typography>
                            </MenuItem>
                        </>
                    ) : (
                        <MenuItem onClick={handleClose} component={Link} to="/signin">
                            <Typography variant="body1">로그인</Typography>
                        </MenuItem>
                    )}
                </Menu>
            </Box>
        </div>
    );
}