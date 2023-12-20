import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ServicesDataHeaderUserDashboard, ServicesDataUserDashboard } from '../../../../DummyData/DummyData';

const TableServices = () => {
    const { t, i18n } = useTranslation();
    const sortData = useSelector((state) => state.GlobalSlice.sortData);
    const searchQuery = useSelector((state) => state.GlobalSlice.searchQuery);
    const mutableUsersData = [...ServicesDataUserDashboard];

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleRowSelect = (id) => {
        let updatedSelection = [...selectedRows];
        if (updatedSelection.includes(id)) {
            updatedSelection = updatedSelection.filter(rowId => rowId !== id);
        } else {
            updatedSelection.push(id);
        }
        setSelectedRows(updatedSelection);
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            const allIds = mutableUsersData.map(row => row.id);
            setSelectedRows(allIds);
        }
        setSelectAll(!selectAll);
    };

    const DataLang = ServicesDataHeaderUserDashboard.map((data) => {
        if (i18n.language === 'ar') {
            return {
                id: data.id,
                title: data.titleAr,
            };
        }
        return data;
    });

    return (
        <Table hover className='my-3'>
            <thead className="table-header">
                <tr>
                    <th></th>
                    <th>
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                        />
                    </th>
                    {DataLang.slice(2).map((data) => (
                        <th key={data.id}>{data.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="table-body">
                {mutableUsersData
                    .sort((a, b) => (sortData === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)))
                    .filter((item) => item.service.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((row) => (
                        <tr key={row.id} className={selectedRows.includes(row.id) ? 'selected-row' : ''}>
                            <td></td>
                            <td>
                                <input
                                    type="checkbox"
                                    onChange={() => handleRowSelect(row.id)}
                                    checked={selectedRows.includes(row.id)}
                                />
                            </td>
                            <td>{row.id}</td>
                            {/* Include other table data fields here */}
                            <td>{row.service}</td>
                            <td>{row.SerialCode}</td>
                            <td>{row.lastUpdate}</td>
                            <td>{row.date}</td>
                            <td>
                                <Link className='btn btn-primary' to='/chat'>
                                    {row.actionAdd}
                                </Link>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
};

export default TableServices;
