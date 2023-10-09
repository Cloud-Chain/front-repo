import React, { useState } from 'react';
import './DashboardTable.css';
import { Tooltip } from '@mui/material';

export default function DashboardTable({ data, header, selectable=false, fontWeight=550, onRowSelect=false}) {
    const [selectedRow, setSelectedRow] = useState(null);

    return (
        <div className="dashboardTableContainer">
            <table className="dashboardTable">
                <thead>
                    <tr>
                        {selectable && <th></th>}
                        {header.map((col, index) => (
                            <th key={index}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr 
                            key={rowIndex}
                            className={selectedRow === rowIndex ? 'selected' : ''}
                            onClick={() => {
                                if(onRowSelect){
                                    setSelectedRow(selectedRow === rowIndex ? null : rowIndex);
                                    onRowSelect(row);
                                }
                            }}
                        >
                            {selectable && <td><input type="checkbox" checked={selectedRow === rowIndex} readOnly /></td>}
                            {header.map((col, colIndex) => (
                                <td key={colIndex} style={{fontWeight: fontWeight}}>
                                    {col.toLowerCase().split(' ').join('') === 'nodeflavor' ? (
                                        <Tooltip 
                                            title={
                                                <>
                                                    <div className='details'>CPU: {row.flavorDetails?.cpu}</div>
                                                    <div className='details'>RAM: {row.flavorDetails?.ram}</div>
                                                    <div className='details'>Storage: {row.flavorDetails?.storage}</div>
                                                </>
                                            }
                                            placement='right'
                                            componentsProps={{
                                                tooltip: {
                                                  sx: {
                                                    bgcolor: 'grey',
                                                    color: 'white'
                                                  },
                                                },
                                            }}
                                        >
                                            <span>{row[col.toLowerCase().split(' ').join('')]}</span>
                                        </Tooltip>
                                    ) : (
                                        row[col.toLowerCase().split(' ').join('')]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}