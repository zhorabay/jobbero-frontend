import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { fetchCourses } from '../redux/actions/courseActions';
import { signUp } from '../redux/actions/userActions';
import setSelectedCourseId from '../redux/actions/selectedCourseActions';
import informBackendAboutPayment from './Payment';
import 'react-datepicker/dist/react-datepicker.css';
import logoblack from '../media/logoblack.png';
import '../styles/Auth.css';
import Navigation3 from './Navigation3';
import Footer from './Footer';

function Registration() {
  const dispatch = useDispatch();
  const coursesState = useSelector((state) => state.courses.courses);
  const selectedCourseId = useSelector((state) => state.selectedCourse.selectedCourseId);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    birthdate: null,
    whatsapp: '',
    phone_number: '',
    email: '',
    nationality: '',
    gender: 'Choose',
    password: '',
    password_confirmation: '',
  });
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  let courses = [];
  if (Array.isArray(coursesState)) {
    courses = coursesState;
  } else if (coursesState.success && Array.isArray(coursesState.courses)) {
    courses = coursesState.courses;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value.trim();
    setUserData({ ...userData, [name]: formattedValue });
  };

  const handleDateChange = (date) => {
    setUserData({ ...userData, birthdate: date });
  };

  const handleCourseSelection = (courseId) => {
    dispatch(setSelectedCourseId(courseId));
    console.log('courseId:', courseId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!');
    setLoading(true);
    try {
      const response = await dispatch(signUp(userData, selectedCourseId));
      console.log('response:', response);
      if (response) {
        const { token } = response;
        sessionStorage.setItem('token', token);
        console.log('Navigating to payment page with selectedCourseId:', selectedCourseId);
        navigate('/payment', { state: { selectedCourseId } });
        informBackendAboutPayment(user.id);
      }
    } catch (error) {
      console.error('Error occurred during sign-up:', error);
    }
    setLoading(false);
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
            <h2 className="registration-h2">PERSONAL INFORMATION</h2>
            <form className="registration-form" onSubmit={handleSubmit}>
              <div>
                <div className="registration-row">
                  <div className="registration-col">
                    <label className="registration-label">First Name:</label>
                    <input className="registration-input" name="name" value={userData.name} onChange={handleChange} required />
                  </div>
                  <div className="registration-col">
                    <label className="registration-label">Last Name:</label>
                    <input className="registration-input" name="surname" value={userData.surname} onChange={handleChange} required />
                  </div>
                </div>
                <div className="registration-row">
                  <div className="registration-col">
                    <label className="registration-label">Gender:</label>
                    <select className="registration-input" name="gender" value={userData.gender} onChange={handleChange}>
                      <option disabled className="choose">Choose</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="registration-col">
                    <label className="registration-label">Date Of Birth:</label>
                    <DatePicker
                      selected={userData.birthdate}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD/MM/YYYY"
                      className="registration-input-datepicker"
                      required
                    />
                  </div>
                </div>
                <div className="registration-row">
                  <div className="registration-col">
                    <label className="registration-label">WhatsApp Number:</label>
                    <input className="registration-input" name="whatsapp" value={userData.whatsapp} onChange={handleChange} required />
                  </div>
                  <div className="registration-col">
                    <label className="registration-label">Phone Number:</label>
                    <input className="registration-input" name="phone_number" value={userData.phone_number} onChange={handleChange} required />
                  </div>
                </div>
                <div className="registration-row">
                  <div className="registration-col">
                    <label className="registration-label">Email:</label>
                    <input className="registration-input" name="email" value={userData.email} onChange={handleChange} required />
                  </div>
                  <div className="registration-col">
                    <label className="registration-label">Nationality:</label>
                    <input className="registration-input" name="nationality" value={userData.nationality} onChange={handleChange} required />
                  </div>
                </div>
                <div className="registration-row">
                  <div className="registration-col">
                    <label className="registration-label">Password:</label>
                    <input className="registration-input" name="password" type="password" value={userData.password} onChange={handleChange} required />
                  </div>
                  <div className="registration-col">
                    <label className="registration-label">Password Confirmation:</label>
                    <input className="registration-input" name="password_confirmation" type="password" value={userData.password_confirmation} onChange={handleChange} required />
                  </div>
                </div>
              </div>
              <div className="registration-section3">
                <div className="rsection3">
                  <h2 className="registration-h2">COURSES</h2>
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
                      <label className="course-title-reg" htmlFor={`radio-${course.id}`}>
                        {course.title}
                        {' '}
                        (20,000 NGN)
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="registration-section4">
                <h2 className="registration-h2">ADDITIONAL INFORMATION</h2>
                <div className="registration-row">
                  <div className="registration-col">
                    <label className="registration-label">Employment Status:</label>
                    <input className="registration-input" />
                  </div>
                  <div className="registration-col">
                    <label className="registration-label">How Did You Hear About Origin8Lab?</label>
                    <input className="registration-input" />
                  </div>
                </div>
                <div className="registration-row">
                  <div className="registration-col">
                    <label className="registration-label">Any Special Requirements or Accommodations Needed?</label>
                    <textarea className="registration-input-big" />
                  </div>
                </div>
              </div>
              <button type="submit" className="registration-btn">Next</button>
            </form>
            {error && <div className="text-red-500">{error}</div>}
            {loading && (
              <div className="loading-container">
                <div className="loading-spinner" />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Registration;
