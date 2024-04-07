import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import logoblack from '../media/logoblack.png';
import paystack from '../media/paystack.png';
import flutterwave from '../media/flutterwave.png';
import '../styles/Auth.css';
import Navigation3 from './Navigation3';
import Footer from './Footer';

function Payment() {
  return (
    <>
      <Navigation3 />
      <div className="registration-container">
        <div className="registration-flex">
          <div className="registration-section1">
            <img src={logoblack} alt="Logo" className="registration-logo" />
            <p className="registration-p">Empower Yourself with Origin8Lab: Enroll Today and Thrive Tomorrow!</p>
          </div>
          <div className="payment-section2">
            <div className="rsection3">
              <h2 className="registration-h2">PAYMENT</h2>
            </div>
            <Form>
              <div key="column-radio" className="mb-3 inline-form-p">
                <Form.Check
                  inline
                  label={<img src={paystack} alt="Paystack" className="payment-img" />}
                  name="group1"
                  type="radio"
                  id="inline-radio-1"
                />
                <Form.Check
                  inline
                  label={<img src={flutterwave} alt="Flutterwave" className="payment-img" />}
                  name="group1"
                  type="radio"
                  id="inline-radio-2"
                />
              </div>
            </Form>
          </div>
          <div className="payment-section3">
            <div className="psection3">
              <p className="psection3-logo">ORIGIN8LAB</p>
              <div>
                <p className="psection3-p">trial@origin8lab.com</p>
                <p className="psection3-p">Payment</p>
              </div>
            </div>
            <hr className="psection3-hr" />
            <h2 className="psection3-h2">Enter your card details to pay</h2>
            <Form className="psection3-form">
              <Row className="psection3-row">
                <Col>
                  <Form.Label className="psection3-label">CARD NUMBER:</Form.Label>
                  <Form.Control className="psection3-input-2" placeholder="0000 0000 0000 0000" />
                </Col>
              </Row>
              <Row className="psection3-row">
                <Col>
                  <Form.Label className="psection3-label">CARD EXPIRY:</Form.Label>
                  <Form.Control className="psection3-input" placeholder="MM/YY" />
                </Col>
                <Col>
                  <Form.Label className="psection3-label">CVV:</Form.Label>
                  <Form.Control className="psection3-input" placeholder="123" />
                </Col>
              </Row>
            </Form>
            <button type="button" className="psection3-btn">Pay</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
