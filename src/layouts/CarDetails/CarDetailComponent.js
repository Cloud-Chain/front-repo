import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Box, Button,Card, CardContent, Typography} from '@mui/material';
// import jsonData from '../../assets/data.json';
import SlickSlider from './SlickSlider';
import Avatar from '@mui/material/Avatar';
import BuyTransactionTemplate from "./BuyTransactionTemplate";
import ReportTemplate from "./ReportTemplate";



const CarDetailComponent = ({jsonData, setJsonData}) => {
  const [detailData, setDetailData] = useState(jsonData);
  const [images, setImages] = useState(jsonData.images);
  useEffect(() => {
    setDetailData(jsonData);
    setImages(jsonData.images);
    console.log("get Detail data  ", detailData);
    console.log("Get detail images data  ", images)
  }, [jsonData]);

  const [data, setData] = useState(JSON.parse(localStorage.getItem("carTransactionData")));
  const [open, setOpen] = useState(false);
  const [sellerReportOpen, setSellerReportOpen] = useState(false);
  const [carReportOpen, setCarReportOpen] = useState(false);
  // console.log(jsonData);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSellerReportOpen = () => {
    setSellerReportOpen(true);
  };
  const handleSellerReportClose = () => {
    setSellerReportOpen(false);
  };
  const handleCarReportOpen = () => {
    setCarReportOpen(true);
  };
  const handleCarReportClose = () => {
    setCarReportOpen(false);
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const tempData = {
    id: 1,
    uploadDate: "2023-06-28 08:11:17",
    assignor: {
      name: "John",
      residentRegistrationNumber: "1234567890",
      phoneNumber: '123-456-7890',
      address: 'Seoul'
    },
    transactionDetails: {
      transactionState: "Selling",
      vehicleRegistrationNumber: "1234",
      vehicleModelName: "Tesla Model S",
      vehicleIdentificationNumber: "5YJ3E1EA1JF00001",
      transactionAmount: 1000,
      mileage: 10000
    }
  };

  const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
      const propKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      if (typeof value === 'object' && value !== null) {
        return { ...acc, ...flattenObject(value, propKey) };
      } else {
        return { ...acc, [propKey]: value };
      }
    }, {});
  };

  const flattenedData = flattenObject(data);

  const labelMap = {
    'id': 'ID',
    'period': '업로드 날짜',
    'seller': '판매자 이름',
    'assignor.residentRegistrationNumber': '판매자 주민등록번호',
    'phoneNumber': '판매자 전화번호',
    'address': '판매자 주소',
    'transactionState': '판매 상태',
    'residentRegistrationNumber': '차량 등록번호',
    'model': '차량 모델명',
    'vehicleIdentificationNumber': '차량 식별번호',
    'price': '거래 금액',
    'mileage': '주행거리',
    // 'id': 'ID',
    // 'uploadDate': '업로드 날짜',
    // 'assignor.name': '판매자 이름',
    // 'assignor.residentRegistrationNumber': '판매자 주민등록번호',
    // 'assignor.phoneNumber': '판매자 전화번호',
    // 'assignor.address': '판매자 주소',
    // 'transactionDetails.transactionState': '판매 상태',
    // 'transactionDetails.vehicleRegistrationNumber': '차량 등록번호',
    // 'transactionDetails.vehicleModelName': '차량 모델명',
    // 'transactionDetails.vehicleIdentificationNumber': '차량 식별번호',
    // 'transactionDetails.transactionAmount': '거래 금액',
    // 'transactionDetails.mileage': '주행거리',
  };

  const subheadingStyles = {
    fontWeight: 'bold',
    marginTop: '16px',
  };

  const pairStrings = Object.entries(flattenedData).map(([key, value]) => {
    const modifiedKey = labelMap[key] || key;
    return `${modifiedKey}: ${value}`;
  });

  return (
    <div style={containerStyles}>
      <h1>차량 판매 정보</h1>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={12} style={{ padding: '16px' }}>
          <SlickSlider carImages={images} setCarImages={setImages} />
        </Grid>
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
                  <Button variant="contained" color="primary" size="middle" style={{ marginLeft:'20px'}} onClick={handleSellerReportOpen}>신고하기</Button>
                </Typography>
                <ReportTemplate type={"판매자"} reportOpen={sellerReportOpen} handleReportClose={handleSellerReportClose}/>
                {pairStrings.slice(0, 5).map((pairString, index) => {
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
        <Grid item xs={12} style={{ padding: '16px' }}>
          <Box sx={{
            margin: '0 auto',
            border: '2px solid',
            borderRadius: '10px',
            borderColor:'grey.300',
          }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={subheadingStyles}>
                  차량 상세 정보
                  <Button variant="contained" color="primary" size="middle" style={{ marginLeft:'20px'}} onClick={handleCarReportOpen}>신고하기</Button>
                </Typography>
                <ReportTemplate type={"차량"} reportOpen={carReportOpen} handleReportClose={handleCarReportClose}/>
                {pairStrings.slice(5).map((pairString, index) => {
                  const [key, value] = pairString.split(': ');
                  return (
                    <Typography key={index} sx={{ marginTop: '8px' }}>
                      <span style={{ color: 'grey', fontWeight: 'bold' }}>{key}</span>: <span>{value}</span>
                    </Typography>
                  )
                })}
                <Button variant="contained" color="primary" size="large" fullWidth style={{marginTop:'16px'}} onClick={handleOpen}>거래하기</Button>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
      <BuyTransactionTemplate open={open} handleClose={handleClose}/>
    </div>
  );
};

export default CarDetailComponent;
