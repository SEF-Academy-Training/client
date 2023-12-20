import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setActiveLink } from '../../../../Redux/Reducers/AdminSlice'
import { createUser } from '../../../../Redux/Reducers/user'
import { useForm } from "react-hook-form"; 
import { toast } from 'react-toastify'

const AddUser = () => {

    const navigate = useNavigate()
    const { register, handleSubmit, reset,formState: { isSubmitSuccessful } } = useForm(); 
    const onSubmit = (data) => {
     
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== undefined)
      );
      if (Object.keys(filteredData).length === 0) {
        toast.warn("No data to submit.");
        return;
      }
      console.log(filteredData)
      console.log(filteredData.password!==filteredData.passwordConfirmation)
  
  if(filteredData.password===filteredData.passwordConfirmation){
    delete filteredData.passwordConfirmation
    // delete filteredData.password
   dispatch(createUser(filteredData))
        .unwrap()
        .then(() => {
          toast.success("Profile Successfully Created");
                     navigate('/useradmindashboard')

        })
        .catch((backendError) => {
          console.log(backendError)
          toast.error(backendError.error);
        });
  }else{
    toast.error('Passwords do not match.')
    return
  }
  
    };
    /////////////////////////

    const dispatch = useDispatch()
    const toggleDark = useSelector((state) => state.GlobalSlice.toggleDark);

    const handleBtn = () => {
        dispatch(setActiveLink('all users'))
    }
    return (
        <div className={`container px-5 pb-4 rounded-bottom-5 ${toggleDark ? 'bg-dark text-light' : ''}`} style={{ borderTop: "2px solid rgb(236, 236, 236)" }}>
            <Row className="py-2 px-3 mt-3 rounded border rounded-4">
                <Col md={12}>
                    <Form className="mx-4 mt-4 py-2" onSubmit={handleSubmit(onSubmit)}>
                    

                        <Form.Group className="mb-3" controlId="userName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Type your username" className='rounded-3 border border-2' {...register('userName')}/>
                        </Form.Group>   
                        <Form.Group className="mb-3" controlId="company">
                            <Form.Label>Company</Form.Label>
                            <Form.Control type="text" placeholder="Type your Company" className='rounded-3 border border-2' {...register('company')} />
                        </Form.Group>   
                         <Form.Group className="mb-3" controlId="userEmail">
                            <Form.Label>User Email</Form.Label>
                            <Form.Control type="email" placeholder="Type your email" className='rounded-3 border border-2' {...register('userEmail')} />
                        </Form.Group>

                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="*************"  {...register('password')}/>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" 
    >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="*************"                         id="passwordConfirmation"
              {...register("passwordConfirmation")}/>
                            </Form.Group>
                        </Row>

                        <div className="text-end mt-5">
                            <Link to='/useradmindashboard' onClick={handleBtn} className="btn btn-danger mx-2 px-5 text-decoration-none" style={{ borderRadius: "35px", fontSize: "20px" }}>Cancel</Link>
                            <button type='submit' className="btn btn-primary mx-2 px-5 text-decoration-none" style={{ borderRadius: "35px", fontSize: "20px" }}>create user</button>
                        </div>
                    </Form>
                </Col>

            </Row>
        </div>)
}

export default AddUser