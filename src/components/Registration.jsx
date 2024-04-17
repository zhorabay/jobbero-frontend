import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { fetchCourses } from '../redux/actions/courseActions';
import logoblack from '../media/logoblack.png';
import '../styles/Auth.css';
import Navigation3 from './Navigation3';
import Footer from './Footer';

function Registration() {
  const dispatch = useDispatch();
  const coursesState = useSelector((state) => state.courses.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  let courses = [];
  if (Array.isArray(coursesState)) {
    courses = coursesState;
  } else if (coursesState.success && Array.isArray(coursesState.courses)) {
    courses = coursesState.courses;
  }

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
            <Form className="registration-form">
              <Row className="registration-row">
                <Col className="registration-col">
                  <Form.Label className="registration-label">First Name:</Form.Label>
                  <Form.Control className="registration-input" required />
                </Col>
                <Col className="registration-col">
                  <Form.Label className="registration-label">Last Name:</Form.Label>
                  <Form.Control className="registration-input" required />
                </Col>
              </Row>
              <Row className="registration-row">
                <Col className="registration-col">
                  <Form.Label className="registration-label">Gender:</Form.Label>
                  <Form.Select className="registration-input">
                    <option className="registration-option">Female</option>
                    <option className="registration-option">Male</option>
                    <option className="registration-option">Other</option>
                  </Form.Select>
                </Col>
                <Col className="registration-col">
                  <Form.Label className="registration-label">Date Of Birth:</Form.Label>
                  <Form.Control className="registration-input" placeholder="dd/mm/yyyy" required />
                </Col>
              </Row>
              <Row className="registration-row">
                <Col className="registration-col">
                  <Form.Label className="registration-label">WhatsApp Number:</Form.Label>
                  <Form.Control className="registration-input" required />
                </Col>
                <Col className="registration-col">
                  <Form.Label className="registration-label">Phone Number:</Form.Label>
                  <Form.Control className="registration-input" required />
                </Col>
              </Row>
              <Row className="registration-row">
                <Col className="registration-col">
                  <Form.Label className="registration-label">Email:</Form.Label>
                  <Form.Control className="registration-input" required />
                </Col>
                <Col className="registration-col">
                  <Form.Label className="registration-label">Nationality:</Form.Label>
                  <Form.Control className="registration-input" required />
                </Col>
              </Row>
            </Form>
          </div>
          <div className="registration-section3">
            <div className="rsection3">
              <h2 className="registration-h2">COURSES</h2>
              <p className="registration-select">Select One</p>
            </div>
            <Form>
              <div key="column-radio" className="mb-3">
                {courses.map((course) => (
                  <Form.Check
                    key={course.id}
                    label={course.title}
                    name="group1"
                    type="radio"
                    id={`radio-${course.id}`}
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
            <Link to="/payment" type="button" className="registration-btn">Next</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Registration;