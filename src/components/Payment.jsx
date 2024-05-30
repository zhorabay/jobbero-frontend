import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import PaystackPop from '@paystack/inline-js';
import { v4 as uuidv4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import logoblack from '../media/logoblack.png';
import paystackimg from '../media/paystack.png';
// import korapay from '../media/kora.png';
import '../styles/Auth.css';
import Navigation3 from './Navigation3';
import Footer from './Footer';

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const selectedCourseId = location.state?.selectedCourseId;
  const courseIds = location.state?.courseIds || [];
  const generateUniqueId = uuidv4();

  const informBackendAboutPayment = async (userId, courseId, reference) => {
    try {
      const response = await fetch('https://origin8lab-cu7g.onrender.com/payments/success', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference,
          course_id: courseId,
          userId,
        }),
      });

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
        reference: `TXN-${Date.now()}-${generateUniqueId}`,
        onSuccess(transaction) {
          const message = `Payment Complete! Reference ${transaction.reference}`;
          alert(message);
          if (selectedCourseId) {
            informBackendAboutPayment(user.id, [selectedCourseId], transaction.reference);
          } else {
            courseIds.forEach((courseId) => informBackendAboutPayment(user.id, courseId, transaction.reference));
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

  // const koraPayment = () => {
  //   try {
  //     setIsLoading(true);
  //     window.Korapay.initialize({
  //       key: 'pk_test_Nz7r6wgWGGquHWEkJCjW5V6DH3QMmMXzGsEZz1yQ',
  //       reference: `TXN-${Date.now()}-${generateUniqueId}`,
  //       amount: 20000 * 100,
  //       customer: {
  //         name: user.name,
  //         email: user.email,
  //       },
  //       onSuccess(transaction) {
  //         const message = `Payment Complete! Reference ${transaction.reference}`;
  //         alert(message);
  //         if (selectedCourseId) {
  //           informBackendAboutPayment(user.id, [selectedCourseId], transaction.reference);
  //         } else {
  //           courseIds.forEach((courseId) => informBackendAboutPayment(user.id, courseId, transaction.reference));
  //         }
  //         navigate('/');
  //       },
  //       onCancel() {
  //         alert('You have canceled the transaction');
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Error initializing transaction:', error);
  //     alert('An error occurred during payment initiation');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
                {/* <Form.Check
                  inline
                  label={<img src={korapay} alt="Korapay" className="payment-pic" />}
                  name="group1"
                  type="radio"
                  id="inline-radio-2"
                  onClick={koraPayment}
                  disabled={isLoading}
                /> */}
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
