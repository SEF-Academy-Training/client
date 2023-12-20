import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AdminDashboardSideBar from '../../AdminDashboardGlobal/AdminDashboardSideBar'
import PaginationBar from '../../../Global/PaginationBar'
import DashboardHeader from '../../../Global/Dashboard/DashboardHeader/DashboardHeader'
import { useSelector } from 'react-redux'
import AddService from './AddService'


const AddServicesAdminDashboard = () => {
    const toggleDark = useSelector((state) => state.GlobalSlice.toggleDark);

    return (
        <Container fluid >
            <Row>
                <Col sm={3}>
                    <div className='px-4'>
                        <AdminDashboardSideBar />
                    </div>
                </Col>


                <Col sm={9}>
                    <div style={{ paddingRight: '50px' }}>
                        <div className={`bg-light my-5 rounded-5 ${toggleDark ? 'bg-dark text-light border' : 'bg-light text-dark'}`}
                        >
                            <DashboardHeader pageTitle={'Add New Services'} display={'display'} />
                           <AddService/>
                            <PaginationBar />

                        </div>
                    </div>
                </Col>
            </Row>

        </Container>)
}

export default AddServicesAdminDashboard
