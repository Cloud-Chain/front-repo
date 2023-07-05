import React from 'react';
import {useNavigate} from 'react-router-dom'
import {  Button } from '@mui/material';
import { Home, Search, NotificationsNone, MailOutline, BookmarkBorder, ListAlt, PermIdentity } from '@mui/icons-material';

import "./sidebar.css";
import SidebarLink from "./SidebarLink";

function Sidebar(){
  const navigate = useNavigate()

  const nav = (url) => {
    navigate(url)
  }

  return(

    <div className="sidebar" style={{backgroundColor: "#e3e3e3"}}>
      <SidebarLink text="Home" Icon={Home} onClick={() => nav('/home')} />
      <SidebarLink text="Explore" Icon={Search} onClick={() => nav('/explore')} />
      <SidebarLink text="Lists" Icon={ListAlt} onClick={() => nav('/lists')} />
      <SidebarLink text="Notifications" Icon={NotificationsNone} onClick={() => nav('/notifications')} />
      <SidebarLink text="Messages" Icon={MailOutline} onClick={() => nav('/messages')} />
      <SidebarLink text="Profile" Icon={PermIdentity} onClick={() => nav('/profile')} />
      <SidebarLink text="Bookmarks" Icon={BookmarkBorder} onClick={() => nav('/bookmarks')} />
      {/*<Button id="tweet">*/}
      {/*  Tweet*/}
      {/*</Button>*/}
    </div>
  );
}

export default Sidebar;