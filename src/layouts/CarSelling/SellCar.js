import React, { useState } from 'react';
import { Button } from '@mui/material';

import TransactionProcess from './TransactionProcess';
import SellTransactionTemplate from './SellTransactionTemplate';

const SellCar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    const org = localStorage.getItem('Org');
    if (org === 'buyer') {
      alert("구매자는 차량 판매를 할 수 없습니다.");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', marginTop:"60px", flexDirection: 'column', alignItems: 'center', justifyContent:'center' }}>
      <TransactionProcess />
      <SellTransactionTemplate open={open} handleClose={handleClose} />
      <Button type="submit" variant="contained" color="success" onClick={handleOpen} style={{width: 300,margin: 20, marginTop:"40px"}}>
        차량 판매하기
      </Button>
    </div>
  );
};

export default SellCar;
