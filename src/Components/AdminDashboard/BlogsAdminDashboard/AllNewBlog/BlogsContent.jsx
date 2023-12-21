import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Card, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteBlog } from '../../../../Redux/Reducers/AdminSlice';
// import { infoMsg } from '../../../Global/Toastify/Toastify';

import imgPlaceholder from '../../../../assest/images/default-placeholder.png';
import { deleteBlog, getAllBlogs } from '../../../../Redux/Reducers/BlgSlice';
import { domainBack } from '../../../../configs/Api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaginationBar from '../../../Global/PaginationBar';

const BlogsContent = () => {
//<<<<<<< blogs
	const dispatch = useDispatch();

	const { blogs, loading, pagination } = useSelector((state) => state.BlogSlice);
	const { pages, page } = pagination || {};
	const searchQuery = useSelector((state) => state.GlobalSlice.searchQuery);
	console.log('blogs', blogs);
	const { t, i18n } = useTranslation();

	// ---------------------- change page pagination ----------------------------
	const [changePage, setChangePage] = useState(1);
	const handlePageClick = (newPage) => setChangePage(newPage);
	// ---------------------- change page pagination ----------------------------

	useEffect(() => {
		setChangePage(1);
		console.log('changePage useEffect', changePage);
	}, [searchQuery]);

	useEffect(() => {
		// dispatch(getAllBlogs({}));
		dispatch(
			getAllBlogs({
				page: changePage,
				filter: {
					$or: [
						{ title: { $regex: searchQuery, $options: 'i' } },
						{ tags: { $regex: searchQuery, $options: 'i' } },
						{ categories: { $regex: searchQuery, $options: 'i' } },
					],
					// $text: { $search: searchQuery },
				},
			})
		);
	}, [searchQuery, changePage, dispatch]);

	console.log('searchQuery', searchQuery);

	const sortData = useSelector((state) => state.GlobalSlice.sortData);
	// const searchQuery = useSelector((state) => state.GlobalSlice.searchQuery);
	// const blogs = useSelector((state) => state.AdminSlice.blogs);
	// const cards = new Array(6).fill(null);
	const sortedBlogData = [...blogs];
	const toggleDark = useSelector((state) => state.GlobalSlice.toggleDark);
	console.log('sortedBlogData', sortedBlogData);
	const DataLang = sortedBlogData.map((data) => {
		if (i18n.language === 'ar') {
			return {
				_id: data._id,
				title: data.titleAr,
				blog: data.contentAr,
				img: data.cover,
			};
		}
		return data;
	});

	DataLang.sort((a, b) => {
		const titleA = a.title.toUpperCase();
		const titleB = b.title.toUpperCase();

		if (sortData === 'asc') {
			return titleA.localeCompare(titleB);
		} else {
			return titleB.localeCompare(titleA);
		}
	});

	console.log('DataLang', DataLang);

	const handleDelete = async (itemId) => {
		try {
			await dispatch(deleteBlog(itemId)).unwrap();
			dispatch(getAllBlogs({}));
		} catch (error) {
			console.log('error', error);
			toast.error(error.message);
		}
		// infoMsg(`Blog of ${itemId} is Deleted`);
	};
	return (
		<>
			<Row
				className={`mx-1 ${
					toggleDark ? 'bg-dark text-light' : 'bg-light text-light'
				}`}
			>
				{/* {cards.map((_, index) => ( <BlogCard /> ))} */}

				{DataLang
					// .filter((item) => item.blog?.toLowerCase().includes(searchQuery.toLowerCase()))
					.map((itm) => (
						<Col
							lg={4}
							md={6}
							sm={12}
							xs={10}
							className={`m-auto m-md-auto`}
							key={itm?._id}
						>
							<Card
								className={`rounded-4 my-4 ${
									toggleDark ? 'bg-dark text-light' : 'bg-light text-light'
								}`}
								style={{ border: '1px solid rgb(55, 182, 255)' }}
							>
								<Image
									fluid
									src={itm?.cover ? domainBack + itm?.cover : imgPlaceholder}
									alt={itm?.title || ''}
									className="card-img-top"
								/>
								<Card.Body>
									<Card.Title className="mb-3 fw-bold text-primary">
										{itm?.title || ''}
									</Card.Title>
									<Card.Text className="lh-1 small text-secondary">
										{itm?.content || ''}
									</Card.Text>

									<div className="linksCardBlog mt-4">
										<Link
											to={`/singleblog/${itm?._id}`}
											className={`text-dark btn mx-0 px-0 text-decoration-underline ${
												i18n.language === 'en' ? '' : ''
											}`}
										>
											{t('Read more')}
										</Link>

										<div>
											<Link
												to={`/editblogsadmindashboard/${itm?._id}`}
												className={`text-dark btn ${
													i18n.language === 'en' ? '' : 'px-3'
												}`}
											>
												{t('Edit')}
											</Link>
											<Card.Link
												onClick={() => handleDelete(itm?.id)}
												className={`text-danger btn ms-3  ${
													i18n.language === 'en' ? '' : 'px-3'
												}`}
											>
												{t('Delete')}
											</Card.Link>
										</div>
									</div>
								</Card.Body>
							</Card>
						</Col>
					))}
			</Row>
			<PaginationBar pages={pages} page={page} handlePageClick={handlePageClick} />
		</>
	);
};

export default BlogsContent;
//=======
//     const cards = new Array(6).fill(null);
//     const { t, i18n } = useTranslation();
//     const sortData = useSelector((state) => state.GlobalSlice.sortData);
//     const searchQuery = useSelector((state) => state.GlobalSlice.searchQuery);
//     const blogs = useSelector((state) => state.AdminSlice.blogs);
//     const dispatch = useDispatch()
//     const sortedBlogData = [...blogs];
//     const toggleDark = useSelector((state) => state.GlobalSlice.toggleDark);

//     const DataLang = sortedBlogData.map((data) => {
//         if (i18n.language === 'ar') {
//           return ({
//             'id': data.id,
//             'title': data.titleAr,
//             'blog':data.blogAr,
//             'img':data.img
//           })
//         }
//         return data;
//       })

//     DataLang.sort((a, b) => {
//         const titleA = a.title.toUpperCase();
//         const titleB = b.title.toUpperCase();

//         if (sortData === 'asc') {
//             return titleA.localeCompare(titleB);
//         } else {
//             return titleB.localeCompare(titleA);
//         }
//     });

//     const handleDelete = (itemId) => {
//         dispatch(deleteBlog(itemId));
//         infoMsg(`Blog of ${itemId} is Deleted`)
//     }
//     return (
//         <>
//             <Row className={`mx-1 ${toggleDark ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
//                 {/* {cards.map((_, index) => (
//                         <BlogCard />
//                 ))} */}

//                 {DataLang.filter((item) =>
//                     item.blog.toLowerCase().includes(searchQuery.toLowerCase())
//                 ).map((itm) => (
//                     <Col lg={4} md={6} sm={12} xs={10} className={`m-auto m-md-auto`} key={itm.id}>
//                         <Card className={`rounded-4 my-4 ${toggleDark ? 'bg-dark text-light' : 'bg-light text-dark'}`} style={{ border: "1px solid rgb(55, 182, 255)" }}>
//                             <Image fluid src={itm.img} alt="photo" className="card-img-top" />
//                             <Card.Body>
                                
//                                 <Card.Title className="mb-3 fw-bold">{itm.title}</Card.Title>
//                                 <Card.Text className="lh-1 small">
//                                     {itm.blog}
//                                 </Card.Text>

//                                 <div className='linksCardBlog mt-4'>
//                                     <Card.Link href="/singleblog" className={`text-dark btn mx-0 px-0 text-decoration-underline ${i18n.language === 'en' ? '' : ''}`} >
//                                         {t('Read more')}
//                                     </Card.Link>

//                                     <div>
//                                         <Card.Link href="/singleblog" className={`text-dark btn ${i18n.language === 'en' ? '' : 'px-3'}`} >
//                                             {t('Edit')}
//                                         </Card.Link>
//                                         <Card.Link
//                                             onClick={() => handleDelete(itm.id)}
//                                             className={`text-danger btn ms-3  ${i18n.language === 'en' ? '' : 'px-3'}`} >
//                                             {t('Delete')}
//                                         </Card.Link>
//                                     </div>
//                                 </div>

//                             </Card.Body>
//                         </Card>
//                     </Col>))}
//             </Row>
//         </>
//     );
// }

// export default BlogsContent
//>>>>>>> master
