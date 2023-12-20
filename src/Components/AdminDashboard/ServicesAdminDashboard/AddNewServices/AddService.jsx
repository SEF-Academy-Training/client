import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Card, Col, Form, Image, Row } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import defultImg from '../../../../assest/images/Vector.svg'

const AddService = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const imageInput = useRef();
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleImageChange = () => {
        imageInput.current.click();
    };

    const displayImage = (e) => {
        setSelectedImage(e.target.files[0]);
    };
    const handleCategoryChange = (e) => {
        const selectedOption = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setSelectedCategories([...selectedCategories, selectedOption]);
        } else {
            const updatedCategories = selectedCategories.filter((category) => category !== selectedOption);
            setSelectedCategories(updatedCategories);
        }
    };

    return (
        <div className="container px-5 pb-4" style={{ borderTop: "2px solid rgb(236, 236, 236)" }}>
            <Row className="px-3 mt-3 rounded border rounded-4">
                <Col md={12}>
                    <Form className=" py-4">
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Your blog title" className="border-2" />
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
                            <Form.Group as={Col} controlId="formTag">
                                <Form.Label>Tags</Form.Label>
                                <Form.Control type="text" placeholder="Enter tags" className="border-2" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 pt-3">
                            <Form.Group as={Col} controlId="formCategories">
                                <Form.Label>Categories</Form.Label>
                                <Form.Select className="border-2">
                                    <option value="">Select...</option>
                                    <option value="personal">Personal Paper</option>
                                    <option value="company">Company Paper</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formCategories">
                                <Form.Label>Papers Required</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    label="Option1"
                                    value="Option1"
                                    checked={selectedCategories.includes("Option1")}
                                    onChange={handleCategoryChange}
                                    className='text-danger'
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Option2 "
                                    value="Option2"
                                    checked={selectedCategories.includes("Option2")}
                                    onChange={handleCategoryChange}
                                    className='text-danger'

                                />
                            </Form.Group>
                        </Row>

                        <Form.Group className="my-4" controlId="FormTextarea">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={7} placeholder="Descripte the services" className="border-2" />
                        </Form.Group>

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

export default AddService;
