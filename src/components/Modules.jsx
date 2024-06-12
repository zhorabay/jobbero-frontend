import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { fetchCourses } from '../redux/actions/courseActions';
import { fetchCourseModules, deleteCourseModule } from '../redux/actions/courseModuleActions';
import { fetchReviews } from '../redux/actions/reviewActions';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import { fetchLessons, deleteLesson } from '../redux/actions/lessonActions';
import { fetchUserCourses } from '../redux/actions/userActions';
import down from '../media/down.png';
import downblue from '../media/downblue.png';
import book from '../media/book.png';
import comment from '../media/comment.png';
import '../styles/Course.css';
import Navigation3 from './Navigation3';

function Modules({ userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId, courseId } = useParams();
  const coursesData = useSelector((state) => state.courses.courses);
  const cartItems = useSelector((state) => state.cart.items);
  const modules = useSelector((state) => state.module.modules);
  const reviews = useSelector((state) => state.reviews.reviews);
  const lessons = useSelector((state) => state.lesson.lessons);
  const user = useSelector((state) => state.auth.user);
  const userCourses = useSelector((state) => state.auth.userCourses);
  const isAdmin = user && user.email === 'admin@jobbero.com';
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showLessons, setShowLessons] = useState(true);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    dispatch(fetchCourses());
    if (categoryId && courseId) {
      dispatch(fetchCourseModules(categoryId, courseId));
      dispatch(fetchReviews(categoryId, courseId));
    }
    if (categoryId) {
      dispatch(fetchUserCourses(categoryId));
    }
  }, [dispatch, categoryId, courseId, categoryId]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
    setShowComments(false);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    setShowDescription(false);
  };

  const toggleLessons = (moduleId) => {
    if (!expandedModules[moduleId]) {
      dispatch(fetchLessons(categoryId, courseId, moduleId));
    }
    setShowLessons(!showLessons);
    setExpandedModules((prevExpandedModules) => ({
      ...prevExpandedModules,
      [moduleId]: !prevExpandedModules[moduleId],
    }));
  };

  if (!coursesData || !coursesData.courses) {
    return <div>Loading...</div>;
  }

  const { courses } = coursesData;

  const course = courses.find((course) => course.id === parseInt(courseId, 10));

  if (!course) {
    return <div>Error: Course not found</div>;
  }

  const courseModulesArray = Array.isArray(modules)
    ? modules.filter((module) => module.course_id === parseInt(courseId, 10))
    : [];

  const courseReviews = Array.isArray(reviews)
    ? reviews.filter((review) => review.course_id === parseInt(courseId, 10))
    : [];

  const handleDeleteModule = (moduleId) => {
    dispatch(deleteCourseModule(categoryId, courseId, moduleId));
  };

  const handleDeleteLesson = (lessonId, courseModuleId) => {
    dispatch(deleteLesson(categoryId, courseId, courseModuleId, lessonId));
  };

  const handleAddToCart = (course) => {
    if (cartItems.length > 0) {
      dispatch(removeFromCart(cartItems[0].id));
    }

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

  const sortLessonsByTitle = (lessonsArray) => lessonsArray.sort((a, b) => {
    const numberA = parseInt(a.title.match(/\d+/));
    const numberB = parseInt(b.title.match(/\d+/));
    return numberA - numberB;
  });

  const hasPaidForCourse = userCourses && userCourses.some((paidCourse) => paidCourse.id === parseInt(courseId, 10));

  return (
    <>
      <Navigation3 />
      <div className="modules-container">
        <div className="modules-flex" key={course.id}>
          <h2 className="courses-h2 h2-title">{course.title}</h2>
          <div className="modules-choose">
            <button type="button" className="modules-choose-t" onClick={toggleDescription}>
              <img src={book} alt="book" className="modules-symbol" />
              Course
            </button>
            <button type="button" className="modules-choose-t" onClick={toggleComments}>
              <img src={comment} alt="comment" className="modules-symbol" />
              Feedback
            </button>
          </div>
          {showDescription && <div className="course-modules-about">{course.about}</div>}
          {showComments && courseReviews.length > 0 && courseReviews.map((review) => (
            <div key={review.id} className="modules-course-comments">
              <p>
                Rating:
                {' '}
                {review.rating}
              </p>
              <p>
                Comment:
                {' '}
                {review.comment}
              </p>
            </div>
          ))}
          {showComments && courseReviews.length === 0 && (
            <p className="course-modules-about">No reviews found.</p>
          )}
          <Button variant="primary" className="course-card-btn" onClick={() => handleAddToCart(course)}>Add to Cart</Button>
          <div className="modules-section3">
            <div className="modules-section3-expand">
              <p className="account-courses">Course Content</p>
              <button type="button" className="modules-expand" onClick={toggleExpand}>
                <img src={down} alt="down" className="account-down" />
                Expand All
              </button>
            </div>
            {isAdmin && (
              <Link to={`/categories/${categoryId}/courses/${courseId}/modules/post-module`} className="nav-cat-title">Add Module</Link>
            )}
            <ul className="modules-ul">
              {isExpanded && courseModulesArray.length > 0 && courseModulesArray.map((module) => (
                <li className="modules-list" key={module.id}>
                  {isAdmin || hasPaidForCourse ? (
                    <>
                      <h3 className="modules-week">
                        Week
                        {module.week}
                      </h3>
                      <button type="button" className="course-modules-list" onClick={() => toggleLessons(module.id)}>
                        <div className="modules-btn-prt1">
                          <h4 className="module-title-h4">{module.title}</h4>
                        </div>
                        {isAdmin && (
                          <button type="button" className="edit-button" onClick={() => handleDeleteModule(module.id)}>
                            Delete Module
                          </button>
                        )}
                        <button type="button" className="modules-expand-lessons modules-btn-prt2">
                          <img src={downblue} alt="down" className="account-down" />
                          <p className="account-down-text">
                            {expandedModules[module.id] ? 'Collapse' : 'Expand'}
                          </p>
                        </button>
                      </button>
                      {expandedModules[module.id] && (
                        <div>
                          {sortLessonsByTitle(
                            lessons.filter((lesson) => lesson && lesson.course_module_id === module.id),
                          ).map((lesson) => (
                            <div key={lesson.id} className="lesson-item">
                              <Link className="lesson-route" to={`/categories/${categoryId}/courses/${courseId}/modules/${module.id}/lessons/${lesson.id}`}>
                                {lesson.title}
                              </Link>
                              {isAdmin && (
                                <button type="button" className="edit-button" onClick={() => handleDeleteLesson(lesson.id, module.id)}>
                                  Delete Lesson
                                </button>
                              )}
                            </div>
                          ))}
                          {isAdmin && (
                            <Link className="nav-cat-title" to={`/categories/${categoryId}/courses/${categoryId}/modules/${module.id}/post-lesson`}>
                              Add Lesson
                            </Link>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <p>Please purchase this course to access the content.</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

Modules.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default Modules;
