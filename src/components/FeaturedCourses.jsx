import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { fetchCourses } from '../redux/actions/courseActions';
// import { addToCart } from '../redux/actions/cartActions';
import time from '../media/time.png';
import '../styles/Home.css';

function FeaturedCourses() {
  const dispatch = useDispatch();
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get('categoryId');
  const coursesState = useSelector((state) => state.courses.courses);

  useEffect(() => {
    dispatch(fetchCourses(categoryId));
  }, [dispatch, categoryId]);

  let courses = [];
  if (Array.isArray(coursesState)) {
    courses = coursesState;
  } else if (coursesState.success && Array.isArray(coursesState.courses)) {
    courses = coursesState.courses;
  }

  if (courses.length === 0) {
    return <div>Loading...</div>;
  }

  // const handleAddToCart = (course) => {
  //   dispatch(addToCart(course));
  //   userId && navigate(`/${userId.toString()}/cart`);
  // };

  const filteredCourses = categoryId
    ? courses.filter((course) => course.category_id === parseInt(categoryId))
    : courses;

  return (
    <div className="featured-container">
      <div className="featured-flex">
        <div className="featured">
          <h2 className="featured-h2">Featured Courses</h2>
          <Link to="/all-courses" className="featured-a">see more</Link>
        </div>
        <ul className="featured-courses">
          {filteredCourses.map((course) => (
            <li key={course.id}>
              <Card style={{ width: '18rem' }} className="course-card">
                <Card.Img variant="top" src={course.image} className="course-card-img" />
                <Card.Body className="course-card-body">
                  <Link to={`/categories/${categoryId}/courses/${course.id}/modules`} className="courses-link">
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
                  <Button variant="primary" className="course-card-btn">Add to Cart</Button>
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// FeaturedCourses.propTypes = {
//   userId: PropTypes.number,
// };

// FeaturedCourses.defaultProps = {
//   userId: null,
// };

export default FeaturedCourses;
