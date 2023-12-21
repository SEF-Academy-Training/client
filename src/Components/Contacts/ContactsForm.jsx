import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { contactUs } from '../../Redux/Reducers/contactUsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { errorMsg, successMsg } from '../Global/Toastify/Toastify';

const ContactsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.contact);
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(contactUs(data))
      .unwrap()
      .then(() => {
       successMsg('Successfully submitted !!')
      })
      .catch((backendError) => {
        errorMsg(backendError.error);
      });
  };

  const ContactsFormData = [
    {
      id: 41,
      title: 'Name',
      titleAr: 'الاسم',
      type: 'text',
      placeholder: 'Full Name',
      placeholderAr: 'الاسم الكامل',
      required: true,
      name: 'name', // Added a name attribute for each field
      defaultValue: user?.userName || '', // Use an empty string if user?.userName is undefined
    },
    {
      id: 42,
      title: 'Title',
      titleAr: 'العنوان',
      type: 'text',
      placeholder: 'Job Title',
      placeholderAr: 'المسمى الوظيفي',
      required: false,
      name: 'title',
      defaultValue: '', // Set a default value if needed
    },
    {
      id: 43,
      title: 'Email',
      titleAr: 'البريد الإلكتروني',
      type: 'email',
      placeholder: 'example@gmail.com',
      placeholderAr: 'مثال@gmail.com',
      required: true,
      name: 'email',
      defaultValue: user?.userEmail || '', // Use an empty string if user?.userEmail is undefined
    },
    {
      id: 44,
      title: 'Subject',
      titleAr: 'الموضوع',
      type: 'text',
      placeholder: 'About Subject',
      placeholderAr: 'حول الموضوع',
      required: false,
      name: 'subject',
      defaultValue: '', // Set a default value if needed
    },
    {
      id: 45,
      title: 'Message',
      titleAr: 'الرسالة',
      type: 'textarea',
      placeholder: 'Enter Your Message Here',
      placeholderAr: 'أدخل رسالتك هنا',
      required: false,
      name: 'message',
      defaultValue: '', // Set a default value if needed
    },
  ];

  return (
    <Container className="w-75 m-auto py-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-4 p-4 rounded-5" style={{ border: '2px solid rgb(236, 236, 236)' }}>
          {ContactsFormData.map((itm) => (
            <React.Fragment key={itm.id}>
              <Col sm={12} md={6} mt={4} className="py-2">
                <Form.Group>
                  <Form.Label>{i18n.language === 'en' ? itm.title : itm.titleAr}</Form.Label>
                  {itm.required && <span className="star">*</span>}
                  {itm.type !== 'textarea' ? (
                    <Form.Control
                      type={itm.type}
                      className="rounded-4"
                      style={{ borderWidth: '2px', padding: '15px' }}
                      placeholder={i18n.language === 'en' ? itm.placeholder : itm.placeholderAr}
                      {...register(itm.name, { required: itm.required })}
                    />
                  ) : (
                    <Form.Control
                      as="textarea"
                      rows={7}
                      style={{ borderWidth: '2px', borderRadius: '18px', padding: '15px' }}
                      placeholder={i18n.language === 'en' ? itm.placeholder : itm.placeholderAr}
                      {...register(itm.name, { required: itm.required })}
                    />
                  )}
                  {errors[itm.name] && <span className="error">This field is required</span>}
                </Form.Group>
              </Col>
            </React.Fragment>
          ))}
          <Col md={12} sm={12} mt={4} className="text-center py-4">
            <Button type="submit" variant="primary" style={{ width: '250px', borderRadius: '35px', fontWeight: 'bold' }}>
              {t('Send now')}
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default ContactsForm;
