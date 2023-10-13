import React, { useState, useEffect, useRef, useCallback } from 'react';
import CircularIndeterminate from 'components/Progress/CircularIndeterminate';
import GridComponent from './GridComponent';
import {useNavigate} from 'react-router-dom';

const InspectionDashboard = ( ) => {
  useEffect(() => {
    checkOrg();
  }, []);
  const navigate = useNavigate();
  const checkOrg = () => {
    const org = localStorage.getItem('UserId');
    if (org !== 'inspector') {
      alert("차량 검수자만 접속할 수 있는 페이지 입니다.");
      navigate("/home");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center', marginTop:30 }}>
      <GridComponent/>
    </div>
  );
};

export default InspectionDashboard;