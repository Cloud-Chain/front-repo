import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import jsonData from '../../assets/data.json';

function GridComponent() {
  const [data, setData] = useState(jsonData);

  const columns = [
    { field: 'id', headerName: '인덱스', flex: 0.5 },
    { field: 'model', headerName: '모델명', flex: 1.5 },
    { field: 'mileage', headerName: '주행거리', flex: 1 },
    { field: 'price', headerName: '가격', flex: 1 },
    { field: 'seller', headerName: '판매자', flex: 1 },
    { field: 'period', headerName: '업로드 일자', flex: 1.5 },
  ];

  return (
    <div style={{border:'2px solid', borderColor: '#888888', borderRadius: 10 }}>
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
        style={{ width: '100%' }}
      />
    </div>
  );
}

export default GridComponent;
