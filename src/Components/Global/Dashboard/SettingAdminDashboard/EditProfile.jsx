import React, { useRef, useState } from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import defultImg from '../../../../assest/images/default-placeholder.png'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../../Redux/Reducers/user';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const EditProfile = () => {   
  const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user); 

 const [image, setImage] = useState(null);
 const imageInput = useRef();
 const [userProfileImage, setUserProfileImage] = useState(
   user?.profileImage
     ? `http://localhost:4000/seff-academy/uploads/${user.profileImage}`
     : 'https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_1280.png'
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
    
   dispatch(updateUserProfile(filteredData))
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
  const [selectedImage, setSelectedImage] = useState(null);
  // const imageInput = useRef();

  console.log(imageInput.current);

  const handleImageChange = () => {
    imageInput.current.click();
  };

  const displayImage = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (    
    <div className="container px-5 pb-3" style={{ borderTop: "2px solid rgb(236, 236, 236)" }}>    
      <Form className="mx-4 mt-4 py-2" onSubmit={handleSubmit(onSubmit)}>
      <Row className="py-5 px-3 mt-3 rounded border rounded-4">
        <Col md={12} className="m-auto text-center">

          <div className="rounded-circle border shadow-sm m-auto text-center my-2" style={{ width: "200px", height: "200px" }}>
            <input
              type="file"
              onChange={displayImage}
              ref={imageInput}
              className='d-none'
            />
            <Image
              onClick={handleImageChange}
              src={(selectedImage && URL.createObjectURL(selectedImage)) || defultImg}
              alt='defult image'
              className="pointer rounded-circle" 
              style={{ width: "200px", height: "200px" }}
            />

          </div>
          <Col md={12}>
            <Button onClick={handleImageChange}
             variant='dark'>Change Profile Picture </Button>
          </Col>
        </Col>

        <Col md={12}>


            <Form.Group className="mb-3" controlId="formUsername" defaultValue={initialProfileData.userName}
									{...register('userName')}>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Type your username" className='rounded-3 border border-2' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername" defaultValue={initialProfileData.company}
									{...register('company')}>
              <Form.Label>Company </Form.Label>
              <Form.Control type="text" placeholder="Type your username" className='rounded-3 border border-2' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail" defaultValue={initialProfileData.userEmail}
									{...register('userEmail')}>
              <Form.Label>User Email</Form.Label>
              <Form.Control type="email" placeholder="Type your email" className='rounded-3 border border-2' />
            </Form.Group>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="formPassword"defaultValue={initialProfileData.password}
									{...register('password')}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="*************" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formRepeatPassword"          id="passwordConfirmation"
              {...register("passwordConfirmation")} >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="*************" />
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
