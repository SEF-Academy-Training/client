import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { infoMsg } from '../../../../Global/Toastify/Toastify';
// import { deleteService } from '../../../../../Redux/Reducers/AdminSlice';
import {
	deleteService,
	getAllServices,
	updateService,
} from '../../../../../Redux/Reducers/servicesSlice';
import { Form } from 'react-bootstrap';
import { enum_ServiceStatus } from '../../../../../configs/enums';

const TableBody = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { services } = useSelector((state) => state.ServiceSlice);

	useEffect(() => {
		dispatch(getAllServices({}));
	}, [dispatch]);

	const handelChangeStatus = (e, id) => {
		console.log(id, { status: e.target.value });
		dispatch(updateService({ id, data: { status: e.target.value } }));
	};

	const sortData = useSelector((state) => state.GlobalSlice.sortData);
	const searchQuery = useSelector((state) => state.GlobalSlice.searchQuery);
	// const service = useSelector((state) => state.AdminSlice.service);

	const { t, i18n } = useTranslation();
	const [filterData, setFilterData] = useState([]);

	const activeLink = useSelector((state) => state.AdminSlice.activeLink);

	useEffect(() => {
		let filteredData = [];

		switch (activeLink) {
			case 'unread':
				filteredData = services?.filter((service) => service.status === 'pending');
				break;
			case 'ongoing':
				filteredData = services?.filter(
					(service) => service.status[0] === 'Add milestone'
				);
				break;
			default:
				filteredData = [...services];
				break;
		}

		// const mappedData = filteredData.map((servData) => {
		// 	if (i18n.language === 'ar') {
		// 		return {
		// 			id: servData.id,
		// 			title: servData.titleAr,
		// 			service: servData.servicesAr,
		// 			user: servData.userAr,
		// 			SerialCode: servData.SerialCode,
		// 			date: servData.date,
		// 			action: servData.actionAr,
		// 		};
		// 	}

		// 	return servData;
		// });

		const mappedData = filteredData.map((servData) => {
			if (i18n.language === 'ar') {
				return {
					_id: servData?._id,
					title: servData?.titleAr || servData?.title,
					code: servData?.code,
					updatedAt: servData?.updatedAt,
					createdAt: servData?.createdAt,
					status: servData?.status,
				};
			}
			return servData;
		});
		console.log('mappedData', mappedData);

		setFilterData(mappedData);
	}, [activeLink, services, i18n.language]);

	// const handleDelete = (index) => {
	// 	dispatch(deleteService(index));
	// 	infoMsg(`Service of id =${index} is Deleted`);
	// };

	const handleDelete = (id) => {
		dispatch(deleteService(id));
		dispatch(getAllServices({}));
	};

	return filterData
		.sort((a, b) =>
			sortData === 'asc'
				? new Date(a.date) - new Date(b.date)
				: new Date(b.date) - new Date(a.date)
		)
		.filter((item) => item?.title?.toLowerCase().includes(searchQuery?.toLowerCase()))
		.map((service, index) => (
			<tr key={service?._id}>
				<td></td>
				<td>{index + 1}</td>
				{/* <td></td> */}
				<td>{service?.title}</td>
				<td>#{service?.code}</td>
				<td>{service?.created_by?.userName}</td>
				<td>{new Date(service?.createdAt).toLocaleDateString()}</td>
				{/* <td>{service?.status}</td> */}
				<td>
					<Link
						onClick={() => navigate('/showpapersdmindashboard', { state: service })}
						className={`py-1 text-decoration-none me-2`}
					>
						Papers
					</Link>
				</td>
				<td>
					<div className="d-flex gap-2">
						<Form.Select
							className={`w-75 ${
								service?.status === 'completed'
									? 'text-success fw-bold'
									: service?.status === 'ongoing'
									? 'text-primary'
									: 'text-warning'
							}`}
							defaultValue={service?.status}
							onChange={(e) => handelChangeStatus(e, service?._id)}
						>
							<option hidden value="">
								Select...
							</option>
							{enum_ServiceStatus?.map((item, index) => (
								<option key={index} value={item}>
									{item}
								</option>
							))}
						</Form.Select>
						{/* </td>
				<td> */}
						{/* <Link
						className={`py-1 text-decoration-none me-2 ${
							service?.status === 'completed' ? 'text-success fw-bold' : ''
						}`}
					>
						edit
						{service?.status}
					</Link> */}
						{/* </td>
				<td> */}

						<Link
							className="py-1 text-decoration-none mx-3 text-danger"
							onClick={() => handleDelete(service?._id)}
						>
							{/* {service?.status} */}
							Delete
						</Link>
					</div>
				</td>
			</tr>
		));
};

export default TableBody;
