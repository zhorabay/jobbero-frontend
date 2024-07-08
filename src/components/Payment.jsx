import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import PaystackPop from '@paystack/inline-js';
import { v4 as uuidv4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import logoblack from '../media/origin8lab2.png';
import paystackimg from '../media/paystack.png';
import flutterwave from '../media/flutterwave.png';
import '../styles/Auth.css';
import Navigation3 from './Navigation3';
import Footer from './Footer';

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userCountry } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const selectedCourseId = location.state?.selectedCourseId;
  const courseIds = location.state?.courseIds || [];

  const informBackendAboutPayment = async (userId, courseId, reference) => {
    try {
      const response = await fetch(
        'https://origin8lab-cu7g.onrender.com/payments/success',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reference,
            course_id: courseId,
            userId,
          }),
        },
      );

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
    try {
      setIsLoading(true);
      // const totalPrice = selectedCourseId ? 20000 * 100 : courseIds.reduce((acc, courseId) => acc + 20000 * 100, 0);

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: 'pk_live_03a1c01d490ee49f14ad187283af346d5c2b7069',
        email: user.email,
        amount: 20000 * 100,
        reference: `TXN-${Date.now()}-${uuidv4()}`,
        onSuccess(transaction) {
          const message = `Payment Complete! Reference ${transaction.reference}`;
          alert(message);
          if (selectedCourseId) {
            informBackendAboutPayment(
              user.id,
              [selectedCourseId],
              transaction.reference,
            );
          } else {
            courseIds.forEach((courseId) => informBackendAboutPayment(
              user.id,
              courseId,
              transaction.reference,
            ));
          }
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

  const dollarPaystackPayment = () => {
    window.location.href = 'https://paystack.com/pay/epqikqysw3';
  };

  const flutterwavePayment = () => {
    try {
      setIsLoading(true);
      console.log('Initializing Flutterwave...');
      const reference = `TXN-${Date.now()}-${uuidv4()}`;
      const amountInNaira = 20000;
      const amountInDollar = 14;
      const amount = userCountry.toLowerCase() === 'nigeria' ? amountInNaira : amountInDollar;
      const currency = userCountry.toLowerCase() === 'nigeria' ? 'NGN' : 'USD';
      const customer = {
        name: user.name,
        email: user.email,
      };

      console.log('Flutterwave Payload:', {
        reference, amount, currency, customer,
      });

      window.FlutterwaveCheckout({
        public_key: 'FLWPUBK_TEST-91063d904b3eb0a8de72c3af1500b105-X',
        tx_ref: reference,
        amount,
        currency,
        payment_options: 'card, mobilemoney, ussd',
        customer: {
          email: customer.email,
          name: customer.name,
        },
        callback(data) {
          const { status, tx_ref } = data;
          if (status === 'successful') {
            alert(`Payment Complete! Reference ${tx_ref}`);
            if (selectedCourseId) {
              informBackendAboutPayment(user.id, [selectedCourseId], tx_ref);
            } else {
              courseIds.forEach((courseId) => informBackendAboutPayment(user.id, courseId, tx_ref));
            }
            navigate('/');
          } else {
            alert('Payment failed. Please try again.');
          }
        },
        onclose() {
          alert('You have canceled the transaction');
        },
        customizations: {
          title: 'Origin8Lab Payment',
          description: 'Payment for selected courses',
          logo: logoblack,
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
            <p className="registration-p">
              Empower Yourself with Origin8Lab: Enroll Today and Thrive
              Tomorrow!
            </p>
          </div>
          <div className="payment-section2">
            <div className="rsection3">
              <h2 className="registration-h2">PAYMENT</h2>
            </div>
            <Form className="payment-form">
              <div key="column-radio" className="mb-3 inline-form-p">
                <Form.Check
                  inline
                  label={
                    (
                      <img
                        src={paystackimg}
                        alt="Paystack"
                        className="payment-img"
                      />
                  )
                  }
                  name="group1"
                  type="radio"
                  id="inline-radio-1"
                  onClick={userCountry.toLowerCase() === 'nigeria' ? paystackPayment : dollarPaystackPayment}
                  disabled={isLoading}
                />
                <Form.Check
                  inline
                  label={<img src={flutterwave} alt="Flutterwave" className="payment-img" />}
                  name="group1"
                  type="radio"
                  id="inline-radio-2"
                  onClick={flutterwavePayment}
                  disabled={isLoading}
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
