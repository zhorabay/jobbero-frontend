import React from 'react';
import PropTypes from 'prop-types';
import Email from '../media/Email.png';
import '../styles/Home.css';
import Navigation3 from './Navigation3';

function EmailConfirmation({ users }) {
  return (
    <>
      <Navigation3 />
      <div className="confirmation-container">
        {users && users.map((user) => (
          <div className="confirmation-flex" key={user.id}>
            <img src={Email} alt="Email" className="confirmation-Email" />
            <h2 className="confirmation-h2">Check your email</h2>
            <p className="confirmation-p">
              Please confirm the email we sent to
              <br />
              <span className="red-part">
                {user.email}
              </span>
            </p>
            <p className="confirmation-p">Check your spam folder if you don’t see the email immediately</p>
            <p className="confirmation-resend">RESEND EMAIL</p>
          </div>
        ))}
      </div>
    </>
  );
}

EmailConfirmation.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
    }),
  ),
};

EmailConfirmation.defaultProps = {
  users: [],
};

export default EmailConfirmation;
