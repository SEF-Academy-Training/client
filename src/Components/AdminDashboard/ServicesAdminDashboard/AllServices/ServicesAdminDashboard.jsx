import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../../AdminDashboardGlobal/AdminDashboard.css';

import { useDispatch, useSelector } from 'react-redux';
import AdminDashboardSideBar from '../../AdminDashboardGlobal/AdminDashboardSideBar';
import DashboardHeader from '../../../Global/Dashboard/DashboardHeader/DashboardHeader';
import TableServices from './TableServices/TableServices';
import PaginationBar from '../../../Global/PaginationBar';
import { getAllServices } from '../../../../Redux/Reducers/servicesSlice';

const ServicesAdminDashboard = () => {
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	const sortData = useSelector((state) => state.GlobalSlice.sortData);
	const searchQuery = useSelector((state) => state.GlobalSlice.searchQuery);
	const serviceStatus = useSelector((state) => state.AdminSlice.serviceStatus);

	// const [status, setStatus] = useState('');

	// useEffect(() => {
	// 	if (activeLink === 'unread') {
	// 		setStatus('pending');
	// 	} else if (activeLink === 'ongoing') {
	// 		setStatus('ongoing');
	// 	} else {
	// 		setStatus(null);
	// 	}
	// }, [activeLink]);

	console.log('serviceStatus', serviceStatus);
	const { pagination } = useSelector((state) => state.ServiceSlice);
	const { pages, page } = pagination || {};

	// ---------------------- change page pagination ----------------------------
	const [changePage, setChangePage] = useState(1);
	const handlePageClick = (newPage) => setChangePage(newPage);
	// ---------------------- change page pagination ----------------------------

	useEffect(() => {
		setChangePage(1);
		console.log('changePage useEffect', changePage);
	}, [searchQuery]);

	useEffect(() => {
		dispatch(
			getAllServices({
				page: changePage,
				filter: {
					status: serviceStatus,
					$or: [
						{ title: { $regex: searchQuery, $options: 'i' } },
						{ status: { $regex: searchQuery, $options: 'i' } },
					],
					// sort: sortData ? { status: sortData } : {},
				},
			})
		);
	}, [searchQuery, changePage, sortData, serviceStatus, dispatch]);


	const toggleDark = useSelector((state) => state.GlobalSlice.toggleDark);

	return (
		<>
			<Container fluid>
				<Row>
					<Col sm={3}>
						<div className="px-4">
							<AdminDashboardSideBar />
						</div>
					</Col>
					<Col sm={9}>
						<div style={{ paddingRight: '50px' }}>
							<div
								className={`my-5 rounded-5  ${
									toggleDark ? 'bg-dark text-light border' : 'bg-light text-dark'
								}`}
							>
								<DashboardHeader pageTitle={'All services'} />
								<TableServices />
								<PaginationBar
									pages={pages}
									page={page}
									handlePageClick={handlePageClick}
								/>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ServicesAdminDashboard;
