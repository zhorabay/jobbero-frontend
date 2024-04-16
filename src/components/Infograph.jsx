// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import '../styles/Home.css';

function Infograph() {
  return (
    <>
      <div className="homepage-container-2">
        <div className="infograph">
          <div className="infograph-text">
            <h2 className="infograph-h2">2k+</h2>
            <p className="infograph-p">Success Stories</p>
          </div>
          <hr className="infograph-hr" />
          <div className="infograph-text">
            <h2 className="infograph-h2">50+</h2>
            <p className="infograph-p">Expert Instructors</p>
          </div>
          <hr className="infograph-hr" />
          <div className="infograph-text">
            <h2 className="infograph-h2">3k+</h2>
            <p className="infograph-p">Continental Students</p>
          </div>
          <hr className="infograph-hr" />
          <div className="infograph-text">
            <h2 className="infograph-h2">72+</h2>
            <p className="infograph-p">Valuable Courses</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Infograph;
