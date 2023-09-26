import React, { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import jsonData from '../../assets/ixData.json';
import { apiBaseUrl,bearerToken } from 'config';
import Button from '@mui/material/Button'; // Material UI의 Button 컴포넌트를 import
import InspectionTemplate from './InspectionTemplate';

function GridComponent() {
  const [change, setChange] = useState(false)
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState({
    id: 0, // 인덱스
    inspectionStatus: false, // 검수 상태
    requestDate: '2023-07-01', // 요청 일자
    inspectionDate: '2023-07-26', // 검수 일자
    vehicleBasicInfo: {
      vehicleIdentificationNumber: '1HGCM82633A123456', // 차량 식별 번호
      vehicleModelName: 'Toyota Camry', // 차량 모델명
      vehicleRegistrationNumber: 'ABCD123', // 차량 번호
      gearboxType: 'Automatic', // 기어 종류
      fuelUsed: 'Gasoline', // 사용 연료 종류
      mileage: 10000, // 주행거리
      color: 'Silver', // 색상
      options: 'Navigation, Leather Seats, Sunroof', // 차량 옵션
    },
    vehicleDetailInfo: {
      tuning: 'None', // 튜닝 정보
      outerPlate: 'Good', // 외판 상태
      vehicleFrame: 'Intact', // 프레임 상태
      motor: 'Engine in good condition', // 모터
      transmission: 'Smooth', // 변속기
      steering: 'Responsive', // 조종
      braking: 'Effective', // 브레이크
      electricity: 'All electrical systems functional', // 전기
      fuel: 'No leaks or issues', // 연료
      exterior: 'Clean and well-maintained', // 외형 상태 , 익스테리어
      interior: 'Neat and tidy', // 내부 상태, 인테리어
      gloss: 'Shiny', // 광택
      wheel: 'Good condition', // 휠
      tire: 'Adequate tread depth', // 타이어
      glass: 'No cracks or chips', // 유리
    },
    images: {
      inside: 'https://example.com/car_images/inside.jpg', // 내부 이미지
      outside: 'https://example.com/car_images/outside.jpg', // 외부 이미지
      front: 'https://example.com/car_images/front.jpg', // 전면 이미지
      left: 'https://example.com/car_images/left.jpg', // 좌측 이미지
      right: 'https://example.com/car_images/right.jpg', // 우측 이미지
      back: 'https://example.com/car_images/back.jpg', // 후면 이미지
    },
    etc: 'I think...', // 기타 검수자 소견
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [inspections, setInspections] = useState([])
  const [data, setData] = useState(jsonData);


  useEffect(() => {   
    getNewDatas(setInspections, data, setData,inspections)
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정

  // useEffect를 사용하여 row의 변화를 감지
  useEffect(() => {
    // row가 변경될 때 실행될 로직을 여기에 작성
    console.log('row이 변경되었습니다:', row);
    getNewDatas(setInspections,data,  setData,inspections)
    // 여기에서 원하는 작업을 수행할 수 있습니다.
  }, [change]); // row를 의존성 배열로 설정

  const columns = [
    { field: 'vehicleIdentificationNumber', headerName: '차량 식별번호', flex: 1.5 },
    { field: 'requestDate', headerName: '검수 요청 일자', flex: 1.5 },
    { field: 'vehicleModelName', headerName: '모델명', flex: 1.5 },
    { field: 'vehicleRegistrationNumber', headerName: '차량 번호', flex: 1.5 },
    { field: 'mileage', headerName: '주행거리', flex: 1 },
    { field: 'gearboxType', headerName: '기어', flex: 1 },
    { field: 'fuelUsed', headerName: '사용 연료', flex: 1 },
    { field: 'color', headerName: '색상', flex: 1 },
    { field: 'options', headerName: '추가 옵션', flex: 1.5 },
    {
      field: '검수 결과 입력',
      headerName: '검수 결과 입력',
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="success"
            onClick={() => handleResultInputClick(params.row)}
          >
            결과 입력
          </Button>
        );
      },
    },
  ];

  const handleRowClick = (params) => {
    const id = params.row.id;
    // navigate(`/buy/${id}`);
  };

  const handleResultInputClick = (row) => {
    // 결과 입력 버튼 클릭 시 실행할 동작 추가
    const foundInspection = inspections.find(obj => obj.id == row.id);
    console.log(foundInspection);
    setRow(foundInspection)
    handleOpen()
  };

  return (
    <div style={{ border: '2px solid', borderColor: '#888888', borderRadius: 10 }}>
      <DataGrid
        rows={data}
        columns={columns}
        autoHeight
        columnBuffer={5}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        onRowClick={handleRowClick}
        style={{ width: '100%' }}
      />
      <InspectionTemplate open={open} handleClose={handleClose} row={row} setRow={setRow} change={change} setChange={setChange} />
    </div>
  );
}

function getNewDatas(setInspections, data,setData, inspections) {
  const apiUrl = `${apiBaseUrl}/car-info/inspec-all`;

  // Bearer 토큰을 헤더에 추가
  const headers = {
    // Authorization: `Bearer ${bearerToken}`,
    Authorization: `Bearer ${bearerToken}`,
  };

  fetch(apiUrl, { headers })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // JSON 데이터로 변환
  })
  .then((fetchedData) => {
    setInspections(fetchedData.data)
    console.log(inspections)
    // 데이터를 성공적으로 가져왔을 때 처리
    const filteredData = fetchedData.data.filter((item) => !item.inspectionStatus);
    
    console.log(filteredData)
    const modifiedData = filteredData.map((item) => ({
      id: item.id,
      requestDate: item.requestDate,
      ...item.vehicleBasicInfo,
    }));
    setData(modifiedData); // 데이터를 상태에 저장
    
  })
  .catch((error) => {
    // 오류 처리
    console.error("There was a problem with the fetch operation:", error);
  });
}

export default GridComponent;
