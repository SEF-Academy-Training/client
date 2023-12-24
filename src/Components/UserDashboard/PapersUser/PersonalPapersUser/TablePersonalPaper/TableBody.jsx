import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { infoMsg } from '../../../../Global/Toastify/Toastify';
import {
	deletePaper,
	updatePaper,
} from '../../../../../Redux/Reducers/paperSlice';
import { PaperDocs } from '../../../../../configs/enums';

const TableBody = ({ type = 'personal' }) => {
	const sortData = useSelector((state) => state.GlobalSlice.sortData);
	const searchQuery = useSelector((state) => state.GlobalSlice.searchQuery);
	const PapersData = useSelector((state) => state.paperSlice);

	const { t, i18n } = useTranslation();
	const [show, setShowState] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		// dispatch(getMyPapers());
	}, []);
	const filteredData = PapersData.filter((item) => item.type === 'personal');
	console.log(filteredData);

	let mutableUsersData = [...filteredData];
	const DataLang = mutableUsersData.map((servData) => {
		if (i18n.language === 'ar') {
			return {
				id: servData.documentnumber,
				document: servData.documentAr,
				status: servData.statusAr,
				uploadDate: servData.uploadDate,
				date: servData.date,
			};
		}
		console.log(servData);

		return servData;
	});

	const handleDelete = (document) => {
		dispatch(deletePaper(document._id));
		infoMsg(`Paper of id =${document.documentnumber} is Deleted`);
	};
	const handleUpdate = (document) => {
		dispatch(updatePaper(document._id));
		infoMsg(`Paper of id =${document.documentnumber} is updated`);
	};

	const toggleShow = () => {
		setShowState(true); // Update the state to show the modal
	};

	const handleClose = () => {
		setShowState(false); // Update the state to hide the modal
	};
	return (
		<>
			{DataLang.sort((a, b) =>
				sortData === 'asc'
					? new Date(a.date) - new Date(b.date)
					: new Date(b.date) - new Date(a.date)
			)
				.filter((item) =>
					item.document.toLowerCase().includes(searchQuery.toLowerCase())
				)
				.map((document) => (
					<tr key={document.id}>
						<td></td>
						<td>{document.documentnumber}</td>
						<td></td>
						<td>{document.document}</td>
						<td>{document.status}</td>
						<td>{document.createdAt}</td>
						<td>{document.updatedAt}</td>
						<td className="d-flex">
							<Link
								className="py-1 text-decoration-none text-primary me-2"
								onClick={() => handleUpdate(document)}
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

			{PaperDocs?.filter((paper) => paper?.type === type)?.map((document, index) => (
				<tr key={document?._id}>
					<td></td>
					<td>{index + 1}</td>
					<td></td>
					<td>{document?.title}</td>
					<td>{document?.status}</td>
					<td>{document?.createdAt}</td>
					<td>{document?.updatedAt}</td>
					<td className="d-flex">
						<Link
							className="py-1 text-decoration-none text-primary me-2"
							onClick={() => handleUpdate(document)}
						>
							upload
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
		</>
	);
};

export default TableBody;
