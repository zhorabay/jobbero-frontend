import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { fetchCourses } from '../redux/actions/courseActions';
import { signUp } from '../redux/actions/userActions';
import setSelectedCourseId from '../redux/actions/selectedCourseActions';
import logoblack from '../media/logoblack.png';
import '../styles/Auth.css';
import Navigation3 from './Navigation3';
import Footer from './Footer';

function Registration() {
  const dispatch = useDispatch();
  const coursesState = useSelector((state) => state.courses.courses);
  const selectedCourseId = useSelector((state) => state.selectedCourse.selectedCourseId);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    birthdate: '',
    whatsapp: '',
    phone_number: '',
    email: '',
    nationality: '',
    gender: '',
  });

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  let courses = [];
  if (Array.isArray(coursesState)) {
    courses = coursesState;
  } else if (coursesState.success && Array.isArray(coursesState.courses)) {
    courses = coursesState.courses;
  }

  const error = useSelector((state) => state.user.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value.trim();
    setUserData({ ...userData, [name]: formattedValue });
  };

  const handleCourseSelection = (courseId) => {
    dispatch(setSelectedCourseId(courseId));
  };

  const handleSubmit = () => {
    if (userData.password !== userData.password_confirmation) {
      console.error('Passwords do not match');
    } else {
      dispatch(signUp(userData, selectedCourseId)).then((success) => {
        if (success) {
          navigate('/payment', { state: { selectedCourseId } });
        }
      });
    }
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
            <Form className="registration-form" onSubmit={handleSubmit}>
              <Row className="registration-row">
                <Col className="registration-col">
                  <Form.Label className="registration-label">First Name:</Form.Label>
                  <Form.Control className="registration-input" name="name" value={userData.name} onChange={handleChange} required />
                </Col>
                <Col className="registration-col">
                  <Form.Label className="registration-label">Last Name:</Form.Label>
                  <Form.Control className="registration-input" name="surname" value={userData.surname} onChange={handleChange} required />
                </Col>
              </Row>
              <Row className="registration-row">
                <Col className="registration-col">
                  <Form.Label className="registration-label">Gender:</Form.Label>
                  <Form.Select className="registration-input" name="gender" value={userData.gender} onChange={handleChange}>
                    <option className="registration-option">Female</option>
                    <option className="registration-option">Male</option>
                    <option className="registration-option">Other</option>
                  </Form.Select>
                </Col>
                <Col className="registration-col">
                  <Form.Label className="registration-label">Date Of Birth:</Form.Label>
                  <Form.Control className="registration-input" name="birthdate" value={userData.birthdate} onChange={handleChange} placeholder="dd/mm/yyyy" required />
                </Col>
              </Row>
              <Row className="registration-row">
                <Col className="registration-col">
                  <Form.Label className="registration-label">WhatsApp Number:</Form.Label>
                  <Form.Control className="registration-input" name="whatsapp" value={userData.whatsapp} onChange={handleChange} required />
                </Col>
                <Col className="registration-col">
                  <Form.Label className="registration-label">Phone Number:</Form.Label>
                  <Form.Control className="registration-input" name="phone_number" value={userData.phone_number} onChange={handleChange} required />
                </Col>
              </Row>
              <Row className="registration-row">
                <Col className="registration-col">
                  <Form.Label className="registration-label">Email:</Form.Label>
                  <Form.Control className="registration-input" name="email" value={userData.email} onChange={handleChange} required />
                </Col>
                <Col className="registration-col">
                  <Form.Label className="registration-label">Nationality:</Form.Label>
                  <Form.Control className="registration-input" name="nationality" value={userData.nationality} onChange={handleChange} required />
                </Col>
              </Row>
            </Form>
            {error && <div className="text-red-500">{error}</div>}
          </div>
          <div className="registration-section3">
            <div className="rsection3">
              <h2 className="registration-h2">COURSES</h2>
              <p className="registration-select">Select One</p>
            </div>
            <Form onSubmit={handleSubmit}>
              <div key="column-radio" className="mb-3">
                {courses.map((course) => (
                  <Form.Check
                    key={course.id}
                    label={course.title}
                    name="group1"
                    type="radio"
                    id={`radio-${course.id}`}
                    onChange={() => handleCourseSelection(course.id)}
                    required
                  />
                ))}
              </div>
            </Form>
          </div>
          <div className="registration-section4">
            <h2 className="registration-h2">ADDITIONAL INFORMATION</h2>
            <Form className="registration-form">
              <Row className="registration-row">
                <Col className="registration-col">
                  <Form.Label className="registration-label">Employment Status:</Form.Label>
                  <Form.Control className="registration-input" />
                </Col>
                <Col className="registration-col">
                  <Form.Label className="registration-label-2">How Did You Hear About Origin8Lab?</Form.Label>
                  <Form.Control className="registration-input" />
                </Col>
              </Row>
              <Row className="registration-row">
                <Col className="registration-col">
                  <Form.Label className="registration-label">Any Special Requirements or Accommodations Needed?</Form.Label>
                  <Form.Control className="registration-input-big" />
                </Col>
              </Row>
            </Form>
            <Button to="/payment" className="registration-btn" onClick={handleSubmit}>Next</Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Registration;
