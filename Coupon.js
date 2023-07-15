import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import './App.css';

const CouponManager = () => {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const handleAddCoupon = () => {
    if (newCoupon.trim() !== '') {
      setCoupons([...coupons, newCoupon.trim()]);
      setNewCoupon('');
    }
  };

  const handleRemoveCoupon = (coupon) => {
    setCoupons(coupons.filter((c) => c !== coupon));
  };

  const handleApplyCoupon = () => {
    setAppliedCoupon(newCoupon);
    setNewCoupon('');
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h2>Coupon Manager</h2>
          <Form>
            <Form.Group controlId="formNewCoupon">
              <Form.Label>New Coupon Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter coupon code"
                value={newCoupon}
                onChange={(e) => setNewCoupon(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddCoupon}>
              Add Coupon
            </Button>{' '}
            <Button variant="success" onClick={handleApplyCoupon}>
              Apply Coupon
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <h2>Applied Coupon</h2>
          <p>{appliedCoupon}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <h2>Coupon List</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Coupon Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{coupon}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveCoupon(coupon)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default CouponManager;
