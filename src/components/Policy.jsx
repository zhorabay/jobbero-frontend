import React from 'react';
import privacy from '../media/privacy.png';
import '../styles/About.css';
import Navigation3 from './Navigation3';
import Footer from './Footer';

function Policy() {
  return (
    <>
      <Navigation3 />
      <div className="about-container">
        <div className="about-section1">
          <h2 className="about-h2">Privacy Policy</h2>
          <p className="about-p">Safeguarding Your Information: Origin8Lab&apos;s Comprehensive Privacy Policy</p>
        </div>
        <div className="policy-section2">
          <img src={privacy} alt="EmAboutbgail" className="policy-privacy" />
          <div className="psection2-texts">
            <h3 className="psection2-head">Privacy Policy: Your Privacy Matters to Us</h3>
            <p className="about-long-text">
              <br />
              <br />
              Origin8Lab is committed to respecting your privacy and protecting your personal information. This privacy policy explains how we collect, use, and disclose the information you provide to us when using our skill acquisition platform.
              <br />
              <br />
              <span className="bold-text">
                Information We Collect:
              </span>
              <br />
              When you sign up for courses or subscribe to our services, we may collect personal information such as your name, email address, phone number, and payment details. We may also collect non-personal information such as your IP address, browser type, and device information for analytics and optimization purposes.
              <br />
              <br />
              <span className="bold-text">
                Use of Information:
              </span>
              <br />
              We use the information collected from you to provide and improve our services, personalize your experience, and communicate with you about updates and promotions. We may also use your information for marketing purposes, but rest assured, we will never sell, rent, or lease your personal information to third parties without your consent.
              <br />
              <br />
              <span className="bold-text">
                Security Measures:
              </span>
              <br />
              Origin8Lab employs a variety of security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include encryption protocols, secure server infrastructure, and regular security audits. We also restrict access to your information to authorized employees who need to know this information in order to fulfill their job responsibilities.
              <br />
              <br />
              <span className="bold-text">
                Your Rights:
              </span>
              <br />
              You have the right to access, update, or delete your personal information at any time. If you wish to exercise any of these rights or have any questions about our privacy practices, please contact us at [contact@origin8lab.com].
              <br />
              <br />
              <span className="bold-text">
                Changes to Privacy Policy:
              </span>
              <br />
              Origin8Lab reserves the right to update or modify this privacy policy at any time. Any changes will be communicated to you via email or through our platform. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Policy;
