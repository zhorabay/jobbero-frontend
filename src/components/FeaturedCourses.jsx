import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { fetchCourses } from '../redux/actions/courseActions';
import time from '../media/time.png';
import '../styles/Home.css';

const FeaturedCourses = () => {
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

  if (courses.length === 0) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (course) => {
    dispatch(addToCart(course));
  };

  return (
    <div className="featured-container">
      <div className="featured-flex">
        <div className="featured">
          <h2 className="featured-h2">Featured Courses</h2>
          <Link to="/courses" className="featured-a">see more</Link>
        </div>
        <ul className="featured-courses">
          {courses.map((course) => (
              <li key={course.id}>
                <Card style={{ width: "18rem" }} className="course-card">
                  <Card.Img variant="top" src={course.image} className="course-card-img" />
                  <Card.Body className="course-card-body">
                    <Link to={`${course.id}/modules`} className="courses-link">
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
  );
};

export default FeaturedCourses;
