import React, { useState, useEffect } from 'react';
import FilterForm from './FilterForm'
import GridComponent from './GridComponent'
import dayjs from 'dayjs';

const SearchDashboard = ( ) => {

  useEffect(() => {
    getCarList(false);
  }, []);

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    status:'SellerRequest',
    priceFilter: false,
    mileageFilter: false,
    model: '',
    assignor: '',
    periodRangeStart: dayjs().subtract(1, "y").format('YYYY-MM-DD'),
    periodRangeEnd: dayjs().format('YYYY-MM-DD'),
    priceRangeStart: '',
    priceRangeEnd: '',
    mileageRangeStart: '',
    mileageRangeEnd: '',
  });

  const getData = (filterData) => {
    setFilters(filterData);
    console.log("in dashboard  ", filterData);
    getCarList(true);
  };

  const getCarList = async (type) => {
    // console.log(localStorage.getItem('Authorization'));
    const url = `http://localhost:8000/contract/get-contract`;
    const json = await (
      await fetch(url, {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          'Authorization': localStorage.getItem('Authorization'),
        },
          body: JSON.stringify({
            filter: type,
            priceFilter: filters.priceFilter,
            mileageFilter: filters.mileageFilter,
            model: filters.model,
            status: filters.status,
            assignor: filters.assignor,
            periodRangeStart: filters.periodRangeStart,
            periodRangeEnd: filters.periodRangeEnd,
            priceRangeStart: filters.priceRangeStart,
            priceRangeEnd: filters.priceRangeEnd,
            mileageRangeStart: filters.mileageRangeStart,
            mileageRangeEnd: filters.mileageRangeEnd,
          })
        })
      ).json();
    console.log(json);
    if (json.result == 'SUCCESS') {
      localStorage.getItem('Authorization', 'Bearer '+json.data.accessToken);
      setData(json.data);
      // alert("로그인");
    } else {
      // alert("로그인 실패");
    }
  };

  return (
    <div>
      <FilterForm getData={getData} />
      <GridComponent data={data} setData={setData}/>
    </div>
  );
};

export default SearchDashboard;