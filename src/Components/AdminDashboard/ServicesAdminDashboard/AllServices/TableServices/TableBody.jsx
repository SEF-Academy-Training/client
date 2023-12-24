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
	const { services, loading } = useSelector((state) => state.ServiceSlice);

	useEffect(() => {
		dispatch(getAllServices({}));
	}, [dispatch]);

	const handelChangeStatus = (e, id) => {
		console.log(id, { status: e.target.value });
		dispatch(updateService({ id, data: { status: e.target.value } }));
	};

	// const sortData = useSelector((state) => state.GlobalSlice.sortData);
	// const searchQuery = useSelector((state) => state.GlobalSlice.searchQuery);

	// // ---------------------- change page pagination ----------------------------
	// const [changePage, setChangePage] = useState(1);
	// const handlePageClick = (newPage) => setChangePage(newPage);
	// // ---------------------- change page pagination ----------------------------

	// useEffect(() => {
	// 	setChangePage(1);
	// 	console.log('changePage useEffect', changePage);
	// }, [searchQuery]);

	// useEffect(() => {
	// 	dispatch(
	// 		getAllServices({
	// 			page: changePage,
	// 			filter: {
	// 				$or: [
	// 					{ title: { $regex: searchQuery, $options: 'i' } },
	// 					{ tags: { $regex: searchQuery, $options: 'i' } },
	// 					{ categories: { $regex: searchQuery, $options: 'i' } },
	// 				],
	// 				// $text: { $search: searchQuery },
	// 			},
	// 		})
	// 	);
	// }, [searchQuery, changePage, dispatch]);

	// console.log('searchQuery', searchQuery);

	const { t, i18n } = useTranslation();
	const [filterData, setFilterData] = useState([]);

	const activeLink = useSelector((state) => state.AdminSlice.activeLink);

	useEffect(() => {
		let filteredData = [];

		// switch (activeLink) {
		// 	case 'unread':
		// 		filteredData = services?.filter((service) => service.status === 'pending');
		// 		break;
		// 	case 'ongoing':
		// 		filteredData = services?.filter((service) => service.status === 'ongoing');
		// 		break;
		// 	default:
		// 		filteredData = [...services];
		// 		break;
		// }

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

	return (
		<>
			{[...services]
				// filterData
				// 	.sort((a, b) =>
				// 		sortData === 'asc'
				// 			? new Date(a.date) - new Date(b.date)
				// 			: new Date(b.date) - new Date(a.date)
				// 	)
				// 	.filter((item) =>
				// 		item?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
				// 	)
				?.map((service, index) => (
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
							<h6
								onClick={() =>
									navigate('/showpapersdmindashboard', { state: service })
								}
								className={`py-1 text-decoration-none me-2 text-primary`}
								style={{ cursor: 'pointer' }}
							>
								Papers
							</h6>
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
										<option
											key={index}
											value={item}
											className={
												item === 'completed'
													? 'text-success fw-bold'
													: item === 'ongoing'
													? 'text-primary'
													: 'text-warning'
											}
										>
											{item}
										</option>
									))}
								</Form.Select>

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
				))}
		</>
	);
};

export default TableBody;
