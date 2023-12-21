import React, { useEffect, useState } from 'react';
import './Blogs.css';
import MainTitle from './MainTitle';
import BlogCard from './BlogCard';
import BlogsFeatured from '../../assest/images/Blogs Featured Image.png';
import imgPlaceholder from '../../assest/images/default-placeholder.png';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CTA from '../Global/CTA/CTA';

import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getAllBlogs } from '../../Redux/Reducers/BlgSlice';
import { toast } from 'react-toastify';
import { domainBack } from '../../configs/Api';
import { useTranslation } from 'react-i18next';

const Blogs = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { state } = useLocation();
	console.log('state', state);

	const { blogs, loading, pagination } = useSelector((state) => state.BlogSlice);
	console.log('blogs', blogs, pagination);

	// const [firstBlog, setFirstBlog] = useState(async ()=> await blogs?.[0]);

	useEffect(() => {
		dispatch(getAllBlogs({ filter: { tags: state ?state?.tags:null}, page: 1, limit: 10 }));
	}, []);

	const handelDeleteBlog = async (id) => {
		try {
			await dispatch(deleteBlog(id)).unwrap();
			navigate('/blog');
			dispatch(getAllBlogs());
		} catch (error) {
			console.log('error', error);
			toast.error(error.message);
		}
	};
	const firstBlog = blogs?.[0];

	console.log('firstBlog', firstBlog);

	const { t, i18n } = useTranslation();

	return (
		<>
			<MainTitle />
			<Container className="p-4 rounded-5 ">
				<Card
					className="d-flex align-items-center rounded-5"
					style={{ border: '1px solid rgb(55, 182, 255)' }}
				>
					<Row className="justify-content-center align-items-center container">
						<Col md={4}>
							<div className="box-image">
								<Card.Img
									variant="top"
									src={
										firstBlog?.cover
											? domainBack + firstBlog?.cover
											: imgPlaceholder
									}
									alt={firstBlog?.title || ''}
									className="py-3"
								/>
							</div>
						</Col>
						<Col md={8}>
							<Card.Body className="box-text ">
								<Card.Title>{t(firstBlog?.title || '')}</Card.Title>
								<Card.Text>{t(firstBlog?.content || '')}</Card.Text>
								<Link
									to={`/singleblog/${firstBlog?._id || ''}`}
									className="text-dark"
								>
									{t('Read more')}
								</Link>
							</Card.Body>
						</Col>
					</Row>
				</Card>
			</Container>
			<div className="container p-4">
				<Row className="m-md-auto">
					{blogs?.slice(1).map((blog) => (
						<BlogCard
							key={blog?._id}
							blog={blog}
							handelDeleteBlog={handelDeleteBlog}
						/>
					))}
				</Row>
			</div>
			<CTA />
		</>
	);
};

export default Blogs;
