import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import teacher from '../media/teacher.png';
import '../styles/Home.css';

function ExpertTutors() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user;

  const handleClick = () => {
    navigate('/registration');
  };

  return (
    <div className="expert-container">
      <div className="expert-flex">
        <div className="expert">
          <h2 className="expert-h2">We have highly experienced tutors to aid your career journey!</h2>
          <p className="expert-p">Origin8Lab boasts the best instructors, handpicked for their expertise and passion, ensuring unparalleled learning experiences for every student.</p>
          {!isLoggedIn && <button type="button" className="expert-btn" onClick={handleClick}>Start Now</button>}
        </div>
        <div className="expert-img">
          <img src={teacher} alt="teacher" className="expert-teacher" />
        </div>
      </div>
    </div>
  );
}

export default ExpertTutors;
