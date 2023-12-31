import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AdminDashboardSideBar from '../../../AdminDashboard/AdminDashboardGlobal/AdminDashboardSideBar';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import EditProfile from './EditProfile';
import UserDashboardSideBar from '../../../UserDashboard/UserDashboardGlobal/UserDashboardSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../../../Redux/Reducers/user';




const SettingAdminDashboard = ({Role}) => {

  const dispatch = useDispatch();

  const {user } =useSelector((state) => state.user) 
  useEffect(() => {
    dispatch(getUserData());
    },[])
  //////////////////////////////////////////
  const userRole = useSelector((state) => state.UserSlice.userRole);

    return (
        <>
        <Container fluid>
          <Row>
            <Col sm={3}>
              <div className='px-4'>
                {/* <AdminDashboardSideBar/> */}
                {/* {userRole == 'Admin'&& <AdminDashboardSideBar />} */}
                {/* {userRole== 'User'&& <UserDashboardSideBar />} */}
                {user?.role == 'Admin'&& <AdminDashboardSideBar />}
                {user?.role== 'User'&& <UserDashboardSideBar />}
              </div>
            </Col>
  
  
            <Col sm={9}>
              <div style={{ paddingRight: '50px' }}>
                <div className="bg-light my-5 rounded-5">
                  <DashboardHeader pageTitle={'Edit Profile'} />
                  <EditProfile/>
                </div>
              </div>
            </Col>
          </Row>
  
        </Container>
      </>
        )
}

export default SettingAdminDashboard