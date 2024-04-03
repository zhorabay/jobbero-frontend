import Email from '../media/Email.png';
import '../styles/Home.css';
import Navigation3 from './Navigation3';

function EmailConfirmation() {
  return (
    <>
    <Navigation3 />
    <div className="confirmation-container">
      <div className="confirmation-flex">
        <img src={Email} alt="Email" className="confirmation-Email" />
        <h2 className="confirmation-h2">Check your email</h2>
        <p className="confirmation-p">Please confirm the email we sent to jaleel545@gmail.com</p>
        <p className="confirmation-p">Check your spam folder if you don’t see the email immediately</p>
        <p className="confirmation-resend">RESEND EMAIL</p>
      </div>
    </div>
    </>
  );
}

export default EmailConfirmation;
