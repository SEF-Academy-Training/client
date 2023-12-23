import React, { useEffect } from 'react';
import './services.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
// import { serviceData as service } from './ServicesData';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOurServices } from '../../Redux/Reducers/ourServicesSlice';
import { domainBack } from '../../configs/Api';

function Services() {
	const dispatch = useDispatch();
	const { ourServices, loading } = useSelector((state) => state.OurServiceSlice);
	console.log('ourServices', ourServices);

	useEffect(() => {
		dispatch(getAllOurServices({ sort: { createdAt: 'asc' } }));
	}, []);


	return (
		<>
			<div id="services" className="font-loader">
				<Container>
					<div className="service-content service-intro text-center">
						<Row>
							<h2>Our Services</h2>
							<p>
								We provide you with a wide range of service in the fields of
								audit, assurance, accounting taxation, investment, and
								incorporation of new companies with a competitive fee.
							</p>
						</Row>
					</div>
					<div className="service-content service-sec">
						{/* {service.map((data) => { */}
						{ourServices?.map((data) => {
							return (
								<div className="mission" key={data?._id}>
									<Row>
										<Col lg={7}>
											<div className="service-disc">
												<h3>{data?.title}</h3>
												<p>{data?.description}</p>
											</div>
										</Col>
										<Col lg={5}>
											<Image
												src={data?.cover && domainBack + data?.cover}
												className="service-img"
											/>
										</Col>
									</Row>
								</div>
							);
						})}
					</div>
				</Container>
			</div>
		</>
	);
}

export default Services;
