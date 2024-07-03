import React from 'react';
import contactimg from '../media/contactimg.png';
import origin8lab2 from '../media/origin8lab2.png';
import phone from '../media/phone.png';
import mail from '../media/mail.png';
import address from '../media/address.png';
import phoneicon from '../media/phoneicon.png';
import mailicon from '../media/mailicon.png';
import nameicon from '../media/nameicon.png';
import messageicon from '../media/messageicon.png';
import subjecticon from '../media/subjecticon.png';
import '../styles/About.css';
import Navigation3 from './Navigation3';
import Footer from './Footer';

function Contact() {
  return (
    <>
      <Navigation3 />
      <div className="about-container">
        <div className="about-section1">
          <h2 className="about-h2">Contact Us</h2>
          <p className="about-p">Reach Out to Origin8Lab: Let&apos;s Elevate Your Skills Together</p>
        </div>
        <div className="contact-body">
          <div className="contact-section2">
            <div className="contact-section2-imgs">
              <p className="contact-section2-p">
                Have a question or
                <br />
                need assistance?
              </p>
              <img src={origin8lab2} alt="origin8lab2" className="contact-about1" />
              <img src={contactimg} alt="contact" className="contact-about2" />
            </div>
            <div className="contact-section2-texts">
              <h4 className="contact-h4">Contact us at Origin8Lab,</h4>
              <h3 className="contact-h3">where we&apos;re dedicated to guiding you through your skill acquisition journey.</h3>
              <p className="about-text">
                <img src={phone} alt="phone" className="phone-img" />
                +447471599776
              </p>
              <p className="about-text">
                <img src={mail} alt="mail" className="mail-img" />
                info@origin8lab.com
              </p>
              <p className="about-text">
                <img src={address} alt="mail" className="mail-img" />
                Plot 6 Block 27 Bashorun Ogunmola Estate Akobo, Ibadan Oyo NG
              </p>
            </div>
          </div>
          <form className="contact-form">
            <label className="contact-label">
              <img src={nameicon} alt="Name" className="contact-icon" />
              <input type="text" placeholder="Name" className="contact-input" />
            </label>
            <label className="contact-label">
              <img src={phoneicon} alt="Phone" className="contact-icon" />
              <input type="tel" placeholder="Phone" className="contact-input" />
            </label>
            <label className="contact-label">
              <img src={mailicon} alt="Email" className="contact-icon" />
              <input type="email" placeholder="Email Address" className="contact-input" />
            </label>
            <label className="contact-label">
              <img src={subjecticon} alt="Subject" className="contact-icon" />
              <input type="text" placeholder="Subject" className="contact-input" />
            </label>
            <label className="contact-label">
              <img src={messageicon} alt="" className="contact-icon" />
              <textarea placeholder="How can we help you? Get in touch" className="contact-textarea" />
            </label>
            <button type="submit" className="contact-btn">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
