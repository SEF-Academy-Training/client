import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
import { Badge, Button, Card, Col, Form, Image, Row, Spinner } from 'react-bootstrap';
// import { FaUpload } from 'react-icons/fa';
//<<<<<<< blogs
import defultImg from '../../../../assest/images/Vector.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	newBlogValidation,
	updateBlogValidation,
} from '../../../../validations/blog.validation';
import { createBlog, getOneBlog, updateBlog } from '../../../../Redux/Reducers/BlgSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { domainBack } from '../../../../configs/Api';

const AddBlog = ({ type = 'new' }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const { blog, loading } = useSelector((state) => state.BlogSlice);

	const [selectedImage, setSelectedImage] = useState(null);
	const imageInput = useRef();

	useEffect(() => {
		if (type === 'edit') dispatch(getOneBlog(id));
	}, [dispatch, id, type]);

	const initialBlog = {
		title: '',
		tags: [],
		categories: '',
		content: '',
		cover: '',
	};

	const editableData = (data, initial) => {
		let info = {};
		console.log('data', data);
		for (const key in initial) {
			info[key] = data?.[key] || '';
		}
		return info;
	};

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		getValues,
		formState: { errors, isSubmitting, touchedFields },
	} = useForm({
		mode: 'all',
		criteriaMode: 'all',
		reValidateMode: 'onChange',

		defaultValues: type === 'edit' ? blog : initialBlog,
		values: blog && editableData(blog, initialBlog),

		resolver: yupResolver(type === 'edit' ? updateBlogValidation : newBlogValidation),
	});

	console.log('getValues', getValues());
	console.log('errors', errors);

	const submitBlog = async (data) => {
		try {
			if (type === 'edit') {
				await dispatch(updateBlog({ id, data: getValues() })).unwrap();
			} else {
				await dispatch(createBlog(getValues())).unwrap();
			}
			reset();
			navigate(`/blogsadmindashboard`);
			// navigate(`/editblogsadmindashboard/:id`);
		} catch (error) {
			toast.error(error.message);
		}
	};

	console.log(imageInput.current);

	const handleImageChange = () => {
		imageInput.current.click();
	};

	const displayImage = (e) => {
		setSelectedImage(e.target.files[0]);
		setValue('cover', e.target.files[0], { shouldTouch: true });
	};

	return (
		<div
			className="container px-5 pb-4"
			style={{ borderTop: '2px solid rgb(236, 236, 236)' }}
		>
			<Row className="px-3 mt-3 rounded border rounded-4">
				<Col md={12}>
					<Form className=" py-4" onSubmit={handleSubmit(submitBlog)}>
						<Row className="mb-3">
							<Form.Group as={Col} controlId="formTitle">
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									placeholder="Your blog title"
									className="border-2"
									defaultValue={blog?.title}
									isValid={touchedFields?.title && !errors?.title}
									isInvalid={!!errors?.title}
									{...register('title')}
								/>
								<Form.Control.Feedback type="invalid">
									{errors?.title?.message}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group as={Col} controlId="formTag">
								<Form.Label>Tags</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter tags"
									className="border-2"
									defaultValue={blog?.tags}
									isValid={touchedFields?.tags && !errors?.tags?.[0]}
									isInvalid={!!errors?.tags}
									{...register('tags', {
										setValueAs: (value) => {
											if (typeof value === 'string') {
												return value
													.split(',')
													.map((tag) =>
														typeof tag === 'string' ? tag.trim() : tag
													);
											} else {
												return [];
											}
										},
									})}
								/>
								<Form.Control.Feedback type="invalid">
									{errors?.tags?.[0]?.message}
								</Form.Control.Feedback>
							</Form.Group>
						</Row>

						<Row className="mb-3 pt-3">
							<Form.Group
								style={{ height: '200px' }}
								as={Col}
								controlId="formPhoto"
							>
								<Form.Label>Upload Photo</Form.Label>
								<input
									type="file"
									accept="image/*"
									onChange={displayImage}
									ref={imageInput}
									className="d-none"
								/>
								<Image
									onClick={handleImageChange}
									src={
										selectedImage
											? URL.createObjectURL(selectedImage)
											: type === 'edit' && blog?.cover
											? domainBack + blog?.cover
											: defultImg
									}
									alt="default image"
									className="pointer"
									style={{ height: '70%' }}
								/>
							</Form.Group>
							<Form.Group
								as={Col}
								className="d-flex flex-column justify-content-between"
								controlId="formCategories"
							>
								{/* show tags as badges ------------------------------- */}
								<div className="d-flex flex-wrap gap-2 mb-4">
									{getValues('tags')?.map((tag) => (
										<Badge bg="primary" key={tag}>
											{tag}
										</Badge>
									))}
								</div>
								<div className="mb-4">
									<Form.Label>Category</Form.Label>
									<Form.Control
										type="text"
										placeholder="Your blog category"
										className="border-2"
										defaultValue={blog?.categories}
										isValid={touchedFields?.categories && !errors?.categories}
										isInvalid={!!errors?.categories}
										{...register('categories')}
									/>
									<Form.Control.Feedback type="invalid">
										&#160;{errors?.categories?.message}
									</Form.Control.Feedback>
								</div>
							</Form.Group>
						</Row>

						<Form.Group className="mb-3" controlId="FormTextarea">
							<Form.Label>Write down your blog</Form.Label>
							<Form.Control
								as="textarea"
								rows={7}
								placeholder="Your blog"
								className="border-2"
								defaultValue={blog?.content}
								isValid={touchedFields?.content && !errors?.content}
								isInvalid={!!errors?.content}
								{...register('content')}
							/>
							<Form.Control.Feedback type="invalid">
								{errors?.content?.message}
							</Form.Control.Feedback>
						</Form.Group>

						<div className="w-25 m-auto">
							<Button
								type="submit"
								className="btn m-auto rounded-pill fw-bold mt-3"
								style={{
									background: '#007bff',
									borderColor: '#007bff',
									width: '200px',
								}}
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<Spinner
											as="span"
											animation="border"
											size="sm"
											role="status"
											aria-hidden="true"
										/>
										'Publishing...'
									</>
								) : (
									'Publish'
								)}
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</div>
	);
	// =======
	// import defultImg from '../../../../assest/images/Vector.svg'

	// const AddBlog = () => {
	//     const [selectedImage, setSelectedImage] = useState(null);
	//     const imageInput = useRef();

	//     console.log(imageInput.current);

	//     const handleImageChange = () => {
	//         imageInput.current.click();
	//     };

	//     const displayImage = (e) => {
	//         setSelectedImage(e.target.files[0]);
	//     };

	//     return (

	//         <div className="container px-5 pb-4" style={{ borderTop: "2px solid rgb(236, 236, 236)" }}>
	//             <Row className="px-3 mt-3 rounded border rounded-4">
	//                 <Col md={12}>
	//                     <Form className=" py-4">
	//                         <Row className="mb-3">
	//                             <Form.Group as={Col} controlId="formTitle">
	//                                 <Form.Label>Title</Form.Label>
	//                                 <Form.Control type="text" placeholder="Your blog title" className="border-2" />
	//                             </Form.Group>

	//                             <Form.Group as={Col} controlId="formTag">
	//                                 <Form.Label>Tags</Form.Label>
	//                                 <Form.Control type="text" placeholder="Enter tags" className="border-2" />
	//                             </Form.Group>
	//                         </Row>

	//                         <Row className="mb-3 pt-3">
	//                             <Form.Group style={{ height: "200px" }} as={Col} controlId="formPhoto">
	//                                 <Form.Label>Upload Photo</Form.Label>
	//                                 <input
	//                                     type="file"
	//                                     onChange={displayImage}
	//                                     ref={imageInput}
	//                                     className='d-none'
	//                                 />
	//                                 <Image
	//                                     onClick={handleImageChange}
	//                                     src={(selectedImage && URL.createObjectURL(selectedImage)) || defultImg}
	//                                     alt='defult image'
	//                                     className="pointer"
	//                                     style={{ height: '70%' }}
	//                                 />
	//                             </Form.Group>

	//                             <Form.Group as={Col} controlId="formCategories">
	//                                 <Form.Label>Categories</Form.Label>
	//                                 <Form.Control type="text" placeholder="Your blog categories" className="border-2" />
	//                             </Form.Group>

	//                              {/* <Form.Group as={Col} controlId="formCategories">
	//                                 <Form.Label>Categories</Form.Label>
	//                                 <Form.Select className="border-2">
	//                                     <option value="">Select...</option>
	//                                     <option value="tech">Tech</option>
	//                                     <option value="business">Business</option>
	//                                     <option value="security">Security</option>
	//                                     <option value="sports">Sports</option>
	//                                     <option value="medical">Medical</option>
	//                                     <option value="startups">Startups</option>
	//                                     <option value="about">About</option>
	//                                 </Form.Select>
	//                             </Form.Group> */}
	//                         </Row>

	//                         <Form.Group className="mb-3" controlId="FormTextarea">
	//                             <Form.Label>Write down your blog</Form.Label>
	//                             <Form.Control as="textarea" rows={7} placeholder="Your blog" className="border-2" />
	//                         </Form.Group>

	//                         <div className="w-25 m-auto">
	//                             <Button
	//                                 type="submit"
	//                                 className="btn m-auto rounded-pill fw-bold mt-3"
	//                                 style={{ background: '#007bff', borderColor: '#007bff', width: '200px' }}
	//                             >
	//                                 Publish
	//                             </Button>
	//                         </div>
	//                     </Form>
	//                 </Col>

	//             </Row>
	//         </div>

	//     );
	// >>>>>>> master
};

export default React.memo(AddBlog);
