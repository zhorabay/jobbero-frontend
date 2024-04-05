import React, { useState, useEffect } from 'react';
import axios from 'axios';
import down from '../media/down.png';
import signin from '../media/sign-blue.png';
import '../styles/Auth.css';
import Navigation3 from './Navigation3';

function Account() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/users')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <Navigation3 />
      <div className="account-container">
        <div className="account-flex">
          <div className="account-section1">
            <h2 className="account-h2">Welcome to Origin8Lab Africa, Here is your dashboard</h2>
            <div className="account-section2">        
              {user ? (
                <>
                  {user.photo ? (
                    <img src={user.photo} alt="Profile" className="account-signin" />
                  ) : (
                    <img src={signin} alt="signin" className="account-signin" />
                  )}
                  <p className="account-user">{user.name}</p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="account-section21">
              <div className="account-text">
                <h3 className="account-h3">2</h3>
                <p className="account-p">Courses</p>
              </div>
              <hr className="account-hr" />
              <div className="account-text">
                <h3 className="account-h3">2</h3>
                <p className="account-p">Completed</p>
              </div>
              <hr className="account-hr" />
              <div className="account-text">
                <h3 className="account-h3">2</h3>
                <p className="account-p">Certificate</p>
              </div>
              <hr className="account-hr" />
              <div className="account-text">
                <h3 className="account-h3">2</h3>
                <p className="account-p">Points</p>
              </div>
            </div>
          </div>
          <div className="account-section3">
            <p className="account-courses">Your Courses</p>
            <button type="button" className="account-expand" onClick={toggleExpand}>
              <img src={down} alt="down" className="account-down" />
              Expand All
            </button>
            {isExpanded && (
              <div className="account-list">
                <button type="button" className="account-course-list">
                  <div className="button-prt1">
                    <h4 className="account-h4">Virtual Assistant</h4>
                  </div>
                  <div className="button-prt2">
                    <p className="account-status">In Progress</p>
                    <img src={down} alt="down" className="account-down-2" />
                  </div>
                </button>
                <button type="button" className="account-course-list">
                  <h4>UX design</h4>
                  <p>InProgress</p>
                  <img src={down} alt="down" className="account-down-2" />
                </button>
              </div>
            )}
          </div>
      </div>
      </div>
    </>
  );
}

export default Account;
