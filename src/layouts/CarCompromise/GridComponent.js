import React, { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import jsonData from '../../assets/ixData.json';
import {  org, userName, apiBaseUrl,bearerToken } from 'config';
import CircularIndeterminate from 'components/Progress/CircularIndeterminate';
import { Button } from '@mui/material';
import CompromiseTemplate from './CompromiseTemplate';
import { useNavigate } from 'react-router-dom';


function GridComponent() {
  const navigate = useNavigate();
  const [loadingData, setLoadingData] = useState(false); // Add this state
  const [transactions, setTransactions] = useState([])
  const [data, setData] = useState(jsonData);
  const [change, setChange] = useState(false)
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState({
    id: 1,
    uploadDate: '2023-10-08 09:02:07',
    assignor: {
      name: 'jeho',
      residentRegistrationNumber: '990227',
      phoneNumber: '01090909090',
      address: '부산대',
    },
    assignee: {
      name: '',
      residentRegistrationNumber: '',
      phoneNumber: '',
      address: '',
    },
    transactionDetails: {
      transactionState: 'sellerRequest',
      vehicleRegistrationNumber: '123',
      newVehicleRegistrationNumber: '',
      vehicleModelName: '테슬라',
      vehicleIdentificationNumber: '1111',
      transactionDate: '',
      transactionAmount: 1000,
      balancePaymentDate: '',
      vehicleDeliveryDate: '',
      vehicleDeliveryAddress: '',
      mileage: 5798,
    },
  });
  
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {   
    getNewDatas(setTransactions, data, setData,transactions)
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정

  useEffect(() => {
    setLoadingData(true); // Set loading to true before fetching data

    getNewDatas(setTransactions, data, setData, transactions)
      .finally(() => setLoadingData(false)); // Set loading to false when the fetch is complete
  }, [change]);
 

  const columns = [
    { field: 'id', headerName: '인덱스', flex: 0.5 },
    { field: 'model', headerName: '모델명', flex: 1.5 },
    { field: 'mileage', headerName: '주행거리', flex: 1 },
    { field: 'transactionAmount', headerName: '가격', flex: 1 },
    { field: 'period', headerName: '업로드 일자', flex: 1.5 },
    { field: 'transactionState', headerName: '거래 상태', flex: 1.5 },
    { 
      field: 'compromise', 
      headerName: '거래 조정', 
      flex: 1.5,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            style={{
              backgroundColor: (() => {
                if (params.row.transactionState === 'SoldOut') {
                  return '#D3D3D3';
                } else if (params.row.transactionState === `${org.charAt(0).toUpperCase() + org.slice(1)}Request`) {
                  return '#FFA726';
                } else {
                  return '#FFD54F'; // 이 색상은 예시일뿐, 필요에 따라 변경 가능
                }
              })(),
              color: '#000', // 텍스트 색상
              marginRight: 8,
            }}
            onClick={(event) => handleAdjustTransaction(event,params.row)}
            disabled={params.row.transactionState === 'SoldOut'} 
          >
            {(() => {
              if (params.row.transactionState === 'SoldOut') {
                return '거래 완료';
              } else if (params.row.transactionState === `${org.charAt(0).toUpperCase() + org.slice(1)}Request`) {
                return '처리 중';
              } else {
                return '조정 요청';
              }
            })()}
          </Button>
        </div>
      ),
    },
  ];

  const handleAdjustTransaction = (event,row) => {
    event.stopPropagation();
    const foundTransaction = transactions.find(obj => obj.id == row.id);
    console.log(foundTransaction);
    setRow(foundTransaction)
    handleOpen()
  };

  const handleRowClick = (row) => {
    console.log(row)
    const id = row.id;
    navigate(`/buy/${id}`);
  };

  return (
    <div style={{ width: '90%', border: '2px solid', borderColor: '#888888', borderRadius: 10 }}>
      {loadingData && <CircularIndeterminate />} {/* Show loading indicator */}
      <DataGrid
        rows={data}
        columns={columns}
        autoHeight
        columnBuffer={5}
        // pageSizeOptions={[5, 10, 20]}
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        onRowClick={handleRowClick}
        style={{ width: '100%' }}
      />
      <CompromiseTemplate open={open} handleClose={handleClose} row={row} setRow={setRow} change={change} setChange={setChange} />
    </div>
  );
}

function getNewDatas(setTransactions, data, setData, transactions) {
  const apiUrl = `${apiBaseUrl}/contract/get-contract-user?userid=${userName}`;
  const headers = {
    Authorization: `Bearer ${bearerToken}`,
  };

  return fetch(apiUrl, { headers })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((fetchedData) => {
      setTransactions(fetchedData.data);
      const filteredData = fetchedData.data.filter((item) => item.transactionDetails.transactionState.endsWith("Request"))
      // const filteredData = fetchedData.data.filter((item) =>
      //   (item.transactionDetails.transactionState === "sellerRequest" && item.assignor.name === userName) ||
      //   (item.transactionDetails.transactionState === "buyerRequest" && item.assignor.name === userName)
      // );
      const modifiedData = fetchedData.data.map((item) => {
        return {
          id: item.id,
          model: item.transactionDetails.vehicleModelName,
          mileage: item.transactionDetails.mileage,
          transactionAmount: item.transactionDetails.transactionAmount,
          period: item.uploadDate,
          transactionState: item.transactionDetails.transactionState,
        };
      });
      setData(modifiedData);
      console.log(fetchedData.data)
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

export default GridComponent;
