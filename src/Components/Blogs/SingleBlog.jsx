import React, { useEffect } from 'react';
import TextBlock from './TextBlock';
import BlogCard from './BlogCard';
// import TextBlock from '../../components/BlogSingle/TextBlock'
// import BlogCard from '../../components/shared/BlogCard'
// import BlogsFeatured from '../../assest/images/Blogs Featured Image.png'

import imgPlaceholder from '../../assest/images/default-placeholder.png';
import { Button, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { domainBack } from '../../configs/Api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAllBlogs, getOneBlog } from '../../Redux/Reducers/BlgSlice';
import { useTranslation } from 'react-i18next';

const SingeBlog = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	console.log('id', id);
	const { blog, blogs, loading } = useSelector((state) => state.BlogSlice);

	useEffect(() => {
		dispatch(getOneBlog(id));
		// dispatch(getAllBlogs({ filter: { tags: blog?.tags, _id: { $ne: blog?._id } } }));
	}, [id, blog?._id]);

	useEffect(() => {
		if (blog?._id) {
			dispatch(
				getAllBlogs({
					filter: { tags: { $in: blog?.tags }, _id: { $ne: blog?._id } },
				})
			);
		}
	}, [dispatch, id, blog]);

	const { t, i18n } = useTranslation();

	return (
		<>
			<div
				className="container overflow-hidden container-md px-md-5 m-auto"
				style={{ maxWidth: '992px' }}
			>
				<h1 class="mb-5 mt-5">{t(blog?.title || '')}</h1>
				{/* <TextBlock />
				<TextBlock /> */}
				<img
					src={blog?.cover ? domainBack + blog?.cover : imgPlaceholder}
					alt={t(blog?.title || '')}
					// style={{ width: '113%', translate: '-6%', marginBottom: '-50px' }}
				/>
				<p className="mt-5">{t(blog?.content || '')}</p>
				<p className="mt-5">{t(blog?.content || '')}</p>
				{/* <TextBlock />
				<TextBlock /> */}
			</div>
			<div class="container" style={{ margin: 'auto', maxWidth: '1200px' }}>
				<h2 class="mt-5">Related Blogs </h2>
				<Row className="m-md-auto">
					{blogs?.slice(0, 3)?.map((ele) => (
						// <Col xs={12} md={6} lg={4}>
						<BlogCard blog={ele} key={ele?._id} />
						// </Col>
					))}

					{/* <BlogCard />
					<BlogCard display="item4" /> */}
				</Row>
				<div>
					<Button
						variant="link"
						onClick={() => navigate('/blog', { state: { tags: blog?.tags } })}
						class="mt-4 float-end"
						style={{ textDecoration: 'none', color: '#000', cursor: 'pointer' }}
					>
						{t('View All')}
						<i
							class="fas fa-chevron-right ms-2 me-3"
							style={{ color: 'rgba(0, 0, 0, 0.723)' }}
						></i>
					</Button>
				</div>
			</div>
		</>
	);
};

export default SingeBlog;
