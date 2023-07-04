import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import { Drawer, Button } from '@mui/material';
import { Home, Search, NotificationsNone, MailOutline, BookmarkBorder, ListAlt, PermIdentity } from '@mui/icons-material';

import "./sidebar.css";
import SidebarLink from "./SidebarLink";

function Sidebar(){
  const navigate = useNavigate()
  const [selectedRoute, setSelectedRoute] = useState('');

  const nav = (url) => {
    navigate(url)
  }

  return(

    <div className="sidebar">
      <SidebarLink text="Home" Icon={Home} onClick={() => nav('/home')} />
      <SidebarLink text="Explore" Icon={Search} onClick={() => nav('/explore')} />
      <SidebarLink text="Notifications" Icon={NotificationsNone} onClick={() => nav('/notifications')} />
      <SidebarLink text="Messages" Icon={MailOutline} onClick={() => nav('/messages')} />
      <SidebarLink text="Bookmarks" Icon={BookmarkBorder} onClick={() => nav('/bookmarks')} />
      <SidebarLink text="Lists" Icon={ListAlt} onClick={() => nav('/lists')} />
      <SidebarLink text="Profile" Icon={PermIdentity} onClick={() => nav('/profile')} />
      <Button id="tweet">
        Tweet
      </Button>
    </div>
  );
}

export default Sidebar;