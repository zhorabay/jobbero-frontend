import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCourses } from '../redux/actions/courseActions';
import { fetchCourseModules } from '../redux/actions/courseModuleActions';
import { fetchReviews } from '../redux/actions/reviewActions';
import down from '../media/down.png';
import downblue from '../media/downblue.png';
import book from '../media/book.png';
import comment from '../media/comment.png';
import '../styles/Course.css';
import Navigation3 from './Navigation3';

function Modules() {
  const dispatch = useDispatch();
  const { categoryId, courseId } = useParams();
  const coursesData = useSelector((state) => state.courses.courses);
  const modules = useSelector((state) => state.modules.modules);
  const reviews = useSelector((state) => state.reviews.reviews);

  const [isExpanded, setIsExpanded] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    dispatch(fetchCourses());
    if (courseId) {
      dispatch(fetchCourseModules(categoryId, courseId));
      dispatch(fetchReviews(categoryId, courseId));
    }
  }, [dispatch, categoryId, courseId]);

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
    setExpandedModules((prevExpandedModules) => ({
      ...prevExpandedModules,
      [moduleId]: !prevExpandedModules[moduleId],
    }));
  };

  console.log('Fetched courses:', coursesData);
  console.log('Fetched modules:', modules);
  console.log('Fetched reviews:', reviews);
  console.log(categoryId, courseId);

  if (!coursesData || !coursesData.courses) {
    return <div>Loading...</div>;
  }

  const { courses } = coursesData;

  const course = courses.find((course) => course.id === parseInt(courseId, 10));

  if (!course) {
    return <div>Error: Course not found</div>;
  }

  const courseModules = Array.isArray(modules)
    ? modules.filter((module) => module.course_id === parseInt(courseId, 10))
    : [];

  const courseReviews = Array.isArray(reviews)
    ? reviews.filter((review) => review.course_id === parseInt(courseId, 10))
    : [];

  return (
    <>
      <Navigation3 />
      <div className="modules-container">
        <div className="modules-flex" key={course.id}>
          <h2 className="courses-h2">{course.title}</h2>
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
          <div className="modules-section3">
            <p className="account-courses">Course Content</p>
            <button type="button" className="modules-expand" onClick={toggleExpand}>
              <img src={down} alt="down" className="account-down" />
              Expand All
            </button>
            {isExpanded && courseModules.length > 0 && courseModules.map((module) => (
              <div className="modules-list" key={module.id}>
                <h3 className="modules-week">
                  Week
                  {module.week}
                </h3>
                <button type="button" className="course-modules-list" onClick={() => toggleLessons(module.id)}>
                  <div className="modules-btn-prt1">
                    <h4 className="account-h4">{module.title}</h4>
                    <p className="modules-lessons">
                      {module.lessons ? module.lessons.length : 0}
                      {' '}
                      Topics
                    </p>
                  </div>
                  <button type="button" className="modules-expand-lessons modules-btn-prt2">
                    <img src={downblue} alt="down" className="account-down" />
                    <p className="account-down">{expandedModules[module.id] ? 'Collapse' : 'Expand'}</p>
                  </button>
                </button>
                {expandedModules[module.id] && module.lessons && module.lessons.map((lesson) => (
                  <div key={lesson.id} className="lesson-item">
                    <Link to={`/lessons/${lesson.id}`} className="lesson-route">{lesson.title}</Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Modules;
