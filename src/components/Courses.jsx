import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { fetchCourses } from '../redux/actions/courseActions';
import { addToCart } from '../redux/actions/cartActions';
import '../styles/Course.css';
import Navigation3 from './Navigation3';
import time from '../media/time.png';

function Courses() {
  const dispatch = useDispatch();
  const coursesState = useSelector((state) => state.courses.courses);
  console.log('Courses:', coursesState);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  let courses = [];
  if (Array.isArray(coursesState)) {
    courses = coursesState;
  } else if (coursesState.success && Array.isArray(coursesState.courses)) {
    courses = coursesState.courses;
  }

  if (courses.length === 0) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (course) => {
    dispatch(addToCart(course));
  };

  return (
    <>
      <Navigation3 />
      <div className="courses-container">
        <div className="courses-flex">
          <h2 className="courses-h2">Available Courses</h2>
          <ul className="course-list">
            {courses.map((course) => (
              <li key={course.id}>
                <Card style={{ width: '18rem' }} className="course-card">
                  <Card.Img variant="top" src={course.image} className="course-card-img" />
                  <Card.Body className="course-card-body">
                    <Link to={`/${course.id}/modules`} className="courses-link">
                      <Card.Title className="course-card-title">{course.title}</Card.Title>
                      <Card.Text className="course-card-desc">{course.description}</Card.Text>
                      <div className="course-card-flex">
                        <Card.Text className="course-card-dur">
                          <img src={time} alt="time" className="course-card-time" />
                          {course.duration}
                          {' '}
                          Hours
                        </Card.Text>
                        <Card.Text className="course-card-price">
                          $
                          {course.price}
                        </Card.Text>
                      </div>
                    </Link>
                    <Button variant="primary" onClick={() => handleAddToCart(course)} className="course-card-btn">Add to Cart</Button>
                  </Card.Body>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Courses;
