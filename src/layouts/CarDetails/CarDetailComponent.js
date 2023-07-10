import React, { useState } from 'react';
import {useParams} from 'react-router-dom'
import jsonData from '../../assets/data.json';

const CarDetailComponent = () => {
    const { id } = useParams(); // Access the ID parameter from the URL
    const [data, setData] = useState(jsonData[id]);
    console.log(data)
    return (
        <div>
            <h2>Item Details for ID: {id}</h2>
        </div>
    )

}

export default CarDetailComponent;