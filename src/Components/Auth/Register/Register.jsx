import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { errorMsg, successMsg } from '../../Global/Toastify/Toastify';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../Redux/Reducers/user';
import { useForm } from "react-hook-form"; 
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  
  const dispatch = useDispatch()  
  const navigate = useNavigate();


const {
  register,
  handleSubmit,
} = useForm();
const {loading} =useSelector((state) => state.user)
const onSubmit = (data) => {
  if (data.password === data.passwordConfirmation) {
    delete data.passwordConfirmation; 

  dispatch(registerUser(data))
  .unwrap()
  .then(() => {
    successMsg('Correct Info !!')
    navigate("/");

  })
  .catch((backendError) => { 
  // backendError.error.map((err)=>errorMsg(err.message));

    console.log(backendError);
    errorMsg(backendError.message);
  })
}else {
  errorMsg("Passwords do not match.");
  return;
}
}
/////////////////////////////////////////////


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;


  //   if (form.checkValidity() === false) {
  //     e.stopPropagation();
  //     setValidated(true);
  //     errorMsg('Please fill in all required fields correctly.');
  //     return;
  //   }

  //   if (formData.password !== formData.confirmPassword) {
  //     errorMsg('Passwords do not match.');
  //     return;
  //   }

  //   setValidated(true);
  //   navigate('/login')
  //   successMsg('Registration successful!')

  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (validated && name === 'email' && !value) {
      errorMsg('Please enter a valid email.');
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form className="my-5 w-75 m-auto bg-light p-5 rounded" onSubmit={handleSubmit(onSubmit)} validated={validated}>
      <div className="container px-5 py-4">
        <div className="p-5 border rounded-5">
          <Form.Group className="mb-3">
          <Form.Label>user Name</Form.Label>
            <Form.Control
              type="userName"
              name="userName"
              {...register("userName")}

              required
            /> 

            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              // value={formData.email}
              // onChange={handleChange}              
              // isInvalid={validated && !formData.email}
              {...register("userEmail")}

              required
            />
            <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
          </Form.Group>

          <Form.Label>Company</Form.Label>
            <Form.Control
              type="company"
              name="company" 
              {...register("company")}

              required
            />
          <Form.Group className="mb-3 position-relative">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              name="password"
              // value={formData.password}
              // onChange={handleChange}              
              // isInvalid={validated && !formData.password}
              required
              {...register("password")}

              
            />
            <div
              className="login_right-icon clickable position-absolute"
              onClick={handleShowPassword}
              style={{ right: '20px', top: '40px', cursor: 'pointer' }}
            >
              {showPassword ? <FaRegEyeSlash size={22} /> : <FaRegEye size={22} />}
            </div>
            <Form.Control.Feedback type="invalid">Please enter your password.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 position-relative">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              // value={formData.confirmPassword}
              // onChange={handleChange}              
              // isInvalid={validated && !formData.confirmPassword}
              id="passwordConfirmation"
              {...register("passwordConfirmation")}
              required
            />
            <Form.Control.Feedback type="invalid">Please confirm your password.</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="w-100">
            Sign Up
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Register;
