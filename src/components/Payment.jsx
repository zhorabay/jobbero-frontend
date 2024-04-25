import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PaystackPop from '@paystack/inline-js';
import Form from 'react-bootstrap/Form';
import logoblack from '../media/logoblack.png';
import paystackimg from '../media/paystack.png';
import flutterwave from '../media/flutterwave.png';
import '../styles/Auth.css';
import Navigation3 from './Navigation3';
import Footer from './Footer';

function Payment() {
  const user = useSelector((state) => state.auth.user);
  // const cartItems = useSelector((state) => state.cart.items);
  const [isLoading, setIsLoading] = useState(false);

  const paystackPayment = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: 'pk_live_03a1c01d490ee49f14ad187283af346d5c2b7069',
        email: user.email,
        // amount: totalPrice * 100,
        amount: 20.00,
        reference: 'unique_reference_for_transaction',
        onSuccess(transaction) {
          const message = `Payment Complete! Reference ${transaction.reference}`;
          alert(message);
          sessionStorage.setItem('paymentStatus', 'paid');
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
