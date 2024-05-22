import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCourses } from '../redux/actions/courseActions';
import { setSelectedCourseId } from '../redux/actions/selectedCourseActions';
import logoblack from '../media/logoblack.png';
import '../styles/Auth.css';
import Navigation3 from './Navigation3';
import Footer from './Footer';
import LoginModal from './LoginModal';

function ChooseCourse() {
  const dispatch = useDispatch();
  const coursesState = useSelector((state) => state.courses.courses);
  const selectedCourseId = useSelector((state) => state.selectedCourse.selectedCourseId);
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  let courses = [];
  if (Array.isArray(coursesState)) {
    courses = coursesState;
  } else if (coursesState.success && Array.isArray(coursesState.courses)) {
    courses = coursesState.courses;
  }

  const handleCourseSelection = (courseId) => {
    dispatch(setSelectedCourseId(courseId));
    console.log('courseId:', courseId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Navigating to payment page with selectedCourseId:', selectedCourseId);
    navigate('/payment', { state: { selectedCourseId } });
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
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
          <div className="registration-section2">
            <form className="registration-form" onSubmit={handleSubmit}>
              <div className="registration-section3">
                <div className="rsection3">
                  <h2 className="registration-h2">SELECT A COURSE</h2>
                  <p className="registration-select">Select One</p>
                </div>
                <div className="mb-3">
                  {courses.map((course) => (
                    <div key={course.id}>
                      <input
                        type="radio"
                        name="selectedCourseId"
                        id={`radio-${course.id}`}
                        onChange={() => handleCourseSelection(course.id)}
                        required
                      />
                      <label className="course-title-reg" htmlFor={`radio-${course.id}`}>{course.title}</label>
                    </div>
                  ))}
                </div>
              </div>
              <button type="submit" className="registration-btn">Next</button>
              <button type="button" className="login-btn" onClick={handleLoginClick}>Login</button>
            </form>
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </div>
      </div>
      <Footer />

      {showLoginModal && <LoginModal onSuccess={handleLoginSuccess} onClose={() => setShowLoginModal(false)} />}
    </>
  );
}

export default ChooseCourse;
