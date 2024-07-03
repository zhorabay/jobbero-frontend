import React from 'react';
import refund from '../media/refund.png';
import '../styles/About.css';
import Navigation3 from './Navigation3';
import Footer from './Footer';

function Refund() {
  return (
    <>
      <Navigation3 />
      <div className="about-container">
        <div className="about-section1">
          <h2 className="about-h2">Refund Policy</h2>
          <p className="about-p">Hassle-Free Refunds: Your Satisfaction Guaranteed with Origin8lab&apos;s Course Purchase Policy</p>
        </div>
        <div className="policy-section2">
          <img src={refund} alt="EmAboutbgail" className="policy-privacy" />
          <div className="psection2-texts">
            <h3 className="psection2-head">Origin8lab Refund Policy</h3>
            <p className="about-long-text">
              <br />
              <br />
              At Origin8lab, we strive to provide high-quality, comprehensive training
              to empower our users. However, we understand that there may be
              instances where a refund is necessary. Below is our refund policy for
              the purchase of courses on our platform:
              <br />
              <br />
              <span className="bold-text">
                1. Eligibility for Refund
              </span>
              <br />
              - Within 7 Days of Purchase: If you are not satisfied with a course, you may
              request a refund within 7 days of the purchase date. To be eligible for a
              refund, you must not have completed more than 20% of the course content.
              - Technical Issues: If you experience technical issues that prevent you from
              accessing the course, and we are unable to resolve them within a reasonable
              timeframe, you are eligible for a full refund.
              <br />
              <br />
              <span className="bold-text">
                2. Non-Refundable Situations
              </span>
              <br />
              - Completed Courses: Refunds are not available for courses where more
              than 20% of the content has been completed.
              - Discounted/Sale Courses: Courses purchased at a discounted rate or
              during a promotional sale are not eligible for refunds.
              - Duplicate Purchases: In cases where the same course is purchased more
              than once, only one purchase is eligible for a refund, provided it meets the other criteria.
              <br />
              <br />
              <span className="bold-text">
                3. Refund Process
              </span>
              <br />
              - Request Submission:To request a refund, please contact our support team
              at support@origin8lab.com with your purchase details and the reason for the refund request.
              - Review Period: Our team will review your request and respond within 5 business days.
              - Refund Issuance: Approved refunds will be processed within 10 business days of
              approval. Refunds will be credited to the original payment method.
              <br />
              <br />
              <span className="bold-text">
                4. Course Changes and Cancellations
              </span>
              <br />
              - Course Modifications: Origin8lab reserves the right to modify or discontinue
              courses. If a course is significantly changed or discontinued, users will be
              notified, and refunds will be handled on a case-by-case basis.
              - Cancellations: If Origin8lab cancels a course, enrolled users will receive a full refund.
              <br />
              <br />
              <span className="bold-text">
                5. Contact Us
              </span>
              <br />
              For any questions or concerns regarding our refund policy, please contact
              us at support@origin8lab.com or call +2348050707084.
              <br />
              We value your feedback and strive to improve our courses and services
              continually. Thank you for choosing Origin8lab.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Refund;
