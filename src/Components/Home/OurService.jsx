import React from 'react';
import { Col, Card } from 'react-bootstrap';

const OurService = ({ title, num }) => {
  return (
    <Col lg={4} md={6} sm={12} className="mb-4">
      <Card className="box-one bg-white rounded-4 border-primary py-2">
        <Card.Body className="box-one-content ps-3 position-relative">
          <h1 className="position-absolute text-primary opacity-25" style={{fontSize:'4rem'}}>{num}</h1>
          <Card.Title className="text-black fw-bold pt-3 px-3 py-3" style={{ height: "90px",fontSize:'26px' }}>{title}</Card.Title>
          <Card.Text className='px-3'>
            Provides its tax services in this area on
            the basis of the specialization principle.
            Accordingly, each partner and his group
            provide...
          </Card.Text>
          <a href="#" className="text-decoration-none px-3">Learn More</a>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default OurService;
