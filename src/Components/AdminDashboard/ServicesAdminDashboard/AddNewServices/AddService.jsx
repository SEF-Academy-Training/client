import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Card, Col, Form, Image, Row, Spinner } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import defultImg from '../../../../assest/images/Vector.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
	createOurService,
	getOneOurService,
	updateOurService,
} from '../../../../Redux/Reducers/ourServicesSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import {
	newOurServiceValidation,
	updateOurServiceValidation,
} from '../../../../validations/ourService.validation';
import { PaperDocs } from '../../../../configs/enums';
import { domainBack } from '../../../../configs/Api';

const AddService = ({ type }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const { ourService, loading } = useSelector((state) => state.OurServiceSlice);

	console.log('ourService', ourService);
	console.log('type', type);

	useEffect(() => {
		if (type === 'edit') dispatch(getOneOurService(id));
	}, [dispatch, id, type]);

	const initialOurService = {
		title: '',
		type: '',
		description: '',
		requiredPapers: [],
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

		defaultValues: type === 'edit' ? ourService : initialOurService,
		values: type === 'edit'? (ourService && editableData(ourService, initialOurService)):initialOurService,

		resolver: yupResolver(
			type === 'edit' ? updateOurServiceValidation : newOurServiceValidation
		),
	});

	console.log('getValues', getValues());
	console.log('errors', errors);

	const submitOurService = async (data) => {
		try {
			if (type === 'edit') {
				await dispatch(updateOurService({ id, data: getValues() })).unwrap();
			} else {
				await dispatch(createOurService(getValues())).unwrap();
			}
			reset();
			navigate(`/showOurservicesadmindashboard`);
			// navigate(`/editblogsadmindashboard/:id`);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const [selectedImage, setSelectedImage] = useState(null);
	const imageInput = useRef();
	// const [selectedCategories, setSelectedCategories] = useState([]);

	const handleImageChange = () => {
		imageInput.current.click();
	};

	const displayImage = (e) => {
		setSelectedImage(e.target.files[0]);
		setValue('cover', e.target.files[0], { shouldTouch: true, shouldValidate: true });
	};

	useEffect(() => {
		if (type === 'new') {
			reset();
		}
	}, [type]);


	// const handleCategoryChange = (e) => {
	// 	const selectedOption = e.target.value;
	// 	const isChecked = e.target.checked;

	// 	if (isChecked) {
	// 		setSelectedCategories([...selectedCategories, selectedOption]);
	// 	} else {
	// 		const updatedCategories = selectedCategories.filter(
	// 			(category) => category !== selectedOption
	// 		);
	// 		setSelectedCategories(updatedCategories);
	// 	}
	// };

	return (
		<div
			className="container px-5 pb-4"
			style={{ borderTop: '2px solid rgb(236, 236, 236)' }}
		>
			<Row className="px-3 mt-3 rounded border rounded-4">
				<Col md={12}>
					<Form className=" py-4" onSubmit={handleSubmit(submitOurService)}>
						<Row className="mb-3">
							<Form.Group as={Col} xs={12} lg={8} controlId="formTitle">
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									placeholder="service title"
									className="border-2"
									defaultValue={ourService?.title}
									isValid={touchedFields?.title && !errors?.title}
									isInvalid={!!errors?.title}
									{...register('title')}
								/>
								<Form.Control.Feedback type="invalid">
									{errors?.title?.message}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group as={Col} xs={12} lg={4} controlId="formCategories">
								<Form.Label>Service Type</Form.Label>
								<Form.Select
									className="border-2"
									{...register('type')}
									isValid={touchedFields?.type && !errors?.type}
									isInvalid={!!errors?.type}
								>
									<option hidden value="">
										Select...
									</option>
									<option value="personal">Personal</option>
									<option value="company">Company</option>
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors?.type?.message}
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
									onChange={displayImage}
									ref={imageInput}
									className="d-none"
								/>
								<Image
									onClick={handleImageChange}
									src={
										(selectedImage && URL.createObjectURL(selectedImage)) ||
										((type === 'edit' && ourService)?.cover && domainBack + ourService?.cover) ||
										defultImg
									}
									alt="defult image"
									className="pointer"
									style={{ height: '70%' }}
								/>
								<Form.Control.Feedback
									type="invalid"
									className={`${errors?.cover ? 'd-block' : 'd-none'}`}
								>
									{errors?.cover?.message}
								</Form.Control.Feedback>
							</Form.Group>
							{/* <Form.Group as={Col} controlId="formTag">
								<Form.Label>Tags</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter tags"
									className="border-2"
								/>
							</Form.Group> */}

							<Form.Group as={Col} controlId="formCategories">
								<Form.Label>Required Papers</Form.Label>
								{PaperDocs?.map((item) => (
									<Form.Check
										type="checkbox"
										id={item?.title}
										label={item?.document}
										isValid={
											touchedFields?.requiredPapers && !errors?.requiredPapers
										}
										isInvalid={!!errors?.requiredPapers}
										value={item?.hash}
										// checked={selectedCategories.includes(item?.hash)}
										// onChange={handleCategoryChange}
										{...register('requiredPapers', {
											// onChange: () =>
											// 	getFieldState('requiredPapers', {
											// 		invalid:
											// 			getValues('requiredPapers')?.length < 1 && true,
											//          error:'required'
											// 	}),
										})}
									/>
								))}
								<Form.Control.Feedback type="invalid">
									{errors?.requiredPapers?.message}
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
						<Row className="mb-3 pt-3">
							{/* <Form.Group as={Col} controlId="formCategories">
								<Form.Label>Service Type</Form.Label>
								<Form.Select
									className="border-2"
									{...register('type')}
									isValid={touchedFields?.type && !errors?.type}
									isInvalid={!!errors?.type}
								>
									<option hidden value="">
										Select...
									</option>
									<option value="personal">Personal</option>
									<option value="company">Company</option>
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors?.type?.message}
								</Form.Control.Feedback>
							</Form.Group> */}
							{/* <Form.Group as={Col} controlId="formCategories">
								<Form.Label>required Papers</Form.Label>
								<Form.Select className="border-2">
									<option value="">Select papers...</option>
									{PaperDocs?.map((item) => (
										<option key={item?.hash} value={item?.hash}>
											{item?.title}
										</option>
									))}
									<option value="company">Company Paper</option>
								</Form.Select>
							</Form.Group> */}

							{/* <Form.Group as={Col} controlId="formCategories">
								<Form.Label>Required Papers</Form.Label>
								{PaperDocs?.map((item) => (
									<Form.Check
										type="checkbox"
										id={item?.title}
										label={item?.title}
										isValid={
											touchedFields?.requiredPapers && !errors?.requiredPapers
										}
										isInvalid={!!errors?.requiredPapers}
										value={item?.hash}
										// checked={selectedCategories.includes(item?.hash)}
										// onChange={handleCategoryChange}
										{...register('requiredPapers')}
									/>
								))}
								<Form.Control.Feedback type="invalid">
									{errors?.requiredPapers?.message}
								</Form.Control.Feedback>
							</Form.Group> */}
						</Row>

						<Form.Group className="my-4" controlId="FormTextarea">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={7}
								placeholder="Descripte the services"
								className="border-2"
								defaultValue={ourService?.description}
								isValid={touchedFields?.description && !errors?.description}
								isInvalid={!!errors?.description}
								{...register('description')}
							/>
							<Form.Control.Feedback type="invalid">
								{errors?.description?.message}
							</Form.Control.Feedback>
						</Form.Group>

						<div className="w-25 m-auto">
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
						</div>
					</Form>
				</Col>
			</Row>
		</div>
	);
};

export default AddService;
