import React, { useState,useEffect } from 'react';
import { Button, Modal, Box, FormControl, TextField,Stack,Grid, MenuItem  } from '@mui/material';
import { apiBaseUrl,bearerToken } from 'config';

const InspectionTemplate = ({ open, handleClose, row, setRow, change, setChange }) => {


  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(row);

    const apiUrl = `${apiBaseUrl}/car-info/inspec`;
    const headers = {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    };

    fetch(apiUrl, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(row),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('PATCH 요청 성공:', responseData);
        setChange(!change);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    
    handleClose();
  };

  const handleInspectionChange = (field, value) => {
    switch (field) {
      case 'inspectionStatus':
        setRow((prevRow) => ({
          ...prevRow,
          inspectionStatus: value,
        }));
        break;
      case 'vehicleBasicInfo':
        setRow((prevRow) => ({
          ...prevRow,
          vehicleBasicInfo: {
            ...prevRow.vehicleBasicInfo,
            [value.field]: value.value,
          },
        }));
        break;
      case 'vehicleDetailInfo':
        setRow((prevRow) => ({
          ...prevRow,
          vehicleDetailInfo: {
            ...prevRow.vehicleDetailInfo,
            [value.field]: value.value,
          },
        }));
        break;
      case 'images':
        setRow((prevRow) => ({
          ...prevRow,
          images: {
            ...prevRow.images,
            [value.field]: value.value,
          },
        }));
        break;
      default:
        break;
    }
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
          width: '90vh', // Adjust the width as needed
          maxHeight: '90vh', // Adjust the max height as needed
          overflowY: 'auto',
        }}
      >
        <h2 id="modal-title">검수 결과 입력란</h2>
        <hr/>
        <form onSubmit={handleSubmit}>
          <Box marginBottom={2}>
            <h3 style={{margin:'0px'}}>차량 기본 정보</h3>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="차량 식별 번호"
                    value={row.vehicleBasicInfo.vehicleIdentificationNumber}
                    onChange={(e) => 
                      handleInspectionChange('vehicleBasicInfo', {
                        field: 'vehicleIdentificationNumber',
                        value: e.target.value,
                      })}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="모델명"
                    value={row.vehicleBasicInfo.vehicleModelName}
                    onChange={(e) =>
                      handleInspectionChange('vehicleBasicInfo', {
                        field: 'vehicleModelName',
                        value: e.target.value,
                      })}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal">
              <TextField
                label="차량 번호"
                value={row.vehicleBasicInfo.vehicleRegistrationNumber}
                onChange={(e) =>
                  handleInspectionChange('vehicleBasicInfo', {
                    field: 'vehicleRegistrationNumber',
                    value: e.target.value,
                  })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="기어"
                value={row.vehicleBasicInfo.gearboxType}
                onChange={(e) =>
                  handleInspectionChange('vehicleBasicInfo', {
                    field: 'gearboxType',
                    value: e.target.value,
                  })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="연료"
                value={row.vehicleBasicInfo.fuelUsed}
                onChange={(e) =>
                  handleInspectionChange('vehicleBasicInfo', {
                    field: 'fuelUsed',
                    value: e.target.value,
                  })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="주행거리"
                value={row.vehicleBasicInfo.mileage}
                onChange={(e) =>
                  handleInspectionChange('vehicleBasicInfo', {
                    field: 'mileage',
                    value: e.target.value,
                  })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="색상"
                value={row.vehicleBasicInfo.color}
                onChange={(e) =>
                  handleInspectionChange('vehicleBasicInfo', {
                    field: 'color',
                    value: e.target.value,
                  })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="추가 옵션"
                value={row.vehicleBasicInfo.options}
                onChange={(e) =>
                  handleInspectionChange('vehicleBasicInfo', {
                    field: 'options',
                    value: e.target.value,
                  })}
              />
            </FormControl>
          </Box>
          <Box marginBottom={2}>
            <h3 style={{margin:'0px'}}>차량 상세 정보</h3>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="튜닝 유무"
                    value={row.vehicleDetailInfo.tuning}
                    onChange={(e) =>
                      handleInspectionChange('vehicleDetailInfo', {
                        field: 'tuning',
                        value: e.target.value,
                      })}
                  />
              </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="튜닝 유무"
                    value={row.vehicleDetailInfo.outerPlate}
                    onChange={(e) =>
                      handleInspectionChange('vehicleDetailInfo', {
                        field: 'outerPlate',
                        value: e.target.value,
                      })}
                  />
              </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                  <FormControl fullWidth margin="normal">
                  <TextField
                    label="외판 상태"
                    value={row.vehicleDetailInfo.vehicleFrame}
                    onChange={(e) =>
                      handleInspectionChange('vehicleDetailInfo', {
                        field: 'vehicleFrame',
                        value: e.target.value,
                      })}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="모터 상태"
                    value={row.vehicleDetailInfo.motor}
                    onChange={(e) =>
                      handleInspectionChange('vehicleDetailInfo', {
                        field: 'motor',
                        value: e.target.value,
                      })}
                  />
               </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal">
              <TextField
                label="변속기 상태"
                value={row.vehicleDetailInfo.transmission}
                onChange={(e) =>
                  handleInspectionChange('vehicleDetailInfo', {
                    field: 'transmission',
                    value: e.target.value,
                  })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="조종기 상태"
                value={row.vehicleDetailInfo.steering}
                onChange={(e) =>
                  handleInspectionChange('vehicleDetailInfo', {
                    field: 'steering',
                    value: e.target.value,
                  })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="브레이크 상태"
                value={row.vehicleDetailInfo.braking}
                onChange={(e) =>
                  handleInspectionChange('vehicleDetailInfo', {
                    field: 'braking',
                    value: e.target.value,
                  })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="전기 상태"
                value={row.vehicleDetailInfo.electricity}
                onChange={(e) =>
                  handleInspectionChange('vehicleDetailInfo', {
                    field: 'electricity',
                    value: e.target.value,
                  })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="연료 상태"
                value={row.vehicleDetailInfo.fuel}
                onChange={(e) =>
                  handleInspectionChange('vehicleDetailInfo', {
                    field: 'fuel',
                    value: e.target.value,
                  })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="외형 상태"
                value={row.vehicleDetailInfo.exterior}
                onChange={(e) =>
                  handleInspectionChange('vehicleDetailInfo', {
                    field: 'exterior',
                    value: e.target.value,
                  })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="내부 상태"
                value={row.vehicleDetailInfo.interior}
                onChange={(e) =>
                  handleInspectionChange('vehicleDetailInfo', {
                    field: 'interior',
                    value: e.target.value,
                  })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="광택 유무"
                value={row.vehicleDetailInfo.gloss}
                onChange={(e) =>
                  handleInspectionChange('vehicleDetailInfo', {
                    field: 'gloss',
                    value: e.target.value,
                  })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="휠 상태"
                value={row.vehicleDetailInfo.wheel}
                onChange={(e) =>
                  handleInspectionChange('vehicleDetailInfo', {
                    field: 'wheel',
                    value: e.target.value,
                  })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="타이어 상태"
                value={row.vehicleDetailInfo.tire}
                onChange={(e) =>
                  handleInspectionChange('vehicleDetailInfo', {
                    field: 'tire',
                    value: e.target.value,
                  })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="유리 상태"
                value={row.vehicleDetailInfo.glass}
                onChange={(e) =>
                  handleInspectionChange('vehicleDetailInfo', {
                    field: 'glass',
                    value: e.target.value,
                  })}
              />
            </FormControl>
          </Box>
          <Box marginBottom={2}>
          <h3 style={{margin:'0px'}}>차량 촬영 이미지</h3>
          <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="내측 사진"
                    value={row.images.inside}
                    onChange={(e) =>
                      handleInspectionChange('images', {
                        field: 'inside',
                        value: e.target.value,
                      })}
                  >
                  </TextField>
              </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="외측 사진"
                    value={row.images.outside}
                    onChange={(e) =>
                      handleInspectionChange('images', {
                        field: 'outside',
                        value: e.target.value,
                      })}
                  >
                  </TextField>
              </FormControl>
              </Grid>
          </Grid>       
          <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="전면 사진"
                    value={row.images.front}
                    onChange={(e) =>
                      handleInspectionChange('images', {
                        field: 'front',
                        value: e.target.value,
                      })}
                  >
                  </TextField>
              </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="좌측 사진"
                    value={row.images.left}
                    onChange={(e) =>
                      handleInspectionChange('images', {
                        field: 'left',
                        value: e.target.value,
                      })}
                  >
                  </TextField>
              </FormControl>
              </Grid>
          </Grid>  
          <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="우측 사진"
                    value={row.images.right}
                    onChange={(e) =>
                      handleInspectionChange('images', {
                        field: 'right',
                        value: e.target.value,
                      })}
                  >
                  </TextField>
              </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="후면 사진"
                    value={row.images.back}
                    onChange={(e) =>
                      handleInspectionChange('images', {
                        field: 'back',
                        value: e.target.value,
                      })}
                  >
                  </TextField>
              </FormControl>
              </Grid>
          </Grid>   
          </Box>          
          <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
            <Button type="submit" variant="contained" color="success" style={{width: 150}}>
              요청
            </Button>
            <Button onClick={handleClose} style={{width: 150, border: '1px solid'}} >닫기</Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default InspectionTemplate;
