import React from 'react'
import { Table } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import TableBody from './TableBody'
import { PersonalPapersHeader } from '../../../../DummyData/DummyData'

const TablePersonalPaper = () => {
    const { t, i18n } = useTranslation();

    const DataLang = PersonalPapersHeader.map((data) => {
        if (i18n.language === 'ar') {
            return ({
                'id': data.id,
                'title': data.titleAr,
            })
        }
        return data;
    })

    return (
        <Table hover className='my-3'>
            <thead className="table-header">
                <tr >
                    {DataLang.map((data) => (
                        <th>{data.title}</th>
                    ))}
                </tr>
            </thead>


            <tbody className="table-body">
                <TableBody />
            </tbody>
        </Table>
    )
}

export default TablePersonalPaper