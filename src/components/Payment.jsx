import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaystackPop from '@paystack/inline-js';
import { v4 as uuidv4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import logoblack from '../media/logoblack.png';
import paystackimg from '../media/paystack.png';
import flutterwave from '../media/flutterwave.png';
import '../styles/Auth.css';
import Navigation3 from './Navigation3';
import Footer from './Footer';

function Payment() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const selectedCourseId = useSelector((state) => state.selectedCourse.selectedCourseId);
  const generateUniqueId = uuidv4();

  const informBackendAboutPayment = async (userId) => {
    try {
      const response = await fetch('https://origin8lab-cu7g.onrender.com/payments/success', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference: `TXN-${Date.now()}-${generateUniqueId}`,
          course_id: selectedCourseId,
          userId: user.id,
        }),
      });
      console.log('id:', userId);

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error('Failed to inform backend about payment');
      }
    } catch (error) {
      console.error('Error informing backend about payment:', error);
    }
  };

  const paystackPayment = async (e) => {
    e.preventDefault();
    if (!selectedCourseId) {
      alert('Please select a course before proceeding with the payment.');
      return;
    }

    try {
      setIsLoading(true);
      // const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: 'pk_test_5366b82b682f2debcdf19941ac686d2dcec0ba73',
        email: user.email,
        // amount: totalPrice * 100,
        amount: 20000.00 * 100,
        reference: `TXN-${Date.now()}-${generateUniqueId}`,
        onSuccess(transaction) {
          const message = `Payment Complete! Reference ${transaction.reference}`;
          alert(message);
          informBackendAboutPayment(selectedCourseId);
          navigate('/');
        },
        onCancel() {
          alert('You have canceled the transaction');
        },
      });
    } catch (error) {
      console.error('Error initializing transaction:', error);
      alert('An error occurred during payment initiation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation3 />
      <div className="payment-container">
        <div className="registration-flex">
          <div className="registration-section1">
            <img src={logoblack} alt="Logo" className="registration-logo" />
            <p className="registration-p">Empower Yourself with Origin8Lab: Enroll Today and Thrive Tomorrow!</p>
          </div>
          <div className="payment-section2">
            <div className="rsection3">
              <h2 className="registration-h2">PAYMENT</h2>
            </div>
            <Form className="payment-form">
              <div key="column-radio" className="mb-3 inline-form-p">
                <Form.Check
                  inline
                  label={<img src={paystackimg} alt="Paystack" className="payment-img" />}
                  name="group1"
                  type="radio"
                  id="inline-radio-1"
                  onClick={paystackPayment}
                  disabled={isLoading}
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
