import React, { useState } from 'react';
import { Button, Modal, Box, FormControl, TextField,Stack,Grid, MenuItem  } from '@mui/material';
import { LocalizationProvider, DesktopDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const SellTransactionTemplate = ({ open, handleClose }) => {
  const [assignor, setAssignor] = useState({
    name: '',
    residentRegistrationNumber: '',
    phoneNumber: '',
    address: '',
  });

  const [transactionDetails, setTransactionDetails] = useState({
    vehicleRegistrationNumber: '',
    vehicleModelName: '',
    vehicleIdentificationNumber: '',
    transactionAmount: '',
    vehicleDeliveryDate: dayjs(),
    vehicleDeliveryAddress: '',
    mileage: '',
  });
  const [inspection, setInspection] = useState({
    inspectionOffice: '',
    inspectionDate: dayjs(),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      assignor,
      transactionDetails,
      inspection,
    };
    console.log(data);
    // Reset state here if necessary
    handleClose();
  };

  const handleAssignorChange = (field, value) => {
    setAssignor((prevAssignor) => ({
      ...prevAssignor,
      [field]: value,
    }));
  };

  const handleTransactionDetailsChange = (field, value) => {
    setTransactionDetails((prevTransactionDetails) => ({
      ...prevTransactionDetails,
      [field]: value,
    }));
  };
  const handleInspectionChange = (field, value) => {
    setInspection((prevInspection) => ({
      ...prevInspection,
      [field]: value,
    }));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)', // Adjusted boxShadow for a more three-dimensional look
          width: '80vh', // Adjust the width as needed
          maxHeight: '80vh', // Adjust the max height as needed
          overflowY: 'auto',
        }}
      >
        <h2 id="modal-title">판매 요청 명세서</h2>
        <hr/>
        <form onSubmit={handleSubmit}>
          {/* Assignor Fields */}
          <Box marginBottom={2}>
            <h3>판매자 정보</h3>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="이름"
                    value={assignor.name}
                    onChange={(e) => handleAssignorChange('name', e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="주민등록번호"
                    value={assignor.residentRegistrationNumber}
                    onChange={(e) =>
                      handleAssignorChange('residentRegistrationNumber', e.target.value)
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal">
              <TextField
                label="연락처"
                value={assignor.phoneNumber}
                onChange={(e) => handleAssignorChange('phoneNumber', e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="주소"
                value={assignor.address}
                onChange={(e) => handleAssignorChange('address', e.target.value)}
              />
            </FormControl>
          </Box>
          {/* Transaction Details Fields */}
          <Box marginBottom={2}>
            <h3>차량 정보</h3>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="차량 번호"
                    value={transactionDetails.vehicleRegistrationNumber}
                    onChange={(e) =>
                      handleTransactionDetailsChange('vehicleRegistrationNumber', e.target.value)
                    }
                  />
              </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="모델명"
                    value={transactionDetails.vehicleModelName}
                    onChange={(e) =>
                      handleTransactionDetailsChange('vehicleModelName', e.target.value)
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                  <FormControl fullWidth margin="normal">
                  <TextField
                    label="차대번호"
                    value={transactionDetails.vehicleIdentificationNumber}
                    onChange={(e) =>
                      handleTransactionDetailsChange('vehicleIdentificationNumber', e.target.value)
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="주행거리"
                    value={transactionDetails.mileage}
                    onChange={(e) =>
                      handleTransactionDetailsChange('mileage', e.target.value)
                    }
                  />
               </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal">
              <TextField
                label="판매 금액"
                value={transactionDetails.transactionAmount}
                onChange={(e) =>
                  handleTransactionDetailsChange('transactionAmount', e.target.value)
                }
              />
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="차량 인도 주소"
                      value={transactionDetails.vehicleDeliveryAddress}
                      onChange={(e) =>
                        handleTransactionDetailsChange('vehicleDeliveryAddress', e.target.value)
                      }
                    >
                    </TextField>
                  </FormControl>
                </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDateTimePicker
                      label="차량 인도 가능일"
                      value={transactionDetails.vehicleDeliveryDate}
                      onChange={(newValue) =>
                        handleInspectionChange('vehicleDeliveryDate', newValue)
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
          </Grid>
          </Box>
          <Box marginBottom={2}>
          <h3>검수 요청</h3>
          <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="검수 지점"
                    select
                    value={inspection.inspectionOffice}
                    onChange={(e) => handleInspectionChange('inspectionOffice', e.target.value)}
                  >
                    <MenuItem value="seoul">서울 지점</MenuItem>
                    <MenuItem value="daegeon">대전 지점</MenuItem>
                    <MenuItem value="daegu">대구 지점</MenuItem>
                    <MenuItem value="pusan">부산 지점</MenuItem>  
                  </TextField>
              </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDateTimePicker
                      label="검수 일자"
                      value={inspection.inspectionDate}
                      onChange={(newValue) =>
                        handleInspectionChange('inspectionDate', newValue)
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
          </Grid>         
          </Box>          
          <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
            <Button type="submit" variant="contained" color="success" style={{width: 150}}>
              요청 전송
            </Button>
            <Button onClick={handleClose} style={{width: 150, border: '1px solid'}} >닫기</Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default SellTransactionTemplate;
