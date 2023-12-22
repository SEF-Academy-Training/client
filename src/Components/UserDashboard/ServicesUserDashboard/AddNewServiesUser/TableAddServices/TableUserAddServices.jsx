import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
	ServicesDataHeaderUserDashboard,
	ServicesDataUserDashboard,
	addServicesDataHeaderUserDashboard,
} from '../../../../DummyData/DummyData';
import { ourServices } from '../../../../../configs/enums';
import { createService } from '../../../../../Redux/Reducers/servicesSlice';
import { toast } from 'react-toastify';

const TableServices = () => {
	const { user } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handelAddService = async (index) => {
		// const serviceIndex = ourServices?.findIndex((e) => e._id === id);
		const newService = {
			title: ourServices[index]?.title,
			requiredPapers: ourServices[index]?.requiredPapers,
			created_by: user?._id,
		};
		console.log('newService', newService);

		try {
			await dispatch(createService(newService)).unwrap();
			navigate(
				ourServices[index]?.type === 'personal'
					? `/personalpapersuser`
					: `/companypapersuser`
			);
			toast.info('Please upload required paper');
		} catch (error) {
			console.log(error);
		}
	};

	const { t, i18n } = useTranslation();
	// const sortData = useSelector((state) => state.GlobalSlice.sortData);
	// const searchQuery = useSelector((state) => state.GlobalSlice.searchQuery);
	const mutableUsersData = [...ourServices];

	// const [selectedRows, setSelectedRows] = useState([]);
	// const [selectAll, setSelectAll] = useState(false);

	// const handleRowSelect = (id) => {
	// 	let updatedSelection = [...selectedRows];
	// 	if (updatedSelection.includes(id)) {
	// 		updatedSelection = updatedSelection.filter((rowId) => rowId !== id);
	// 	} else {
	// 		updatedSelection.push(id);
	// 	}
	// 	setSelectedRows(updatedSelection);
	// };

	// const handleSelectAll = () => {
	// 	if (selectAll) {
	// 		setSelectedRows([]);
	// 	} else {
	// 		const allIds = mutableUsersData.map((row) => row.id);
	// 		setSelectedRows(allIds);
	// 	}
	// 	setSelectAll(!selectAll);
	// };

	const DataLang = addServicesDataHeaderUserDashboard.map((data) => {
		if (i18n.language === 'ar') {
			return {
				id: data.id,
				title: data.titleAr,
			};
		}
		return data;
	});

	return (
		<Table hover className="my-3">
			<thead className="table-header">
				<tr>
					<th></th>
					<th>
						{/* <input type="checkbox" checked={selectAll} onChange={handleSelectAll} /> */}
					</th>
					{DataLang.slice(2).map((data) => (
						<th key={data.id}>{data.title}</th>
					))}
				</tr>
			</thead>
			<tbody className="table-body">
				{mutableUsersData
					// .sort((a, b) =>
					// 	sortData === 'asc'
					// 		? new Date(a.date) - new Date(b.date)
					// 		: new Date(b.date) - new Date(a.date)
					// )
					// .filter((item) =>
					// 	item.service.toLowerCase().includes(searchQuery.toLowerCase())
					// )
					.map((row, index) => (
						<tr
							key={index}
							// className={selectedRows.includes(row.id) ? 'selected-row' : ''}
						>
							<td></td>
							{/* <td>
								<input
									type="checkbox"
									onChange={() => handleRowSelect(row.id)}
									checked={selectedRows.includes(row.id)}
								/>
							</td> */}
							<td>{index + 1}</td>
							{/* Include other table data fields here */}
							<td>{row?.title}</td>
							{/* <td>{row.SerialCode}</td> */}
							<td>{row.type}</td>
							{/* <td>{row.title}</td> */}
							<td>
								{/* <Link className="btn btn-primary" to="/chat">
									Add
								</Link> */}

								<button
									className="btn btn-primary"
									onClick={() => handelAddService(index)}
								>
									Add
								</button>
							</td>
						</tr>
					))}
			</tbody>
		</Table>
	);
};

export default TableServices;
