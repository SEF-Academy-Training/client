import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ServicesDataUserDashboard } from '../../../DummyData/DummyData';
import { getAllServices } from '../../../../Redux/Reducers/servicesSlice';

const TableBodyAllServices = () => {
	const dispatch = useDispatch();
	const { services } = useSelector((state) => state.ServiceSlice);
	console.log('services', services);

	useEffect(() => {
		dispatch(getAllServices({}));
	}, []);

	const sortData = useSelector((state) => state.GlobalSlice.sortData);
	const searchQuery = useSelector((state) => state.GlobalSlice.searchQuery);
	const activeLink = useSelector((state) => state.UserSlice.activeLink);
	// const service = useSelector((state) => state.UserSlice.service);

	const { t, i18n } = useTranslation();
	const [filterData, setFilterData] = useState(services);

	// console.log('Service:', service);
	console.log('filterData:', filterData);
	console.log('Active Link:', activeLink);
	console.log('Language:', i18n.language);

	useEffect(() => {
		let updatedData = [...services];
		if (activeLink === 'ongoing') {
			// updatedData = updatedData.filter((item) => item.action === 'details');
			updatedData = updatedData.filter((item) => item.status === 'ongoing');
		}
		// 	updatedData = updatedData.map((servData) => {
		// 		if (i18n.language === 'ar') {
		// 			return {
		// 				id: servData.id,
		// 				service: servData.servicesAr,
		// 				SerialCode: servData.SerialCode,
		// 				lastUpdate: servData.lastUpdate,
		// 				date: servData.date,
		// 				action: servData.actionAr,
		// 			};
		// 		}
		// 		return servData;
		// });
		updatedData = updatedData.map((servData) => {
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
			console.log('updatedData', updatedData);
			return servData;
		});

		setFilterData(updatedData);
	}, [activeLink, i18n.language]);

	const sortedData = [...filterData].sort((a, b) =>
		sortData === 'asc'
			? new Date(a.date) - new Date(b.date)
			: new Date(b.date) - new Date(a.date)
	);

	return (
		sortedData
			.sort((a, b) =>
				sortData === 'asc'
					? new Date(a.date) - new Date(b.date)
					: new Date(b.date) - new Date(a.date)
			)
			.filter((item) =>
				item?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
			)

			// return services?.map((service, index) => (
			?.map((service, index) => (
				<tr key={service?._id}>
					<td>{}</td>
					<td>{index + 1}</td>
					<td></td>
					<td>{service?.title}</td>
					<td>#{service?.code}</td>
					<td>{new Date(service?.updatedAt)?.toLocaleDateString()}</td>
					<td>{new Date(service?.createdAt)?.toLocaleDateString()}</td>
					<td
						className={
							service?.status === 'completed' ? 'text-success fw-bold' : ''
						}
					>
						{service?.status}
					</td>
					{/* <td>

          <Link className={`py-1 text-decoration-none me-2 ${service.action[0] === 'completed' ? 'text-success fw-bold' : ''}`}>
            {service.action[0]}
          </Link>


          <Link className="py-1 text-decoration-none mx-3 text-danger"
            // onClick={() => handleDelete(service.id)}
          >{service.action[1]}</Link>
        </td> */}
				</tr>
			))
	);
};

export default TableBodyAllServices;
