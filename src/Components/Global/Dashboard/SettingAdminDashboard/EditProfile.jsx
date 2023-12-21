import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import defaultImg from '../../../../assest/images/default-placeholder.png'
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, updateUserProfile } from '../../../../Redux/Reducers/user';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const EditProfile = () => {   
  
  const dispatch = useDispatch();

  const {user } =useSelector((state) => state.user) 
  useEffect(() => {
    dispatch(getUserData());
    },[])

console.log(user);
console.log(user?.profileImage);
 const [image, setImage] = useState(null);
 const imageInput = useRef();
 const [userProfileImage, setUserProfileImage] = useState(
   user?.profileImage
     ? `http://localhost:4000/seff-academy/uploads/${user?.profileImage}`
     : defaultImg
 );
 

 function imageUpload() {
   imageInput.current.click();
 }

 function imageDisplay(e) {
   let file = e.target.files[0];
   setImage(file);
   setUserProfileImage(URL.createObjectURL(file));
 }
 const { register, handleSubmit } = useForm();
 const initialProfileData = {
  userName: user?.userName ?? null,
  userEmail: user?.userEmail ?? null, 
  company: user?.company ?? null,
  userEmail: user?.userEmail ?? null, 
  password: user?.password ?? null,
 };
 const onSubmit = (data) => { 
   const filteredData = Object.fromEntries(
     Object.entries(data).filter(([key, value]) => value !== undefined)
   );
   if (filteredData.password === filteredData.passwordConfirmation) {
    delete filteredData.passwordConfirmation;
    delete filteredData.password;
   if (image) {
     filteredData.image = image;
   }
   if (Object.keys(filteredData).length === 0) {
     toast.warn('No data to submit.');
     return;
   }
    
   dispatch(updateUserProfile( filteredData))
     .unwrap()
     .then(() => {
       toast.success('Profile Updated');
     })
     .catch((backendError) => {
       toast.error(backendError.error);
     })    } else {
      toast.error("Passwords do not match.");
      return;
    }
 };
  /////////////////////////////////////////////
  // const [selectedImage, setSelectedImage] = useState(null);
  // const imageInput = useRef();

  // console.log(imageInput.current);

  // const handleImageChange = () => {
    // imageInput.current.click();
  // };

  // const displayImage = (e) => {
    // setSelectedImage(e.target.files[0]);
  // };

  return (    
    <div className="container px-5 pb-3" style={{ borderTop: "2px solid rgb(236, 236, 236)" }}>    
      <Form className="mx-4 mt-4 py-2" onSubmit={handleSubmit(onSubmit)}>
      <Row className="py-5 px-3 mt-3 rounded border rounded-4">
        <Col md={12} className="m-auto text-center">

          <div className="rounded-circle border shadow-sm m-auto text-center my-2" style={{ width: "200px", height: "200px" }}>
            <input
              type="file"
              onChange={imageDisplay}
              ref={imageInput}
              className='d-none'
            />
            <Image
              // onClick={handleImageChange}
              src={userProfileImage|| ''} 

              alt='Image'
              className="pointer rounded-circle" 
              style={{ width: "200px", height: "200px" }}
            />

          </div>
          <Col md={12}>
            <Button onClick={imageUpload}
             variant='dark'>Change Profile Picture </Button>
          </Col>
        </Col>

        <Col md={12}>


            <Form.Group className="mb-3" controlId="formUsername" >
              <Form.Label>Username</Form.Label>
              <Form.Control defaultValue={initialProfileData.userName}
									{...register('userName')} type="text" placeholder="Type your username" className='rounded-3 border border-2' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Company </Form.Label>
              <Form.Control  defaultValue={initialProfileData.company}
									{...register('company')} type="text" placeholder="Type your username" className='rounded-3 border border-2' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail" >
              <Form.Label>User Email</Form.Label>
              <Form.Control defaultValue={initialProfileData.userEmail}
									{...register('userEmail')} type="email" placeholder="Type your email" className='rounded-3 border border-2' />
            </Form.Group>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control  
                
									{...register('password')} type="password" placeholder="*************" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3"         >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control id="passwordConfirmation"
              {...register("passwordConfirmation")} type="password" placeholder="*************" />
              </Form.Group>
            </Row>

            <div className="text-end mt-5 ">
              <Link to="/allusers" className="btn btn-danger mx-2 px-5 text-decoration-none" style={{ borderRadius: "35px", fontSize: "20px" }}>Cancel</Link>
              <button type='submit' className="btn btn-primary mx-2 px-5 text-decoration-none" style={{ borderRadius: "35px", fontSize: "20px" }}>Save</button>
            </div>
    
        </Col>

      </Row>      </Form>
    </div>
  );
}

export default EditProfile;
