import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Card, Col, Form, Image, Row } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import defultImg from '../../../../assest/images/Vector.svg'
import { PapersData, PersonalPapersData } from '../../../DummyData/DummyData';

const AddBlog = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const imageInput = useRef();
    const [showingOptions, setShowingOptions] = useState([])
    const handlePaperTypeChange = (event) => {
        event.target.value === 'personal' ? setShowingOptions(PersonalPapersData) : setShowingOptions(PapersData)
    };


    const handleImageChange = () => {
        imageInput.current.click();
    };

    const displayImage = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    return (

        <div className="container px-5 pb-4" style={{ borderTop: "2px solid rgb(236, 236, 236)" }}>
            <Row className="px-3 mt-3 rounded border rounded-4">
                <Col md={12}>
                    <Form className=" py-4">
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formPaperType">
                                <Form.Label>Paper type</Form.Label>
                                <Form.Select className="border-2" onChange={handlePaperTypeChange} >
                                    <option value="">Select...</option>
                                    <option value="personal">Personal Paper</option>
                                    <option value="company">Company Paper</option>
                                </Form.Select>

                            </Form.Group>

                        </Row>

                        <Row className="mb-3 pt-3">
                            <Form.Group style={{ height: "200px" }} as={Col} controlId="formPhoto">
                                <Form.Label>Upload Photo</Form.Label>
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
                                    className="pointer"
                                    style={{ height: '70%' }}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="documenttype">
                                <Form.Label>Document type</Form.Label>
                                <Form.Select className="border-2">
                                    <option value="">Select...</option>
                                    {showingOptions.map((item) => (
                                        <option key={item.id} value={item.value}>
                                            {item.document}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>


                        </Row>

                        <div className="w-25 m-auto">
                            <Button
                                type="submit"
                                className="btn m-auto rounded-pill fw-bold mt-3"
                                style={{ background: '#007bff', borderColor: '#007bff', width: '200px' }}
                            >
                                Publish
                            </Button>
                        </div>
                    </Form>
                </Col>

            </Row>
        </div>



    );
};

export default AddBlog;
