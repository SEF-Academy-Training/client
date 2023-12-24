import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { errorMsg, infoMsg } from '../../../../Global/Toastify/Toastify';
//import { deletePaper, setShow } from '../../../../../Redux/Reducers/UserSlice';
import { Button, Col, Form, Image, Modal } from 'react-bootstrap';
// import defaultImg from '../../../../../assest/images/default-placeholder.png';
// import uploadImg from '../../../../assest/images/Vector.svg';
import uploadImg from '../../../../../assest/images/Vector.svg';
import fileImg from '../../../../../assest/images/file-document.png';

import {
	getAllPapers,
	createPaper,
	updatePaper,
	deletePaper,
} from '../../../../../Redux/Reducers/paperSlice';
import { PaperDocs } from '../../../../../configs/enums';
import { domainBack } from '../../../../../configs/Api';
import PaginationBar from '../../../../Global/PaginationBar';

const TableCompanyBody = ({ type }) => {
	const dispatch = useDispatch();

	const { papers, loading } = useSelector((state) => state.paperSlice);
	const { user } = useSelector((state) => state.user);

	const sortData = useSelector((state) => state.GlobalSlice.sortData);
	const searchQuery = useSelector((state) => state.GlobalSlice.searchQuery);
	const { t, i18n } = useTranslation();
	const [show, setShowState] = useState(false);

	useEffect(() => {
		dispatch(getAllPapers({ filter: { type } }));
		// dispatch(getOnePaper());
	}, [dispatch, type]);

	let mutableUsersData = [...papers];
	// const DataLang = mutableUsersData.map((serData) => {
	// 	if (i18n.language === 'ar') {
	// 		return {
	// 			document: serData.documentAr,
	// 			status: serData.statusAr,
	// 			uploadDate: serData.uploadDate,
	// 			date: serData.date,
	// 			action: serData.actionAr,
	// 		};
	// 	}
	// 	// console.log(serData);
	// 	return serData;
	// });

	const DataLang = mutableUsersData.map((serData) => {
		if (i18n.language === 'ar') {
			return {
				...serData,
				document: serData?.documentAr || serData?.document,
				status: serData?.statusAr || serData?.status,
				uploadDate: serData?.uploadDate,
				date: serData?.date,
				action: serData?.actionAr,
			};
		}
		// console.log(serData);
		return serData;
	});

	const imageInput = useRef();
	const [selectedImage, setSelectedImage] = useState(null);
	const [clickedDocument, setClickedDocument] = useState(null);
	console.log('clickedDocument', clickedDocument);

	const handelOpenModel = (doc) => {
		setClickedDocument(doc);
		setShowState(true);
		setSelectedImage(null);
	};

	function getFileType(url) {
		if (clickedDocument || selectedImage) {
			const extension = url.split('.').pop().toLowerCase();
			const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

			return imageExtensions.includes(extension) ? 'image' : 'file';
		}
	}

	const handleUpload = async () => {
		if (!selectedImage) return errorMsg('Please select file to upload it!');

		let newDocument = {};
		if (clickedDocument?.file && clickedDocument?._id) {
			newDocument = { file: selectedImage };
		} else
			newDocument = {
				document: clickedDocument?.document,
				hash: clickedDocument?.hash + '',
				type: clickedDocument?.type,
				file: selectedImage,
				user: user?._id,
			};

		console.log('document', clickedDocument);
		console.log('newDocument', newDocument);

		try {
			if (clickedDocument?.file && clickedDocument?._id) {
				console.log('edit');
				await dispatch(
					updatePaper({ id: clickedDocument?._id, data: newDocument })
				).unwrap();
			} else {
				console.log('new');
				await dispatch(createPaper(newDocument)).unwrap();
			}
			setShowState(false);
			setSelectedImage(null);
			dispatch(getAllPapers({ filter: { type } }));
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (document) => {
		try {
			await dispatch(deletePaper(document._id)).unwrap();
			dispatch(getAllPapers({ filter: { type } }));
		} catch (error) {
			console.log(error);
		}
		// infoMsg(`${document.title} is Deleted`);
	};
	// const handleUpdate = async (_id) => {
	// 	try {
	// 		await dispatch(updatePaper(_id)).unwrap();
	// 		dispatch(getAllPapers({ filter: { type } }));
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// 	// infoMsg(`Paper of id =${_id} is Deleted`);
	// };

	const handleImageChange = () => {
		imageInput.current.click();
	};

	const displayImage = (e) => {
		setSelectedImage(e.target.files[0]);
	};

	// const toggleShow = () => {
	// 	setShowState(true); // Update the state to show the modal
	// };

	const handleClose = () => {
		setShowState(false); // Update the state to hide the modal
	};

	function getFileType(url) {
		const extension = url.split('.').pop().toLowerCase();
		const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

		return imageExtensions.includes(extension) ? 'image' : 'file';
	}

	const handelShow = () => {
		let src = '';

		if (selectedImage) {
			if (selectedImage?.type?.includes('image')) {
				src = URL.createObjectURL(selectedImage);
			} else {
				src = fileImg;
			}
		} else if (clickedDocument?.file) {
			console.log(
				'getFileType(clickedDocument?.file)',
				getFileType(clickedDocument?.file)
			);
			if (getFileType(clickedDocument?.file) == 'image') {
				src = domainBack + clickedDocument?.file;
			} else {
				src = fileImg;
			}
		}else{
			src =uploadImg
		}
		console.log('src', src);
		return src;
	};

	return (
		<>
			{DataLang.sort((a, b) =>
				sortData === 'asc'
					? new Date(a.date) - new Date(b.date)
					: new Date(b.date) - new Date(a.date)
			)
				.filter((item) =>
					item.document?.toLowerCase().includes(searchQuery?.toLowerCase())
				)
				.map((document, index) => (
					<tr key={document._id}>
						<td></td>
						{/* <td>{index + 1}</td> */}
						<td>{document?.hash}</td>
						<td></td>
						<td>{document.document}</td>
						<td>{document.status}</td>
						<td>{new Date(document?.createdAt)?.toLocaleDateString()}</td>
						<td>{new Date(document?.updatedAt)?.toLocaleDateString()}</td>

						<td className="d-flex gap-2 align-items-center">
							<Link
								className="py-x1 text-decoration-none text-primary me-2"
								// onClick={() => handleUpdate(document)}
								onClick={() => handelOpenModel(document)}
							>
								update
							</Link>
							<Link
								className="py-1 text-decoration-none text-danger"
								onClick={() => handleDelete(document)}
							>
								delete
							</Link>
						</td>
					</tr>
				))}

			{PaperDocs?.filter((paper) => paper?.type === type)
				?.filter((paper) => !papers.some((p) => p.hash == paper.hash))
				?.map((document, index) => (
					<tr key={document?._id}>
						<td></td>
						{/* <td>{index + 1}</td> */}
						<td>{document?.hash}</td>
						<td></td>
						<td>{document?.document}</td>
						<td>{document?.status}</td>
						<td>{document.createdAt}</td>
						<td>{document.updatedAt}</td>
						<td className="d-flex justify-content-center">
							<Link
								className="py-1 text-decoration-none text-primary me-2"
								// onClick={() => handleUpdate(document)}
								onClick={() => handelOpenModel(document)}
							>
								upload
							</Link>
						</td>
					</tr>
				))}

			{show && (
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Paper</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{/* <Image src={defaultImg} alt="paper" /> */}
						<Form.Group as={Col} controlId="formPhoto">
							<Form.Label>Upload File</Form.Label>
							<input
								type="file"
								onChange={displayImage}
								ref={imageInput}
								className="d-none"
							/>
							<Image
								onClick={handleImageChange}
								// src={
								// 	selectedImage
								// 		? selectedImage?.type?.includes('image')
								// 			? URL.createObjectURL(selectedImage) || uploadImg
								// 			: fileImg
								// 		: (clickedDocument?.file &&
								// 				domainBack + clickedDocument?.file) ||
								// 		  fileImg
								// }
								src={handelShow()}
								alt="defult image"
								className="pointer"
								style={{ height: '70%' }}
							/>
						</Form.Group>
						{clickedDocument?.file && !selectedImage &&
						<Link
							className="btn btn-primary d-block mx-auto"
							download={clickedDocument?.document}
							target="_blank"
							rel="noreferrer"
							to={clickedDocument?.file && domainBack + clickedDocument?.file}
						>
							DownLoad
						</Link>}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={handleUpload}>
							Upload
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
};

export default TableCompanyBody;
