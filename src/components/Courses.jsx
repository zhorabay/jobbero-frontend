import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchCourses, deleteCourse } from '../redux/actions/courseActions';
import { addToCart } from '../redux/actions/cartActions';
import '../styles/Course.css';
import Navigation3 from './Navigation3';
import time from '../media/time.png';

function Courses({ userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const coursesState = useSelector((state) => state.courses.courses);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.email === 'admin@jobbero.com';

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
    return (
      <>
        <Navigation3 />
        <div className="courses-container">
          <div className="courses-flex">
            <span className="nav-cat-title-no">Courses are in progress</span>
            {isAdmin && (
              <Link to={`/categories/${categoryId}/courses/post-course`} className="nav-cat-title-no">
                Add Course
              </Link>
            )}
          </div>
        </div>
      </>
    );
  }

  const filteredCourses = categoryId
    ? courses.filter((course) => course.category_id === parseInt(categoryId))
    : courses;

  const handleDeleteCourse = (courseId) => {
    dispatch(deleteCourse(categoryId, courseId));
  };

  const handleAddToCart = (course) => {
    const courseForCart = {
      id: course.id,
      title: course.title,
      description: course.description,
      image: course.image,
      duration: course.duration,
      price: course.price,
    };

    console.log('Adding to cart:', courseForCart);

    dispatch(addToCart(courseForCart));
    userId && navigate(`/${userId.toString()}/cart`);
  };

  return (
    <>
      <Navigation3 />
      <div className="courses-container">
        <div className="courses-flex">
          <h2 className="courses-h2">Available Courses</h2>
          {isAdmin && (
            <Link to={`/categories/${categoryId}/courses/post-course`} className="nav-cat-title">
              Add Course
            </Link>
          )}
          <ul className="course-list">
            {filteredCourses.map((course) => (
              <li key={course.id} className="course-list-li">
                <Card className="course-card">
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
                          Weeks
                        </Card.Text>
                        <Card.Text className="course-card-price">
                          20 000 NGN
                          {/* {course.price} */}
                        </Card.Text>
                      </div>
                    </Link>
                    {isAdmin && (
                      <Button variant="danger" className="course-card-btn" onClick={() => handleDeleteCourse(course.id)}>Delete</Button>
                    )}
                    <Button variant="primary" className="course-card-btn" onClick={handleAddToCart}>Add to Cart</Button>
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

Courses.propTypes = {
  userId: PropTypes.number,
};

Courses.defaultProps = {
  userId: null,
};

export default Courses;
