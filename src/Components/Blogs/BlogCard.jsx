import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
// import BlogsFeatured from '../../assest/images/Blogs Featured Image.png';
import imgPlaceholder from '../../assest/images/default-placeholder.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { domainBack } from '../../configs/Api';

const BlogCard = ({ display, blog, handelDeleteBlog }) => {
	const { t, i18n } = useTranslation();
	const userRole = useSelector((state) => state.UserSlice.userRole);

	return (
		<Col
			lg={4}
			md={6}
			sm={12}
			xs={10}
			className={`m-auto m-md-auto ${display ? display : ''}`}
		>
			<Card
				className="rounded-4 my-4 overflow-hidden"
				style={{ border: '1px solid rgb(55, 182, 255)' }}
			>
				<Image
					fluid
					src={blog?.cover ? domainBack + blog?.cover : imgPlaceholder}
					alt={blog?.title || ''}
					className="card-img-top"
				/>
				<Card.Body>
					<Card.Title className="mb-3 fw-bold">{t(blog?.title || '')}</Card.Title>
					<Card.Text className="lh-1 small">{t(blog?.content || '')}</Card.Text>

					<div className="linksCardBlog mt-4">
						<Link
							to={`/singleblog/${blog?._id || ''}`}
							className={`text-dark  mb-2 pb-4 ${
								i18n.language === 'en' ? '' : ''
							}`}
						>
							{t('Read more')}
						</Link>

						{userRole === 'Admin' && (
							<div>
								<Card.Link
									href={`/singleblog/${blog?._id || ''}`}
									className={`text-dark ms-3  mb-2 pb-4 ${
										i18n.language === 'en' ? '' : 'px-3'
									}`}
								>
									Edit
								</Card.Link>
								<Card.Link
									// href="/singleblog"
									className={`text-danger ms-3  mb-2 pb-4 ${
										i18n.language === 'en' ? '' : 'px-3'
									}`}
									onClick={() => handelDeleteBlog(blog?._id)}
								>
									Delete
								</Card.Link>
							</div>
						)}
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default BlogCard;
