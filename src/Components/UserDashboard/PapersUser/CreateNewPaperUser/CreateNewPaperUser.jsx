import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import DashboardHeader from '../../../Global/Dashboard/DashboardHeader/DashboardHeader'
import UserDashboardSideBar from '../../UserDashboardGlobal/UserDashboardSideBar'
import CreatePaper from './CreatePaper'

const CreateNewPaperUser = () => {
  return (
    <Container fluid>
    <Row>
      <Col sm={3}>
        <div className='px-4'>
          <UserDashboardSideBar />
        </div>
      </Col>

      <Col sm={9}>
        <div style={{ paddingRight: '50px' }}>
          <div className="bg-light my-5 rounded-5">
            <DashboardHeader pageTitle={'Create Paper'} display={'display'} />
            <CreatePaper/>
          </div>
        </div>
      </Col>
    </Row>

  </Container>  )
}

export default CreateNewPaperUser