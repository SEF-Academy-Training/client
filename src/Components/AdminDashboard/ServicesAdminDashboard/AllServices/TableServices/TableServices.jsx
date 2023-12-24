import React from 'react';
import { Table } from 'react-bootstrap';
import TableBody from './TableBody';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ServicesDataHeaderAdmin } from '../../../../DummyData/DummyData';
// import { ServicesDataHeader } from '../../../../DummyData/DummyData'

const TableServices = ({ status }) => {
	const { t, i18n } = useTranslation();
	const toggleDark = useSelector((state) => state.GlobalSlice.toggleDark);

	const DataLang = ServicesDataHeaderAdmin.map((data) => {
		if (i18n.language === 'ar') {
			return {
				id: data.id,
				title: data.titleAr,
			};
		}
		return data;
	});

	return (
		<Table hover className={`my-3 ${toggleDark ? 'table-dark ' : 'table-light'}`}>
			<thead className="table-header ">
				{/* <RenderTableHead DataHeader={HeaderData} /> */}
				<tr>
					{DataLang.map((data, index) => (
						<th key={index} className={`${data.title === 'Actions'}'text-center'`}>
							{data.title}
						</th>
					))}
				</tr>
			</thead>
			<tbody className="table-body">
				<TableBody status={status} />
			</tbody>
		</Table>
	);
};

export default TableServices;
